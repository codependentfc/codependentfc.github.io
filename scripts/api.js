$(document).ready(function(){
  $.getJSON( 'http://content.guardianapis.com/search?api-key=test&section=uk-news', function( data ) {
    var titles = [],
        trail = [],
        webUrls = [];
    $.each( data.response.results, function( index, val ) {
      titles.push( '<li id=title"' + index + '"><a href="'+ val.webUrl +'">' + val.webTitle + '</a></li>' );
      console.log(data);
    });

    $( '<ul/>', {
      'id': 'titles',
      html: titles.join( '' )
    }).appendTo( '#UKNews' );
  });

  $.getJSON( 'http://content.guardianapis.com/search?api-key=test&section=travel', function( data ) {
    var titles = [],
        trail = [],
        webUrls = [];
    $.each( data.response.results, function( index, val ) {
      titles.push( '<li id=title"' + index + '"><a href="'+ val.webUrl +'">' + val.webTitle + '</a></li>' );
      console.log(data);
    });

    $( '<ul/>', {
      'id': 'titles',
      html: titles.join( '' )
    }).appendTo( '#travel' );
  });

  $.getJSON( 'http://content.guardianapis.com/search?api-key=test&section=football', function( data ) {
    var titles = [],
        trail = [],
        webUrls = [];
    $.each( data.response.results, function( index, val ) {
      titles.push( '<li id=title"' + index + '"><a href="'+ val.webUrl +'">' + val.webTitle + '</a></li>' );
      console.log(data);
    });

    $( '<ul/>', {
      'id': 'titles',
      html: titles.join( '' )
    }).appendTo( '#football' );
  });
});
