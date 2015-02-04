$(document).ready(function(){
    $.getJSON("http://content.guardianapis.com/search?api-key=test&q=uknews", function(data){
      for (i=0; i<10 ;i++) {
    $("#uknews").append('<li>'+ data.response.results[i].sectionName +': ' + '<a href=' + data.response.results[i].webUrl + '>' + data.response.results[i].webTitle + '</a>' + '</li>')
      console.log(data);
    }
    });
    $.getJSON("http://content.guardianapis.com/search?api-key=test&q=sport", function(data){
      for (i=0; i<10 ;i++) {
    $("#sport").append('<li>'+ data.response.results[i].sectionName +': ' + '<a href=' + data.response.results[i].webUrl + '>' + data.response.results[i].webTitle + '</a>' + '</li>')
      console.log(data);
    }
    });
    $.getJSON("http://content.guardianapis.com/search?q=travel&api-key=test", function(data){
      for (i=0; i<10 ;i++) {
    $("#travel").append('<li>'+ data.response.results[i].sectionName +': ' + '<a href=' + data.response.results[i].webUrl + '>' + data.response.results[i].webTitle + '</a>' + '</li>')
      console.log(data);
    }
    });
});