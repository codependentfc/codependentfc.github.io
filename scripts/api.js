$(document).ready(function(){
  // section names
  var searchTerms = ['uk-news','travel', 'football'];
  // api request URL with blank space (null) for relevent section name
  var request = ['http://content.guardianapis.com/search?show-fields=trailText&q=',null,'&api-key=test'];
  // for each search term:
  $.each(searchTerms, function (ind, val) {
    // insert search term into URL array, and join into string.
    request[1] = val;
    var thisRequest = request.join('');
    var stories = [];
    // make api request and make response object ('data') available to a function
    $.getJSON(thisRequest, function(data){
      // for each element of the array in the object at Obj.response.results:
      $.each(data.response.results, function (ind, val){
        // push a string to the stories array that will constitute valid html when later appended to page.
        // 'val' here is the value at a given index of the array of results.
        // So the api calls here are shorthand for e.g. Obj.response.results[ind].webUrl
        stories.push('<li><a data-toggle="tooltip" title="'+ val.fields.trailText+'" href="'+ val.webUrl +'">' + val.webTitle + '</a></li>');
      });
    // create a new <ul> element, put the contents of the 'stories' array in it,
    // and append it to the page in the the element with the id matching the search term ('val')
    $( '<ul/>', {'class': 'titles',html: stories.join('')}).appendTo( '#'+val );
    });
  });
});

