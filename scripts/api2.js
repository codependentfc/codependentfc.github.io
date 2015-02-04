$(document).ready(function() {
  var searchTerms = ['uk-news', 'travel', 'football'];
  var request = ['http://content.guardianapis.com/search?section=', null, '&order-by=newest&show-fields=body%2CtrailText&page-size=5&api-key=yht9jzt3ccngxwgyknvfaj89'];
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

  $.each(searchTerms, function (searchInd, searchVal) {
    request[1] = searchVal;
    var thisRequest = request.join('');
    var titles = [];
    var urls = [];
    var trails = [];
    allBodies[searchVal] = [];
    $.getJSON(thisRequest)
    .done(function(data) {
      $.each(data.response.results, function (ind, val) {
        titles.push(val.webTitle);
        urls.push(val.webUrl);
        trails.push(val.fields.trailText);
        allBodies[searchVal].push(val.fields.body);
        console.log(allBodies);
      });
      $.each(titles, function (ind, val) {
        $('#'+searchVal+'-title'+(ind+1)).append(val);
      });
      $.each(trails, function (ind, val) {
        $('#'+searchVal+'-trail'+(ind+1)).append('<a href="'+urls[ind]+'">'+val+'</a>');
      });

    })
    .fail(function() {
      ( '#'+ searchVal+'-title1' ).append('<p>Error contacting server</p>');
    });
  });
  $('.panel-heading').click(function(){
    var thisSection;
    var thisStory;
    var thisId = $(this).attr('id');
    thisSection = thisId.slice(0,-1);
    thisStory = (thisId.slice(-1))-1;
    var thisBody = allBodies[thisSection][thisStory];
    console.log(thisBody);
    $('#current-story').html(thisBody);
  });
});

