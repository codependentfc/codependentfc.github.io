$.ajaxSetup({ global: false, async: true});

var sectionRequest = 'http://content.guardianapis.com/sections?api-key=yht9jzt3ccngxwgyknvfaj89';

// var allBodies = {};
var sectionAssoc = {};
var newSection;
var request = ['http://content.guardianapis.com/search?section=', 'uk-news', '&order-by=newest&show-fields=body%2CtrailText&page-size=5&api-key=yht9jzt3ccngxwgyknvfaj89'];



var tabGet = function() {
  newSection = $('#sections').val();

  if ( $('.tab-header').size() >= 5 ) {
    alert('Sorry, max 5 tabs');
  }
  else {

    request[1] = newSection;
    thisRequest = request.join('');

    // allBodies[newSection] = [];
    var titles = [];
    var urls = [];
    var trails = [];

    $.getJSON(thisRequest)
    .done(function(data) {
      if (data.response.total === 0) {
        alert('Sorry, No stories in this category');
      }
      else if ( $('#'+newSection+'tab').length) {
        alert('This section has already been added');
      }
      else {
        $('#tab-headers').append("<li class='"+newSection+" tab-header' role='presentation'><a href='#"+newSection+"' id='"+newSection+"tab' aria-controls='"+newSection+"' role='tab' data-toggle='tab'>"+sectionAssoc[newSection]+"</a></li>");
        $('#tab-bodies').append("<div role='tabpanel' class='tab-pane active' id='"+newSection+"'><div class='panel-group' id='accordion-"+newSection+"' role='tablist' aria-multiselectable='true'></div></div>");
        $('#'+newSection+'tab').trigger('click');
        $.each(data.response.results, function (ind, val) {
          titles.push(val.webTitle);
          urls.push(val.webUrl);
          trails.push(val.fields.trailText);
          // allBodies[newSection].push(val.fields.body);
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
                                            "<div id='collapse"+ind+newSection+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='"+newSection+ind+"'>" +
                                            "<div class='panel-body' id='"+newSection+"-trail"+ind+"'>" +
                                            "</div>" +
                                            "</div>" +
                                            "</div>");
          $('#'+newSection+'-title'+ind).append(val);
          $('#'+newSection+'-trail'+ind).append('<a href="'+urls[ind]+'">'+trails[ind]+'</a>');
        });
      }
    })
    .fail(function() {
    alert('Error Contacting Server');
    });
  }
};

$(document).ready(function() {

  var sectionsSet = function(data) {
    var sectionIds = [];
    var sectionNames = [];

    $.each(data.response.results, function (ind, val) {
      sectionIds.push(val.id);
      sectionNames.push(val.webTitle);
    });
    $.each(sectionIds, function (ind, val){
      sectionAssoc[val] = sectionNames[ind];
    });
    sectionIds.sort();
    $.each(sectionIds, function (ind, val) {
      $('#sections').append('<option value="'+val+'">'+sectionAssoc[val]+'</option>');
    });
  };

  $.getJSON(sectionRequest)
  .done(sectionsSet(data))
  .fail(function(){
    $('#sections').append('<option value="">Error Contacting Server</option>');
  });


  var tabGet = function() {
  newSection = $('#sections').val();

  if ( $('.tab-header').size() >= 5 ) {
    alert('Sorry, max 5 tabs');
  }
  else {

    request[1] = newSection;
    thisRequest = request.join('');

    // allBodies[newSection] = [];
    var titles = [];
    var urls = [];
    var trails = [];

    $.getJSON(thisRequest)
    .done(function(data) {
      if (data.response.total === 0) {
        alert('Sorry, No stories in this category');
      }
      else if ( $('#'+newSection+'tab').length) {
        alert('This section has already been added');
      }
      else {
        $('#tab-headers').append("<li class='"+newSection+" tab-header' role='presentation'><a href='#"+newSection+"' id='"+newSection+"tab' aria-controls='"+newSection+"' role='tab' data-toggle='tab'>"+sectionAssoc[newSection]+"</a></li>");
        $('#tab-bodies').append("<div role='tabpanel' class='tab-pane active' id='"+newSection+"'><div class='panel-group' id='accordion-"+newSection+"' role='tablist' aria-multiselectable='true'></div></div>");
        $('#'+newSection+'tab').trigger('click');
        $.each(data.response.results, function (ind, val) {
          titles.push(val.webTitle);
          urls.push(val.webUrl);
          trails.push(val.fields.trailText);
          // allBodies[newSection].push(val.fields.body);
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
                                            "<div id='collapse"+ind+newSection+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='"+newSection+ind+"'>" +
                                            "<div class='panel-body' id='"+newSection+"-trail"+ind+"'>" +
                                            "</div>" +
                                            "</div>" +
                                            "</div>");
          $('#'+newSection+'-title'+ind).append(val);
          $('#'+newSection+'-trail'+ind).append('<a href="'+urls[ind]+'">'+trails[ind]+'</a>');
        });
      }
    })
    .fail(function() {
    alert('Error Contacting Server');
    });
  }
};


  $('#add-tab').click(tabGet());

  $('#del-tab').click(function(){
    $('.active').remove();
  });

  $('#refresh-tab').click(function(){
    var refreshId = $('.tab-header.active').attr('class');
    refreshId = refreshId.substr(0,refreshId.indexOf(' '));
    console.log(refreshId);

    $('.active').remove();
    alert('Currently broken. Remake tab with id:'+refreshId);
  });

  $('#next-page').click(function(){
    alert('Currently broken. Needs to make a function call.');
  });

});

// Vestigal code accessing story body.
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
