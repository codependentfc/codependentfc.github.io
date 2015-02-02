$(document).ready(function(){

  var searchTerms = ['uk-news','travel', 'football']
  var request = ['http://content.guardianapis.com/search?show-fields=trailText&q=','&api-key=test']

  $.each(searchTerms, function (ind, val) {
    var thisRequest = [];
    thisRequest.push(request[0]);
    thisRequest.push(val);
    thisRequest.push(request[1]);
    thisRequest = thisRequest.join('');
    var stories = [];
    $.getJSON(thisRequest, function(data){
      $.each(data.response.results, function (ind, val){
        stories.push('<li><a data-toggle="tooltip" title="'+ val.fields.trailText+'" href="'+ val.webUrl +'">' + val.webTitle + '</a></li>');
      });
    $( '<ul/>', {'class': 'titles',html: stories.join('')}).appendTo( '#'+val );
    });
  });
});

