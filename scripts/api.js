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

//   $.getJSON( 'http://content.guardianapis.com/search?show-fields=trailText&q=uk-news&api-key=test', function( data ) {
//     var titles1 = [];
//     $.each( data.response.results, function( index, val ) {
//       titles1.push( '<li id=title"' + index + '"><a data-toggle="tooltip" title="'+ val.fields.trailText+'" href="'+ val.webUrl +'">' + val.webTitle + '</a></li>' );
//     });

//     $( '<ul/>', {
//       'id': 'titles',
//       html: titles1.join( '' )
//     }).appendTo( '#UKNews' );
//   });

//   $.getJSON( 'http://content.guardianapis.com/search?show-fields=trailText&q=travel&api-key=test', function( data ) {
//     var titles2 = [];
//     $.each( data.response.results, function( index, val ) {
//       titles2.push( '<li id=title"' + index + '"><a data-toggle="tooltip" title="'+ val.fields.trailText+'" href="'+ val.webUrl +'">' + val.webTitle + '</a></li>' );
//       console.log(data);
//     });

//     $( '<ul/>', {
//       'id': 'titles',
//       html: titles2.join( '' )
//     }).appendTo( '#travel' );
//   });

//   $.getJSON( 'http://content.guardianapis.com/search?show-fields=trailText&q=football&api-key=test', function( data ) {
//     var titles3 = [];
//     $.each( data.response.results, function( index, val ) {
//       titles3.push( '<li id=title"' + index + '"><a data-toggle="tooltip" title="'+ val.fields.trailText+'" href="'+ val.webUrl +'">' + val.webTitle + '</a></li>' );
//     });

//     $( '<ul/>', {
//       'id': 'titles',
//       html: titles3.join( '' )
//     }).appendTo( '#football' );
//   });
// });
