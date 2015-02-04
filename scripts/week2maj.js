$(document).ready(function(){
  $.getJSON("http://content.guardianapis.com/search?section=uk-news&api-key=test", function(data){
    for (i=0; i<10 ;i++) {
  $("#uk-news").append('<ol>'+ '<a href=' + data.response.results[i].webUrl + '>' + data.response.results[i].webTitle + '</a>' + '</ol>')
    console.log(data);
    }
  });

$.getJSON("http://content.guardianapis.com/search?section=sport&api-key=test", function(data){
    for (i=0; i<10 ;i++) {
  $("#sport").append('<ol>'+ '<a href=' + data.response.results[i].webUrl + '>' + data.response.results[i].webTitle + '</a>' + '</ol>')
  console.log(data);
    }
  });

$.getJSON("http://content.guardianapis.com/search?section=travel&api-key=test", function(data){
    for (i=0; i<10 ;i++) {
  $("#travel").append('<ol>'+ '<a href=' + data.response.results[i].webUrl + '>' + data.response.results[i].webTitle + '</a>' + '</ol>')
    console.log(data);
    }
  });

});