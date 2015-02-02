$(document).ready(function(){
  $.getJSON( 'http://content.guardianapis.com/search?api-key=test&section=uk-news', function( data ) {
    var items = [];
    $.each( data, function( key, val ) {
      items.push( '<li id="' + key + '">' + val + '</li>' );
    });

    $( '<ul/>', {
      'class': 'my-new-list',
      html: items.join( '' )
    }).appendTo( 'body' );
  });
});
