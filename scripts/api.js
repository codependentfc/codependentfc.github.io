$(document).ready(function(){
  $.getJSON( 'http://content.guardianapis.com/search?api-key=test&section=uk-news', function( data ) {
    var titles = [],
        trail = [],
        webUrls = [];
    $.each( data.response.results, function( index, val ) {
      titles.push( '<li id=title"' + index + '">' + val.webTitle + '</li>' );
      console.log(data);
    });
    // $.each( data.response.results, function( index, val ) {
    //   titles.push( '<li id=trail"' + index + '">' + val.??? + '</li>' );
    //   console.log(data);
    // });
    $.each( data.response.results, function( index, val ) {
      webUrls.push( '<li id=webUrl"' + index + '">' + val.webUrl + '</li>' );
      console.log(data);
    });

    $( '<ul/>', {
      'id': 'titles',
      html: titles.join( '' )
    }).appendTo( 'body' );

    $( '<ul/>', {
      'id': 'urls',
      html: webUrls.join( '' )
    }).appendTo( 'body' );

  });
});
