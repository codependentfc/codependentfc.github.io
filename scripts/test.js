$(document).ready(function() {  
$.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: "http://content.guardianapis.com/search?api-key=test&show-fields=football",
    success: function(data) {
        for (var i = 0; i < data.response.results.length; i++) {
        $("#uk-news").append(data.response.results[i].webTitle + "'>Link</a></div>");
            }
            console.log(dataa);
        }
    });
 });​