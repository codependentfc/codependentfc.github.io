$(document).ready(function(){
  $.getJSON( 'http://content.guardianapis.com/search?api-key=test&section=uk-news', function( data ) {
    var items = [];
    $.each( data.response.results, function( index, val ) {
      items.push( '<li id="' + index + '">' + val.webTitle + '</li>' );
      console.log(data);
    });

    $( '<ul/>', {
      'class': 'my-new-list',
      html: items.join( '' )
    }).appendTo( 'body' );
  });
});
