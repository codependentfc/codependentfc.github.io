$(document).ready(function(){
  $.getJSON( 'http://content.guardianapis.com/search?show-fields=trailText&q=uk-news&api-key=test', function( data ) {
    var titles = [],
        trail = [],
        webUrls = [];
    $.each( data.response.results, function( index, val ) {
      titles.push( '<li id=title"' + index + '"><a data-toggle="tooltip" title="'+ val.fields.trailText+'" href="'+ val.webUrl +'">' + val.webTitle + '</a></li>' );
      console.log(data);
    });

    $( '<ul/>', {
      'id': 'titles',
      html: titles.join( '' )
    }).appendTo( '#UKNews' );
  });

  $.getJSON( 'http://content.guardianapis.com/search?show-fields=trailText&q=travel&api-key=test', function( data ) {
    var titles = [],
        trail = [],
        webUrls = [];
    $.each( data.response.results, function( index, val ) {
      titles.push( '<li id=title"' + index + '"><a data-toggle="tooltip" title="'+ val.fields.trailText+'" href="'+ val.webUrl +'">' + val.webTitle + '</a></li>' );
      console.log(data);
    });

    $( '<ul/>', {
      'id': 'titles',
      html: titles.join( '' )
    }).appendTo( '#travel' );
  });

  $.getJSON( 'http://content.guardianapis.com/search?show-fields=trailText&q=football&api-key=test', function( data ) {
    var titles = [],
        trail = [],
        webUrls = [];
    $.each( data.response.results, function( index, val ) {
      titles.push( '<li id=title"' + index + '"><a data-toggle="tooltip" title="'+ val.fields.trailText+'" href="'+ val.webUrl +'">' + val.webTitle + '</a></li>' );
      console.log(data);
    });

    $( '<ul/>', {
      'id': 'titles',
      html: titles.join( '' )
    }).appendTo( '#football' );
  });
});
