$(document).ready(function() {
  // var searchTerms = ['uk-news', 'travel', 'football'];

  var sectionRequest = 'http://content.guardianapis.com/sections?api-key=yht9jzt3ccngxwgyknvfaj89';

  var allBodies = {};

  $.getJSON(sectionRequest)
  .done(function(data) {
    var sections = [];
    $.each(data.response.results, function (ind, val) {
      sections.push(val.id);
    });
    sections.sort();
    $.each(sections, function (ind, val) {
      $('#sections').append('<option value="'+val+'">'+val+'</option>');
    });
  })
  .fail(function(){
    $('#sections').append('<option value="">Error Contacting Server</option>');
  });

  $('#add-tab').click(function(){
    var newSection = $('#sections').val()
    // console.log(newSection);
    //TODO make only first tab 'active'?
    // use section NAME for tab header
    $('#tab-headers').append("<li role='presentation' class='active'><a href='#"+newSection+"' aria-controls='"+newSection+"' role='tab' data-toggle='tab'>"+newSection+"</a></li>");
    $('#tab-bodies').append("<div role='tabpanel' class='tab-pane active' id='"+newSection+"'><div class='panel-group' id='accordion-"+newSection+"' role='tablist' aria-multiselectable='true'></div></div>");

    var request = ['http://content.guardianapis.com/search?section=', null, '&order-by=newest&show-fields=body%2CtrailText&page-size=5&api-key=yht9jzt3ccngxwgyknvfaj89'];
    request[1] = newSection;
    thisRequest = request.join('');

    allBodies[newSection] = [];

    var titles = [];
    var urls = [];
    var trails = [];

    $.getJSON(thisRequest)
    .done(function(data) {
      $.each(data.response.results, function (ind, val) {
        titles.push(val.webTitle);
        urls.push(val.webUrl);
        trails.push(val.fields.trailText);
        allBodies[newSection].push(val.fields.body);
        // console.log(allBodies);
      });
      $.each(titles, function (ind, val) {
        $('#accordion-'+newSection).append("<div class='panel panel-default'>" +
                                          "<div class='panel-heading' role='tab' id='"+newSection+ind+"'>" +
                                          "<h4 class='panel-title'>" +
                                          "<a data-toggle='collapse' data-parent='#accordion-"+newSection+"' href='#collapse"+ind+newSection+"' aria-expanded='false' aria-controls='collapse"+ind+newSection+"' id='"+newSection+"-title"+ind+"'>" +
                                          "</a>" +
                                          "</h4>" +
                                          "</div>" +
                                          "<div id='collapse"+ind+newSection+"' class='panel-collapse collapse in' role='tabpanel' aria-labelledby='"+newSection+ind+"'>" +
                                          "<div class='panel-body' id='"+newSection+"-trail"+ind+"'>" +
                                          "</div>" +
                                          "</div>" +
                                          "</div>");
        $('#'+newSection+'-title'+ind).append(val);
        $('#'+newSection+'-trail'+ind).append('<a href="'+urls[ind]+'">'+trails[ind]+'</a>');
      });
    })
    .fail(function() {

      // ( '#'+ searchVal+'-title1' ).append('<p>Error contacting server</p>');
    });


    $('#'+newSection).append();


  });


/
  // $('.panel-heading').click(function(){
  //   var thisSection;
  //   var thisStory;
  //   var thisId = $(this).attr('id');
  //   thisSection = thisId.slice(0,-1);
  //   thisStory = (thisId.slice(-1))-1;
  //   var thisBody = allBodies[thisSection][thisStory];
  //   console.log(thisBody);
  //   $('#current-story').html(thisBody);
  // });
});

