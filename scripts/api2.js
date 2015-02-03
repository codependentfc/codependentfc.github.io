$(document).ready(function() {
  var searchTerms = ['uk-news', 'travel', 'football'];
  var request = ['http://content.guardianapis.com/search?show-fields=body%2CtrailText&q=', null, '&api-key=yht9jzt3ccngxwgyknvfaj89'];
  $.each(searchTerms, function (searchInd, searchVal) {
    request[1] = searchVal;
    var thisRequest = request.join('');
    var titles = [];
    var urls = [];
    var trails = [];
    $.getJSON(thisRequest)
    .done(function(data) {
      $.each(data.response.results, function (ind, val) {
        titles.push(val.webTitle);
        urls.push(val.webUrl);
        trails.push(val.fields.trailText);
      });
      $.each(titles, function (ind, val){
        $('#'+searchVal+'-title'+(ind+1)).append(val);
      });
      $.each(trails, function (ind, val){
        $('#'+searchVal+'-trail'+(ind+1)).append('<a href="'+urls[ind]+'">'+val+'</a>');
      });
      // experiemnting with buttons to provide full story
      $('.fullText').click(function(){
        alert(data.response.results[0].fields.body);
      });
    })
    .fail(function(){
      // TODO: Fix Me --what element should this be appended to?
      ( '#'+ searchVal ).append('<p>Error contacting server</p>');
    });
  });
});

