// TODO //
/////////
// Put initial tab in place on load
// Fix current story error
// REFACTOR...


$(document).ready(function() {

  var sectionRequest = 'http://content.guardianapis.com/sections?api-key=yht9jzt3ccngxwgyknvfaj89';
  var request = ['http://content.guardianapis.com/search?section=', null, '&page=', null ,'&order-by=newest&show-fields=body%2CtrailText&page-size=5&api-key=yht9jzt3ccngxwgyknvfaj89'];
  var allBodies = {};
  var sectionAssoc = {};
  var currentPages = {};
  var sectionIds = [];
  var sectionNames = [];
  var newSection;
  var thisRequest;
  var dataObject;
  var titles = [];
  var urls = [];
  var trails = [];

  // Get Section names

  function getSections() {
    $.getJSON(sectionRequest)
    .done(function(data){
      $.each(data.response.results, function (ind, val) {
        sectionIds.push(val.id);
        sectionNames.push(val.webTitle);
      });
      $.each(sectionIds, function (ind, val){
        sectionAssoc[val] = sectionNames[ind];
      });
      sectionIds.sort();
      populateSections();
    })
    .fail(function(){
      alert('Error Contacting Server - Section Name Request');
    });
  }

  // Populate options dropdown

  function populateSections() {
    if (sectionIds) {
      $.each(sectionIds, function (ind, val) {
        $('#sections').append('<option value="'+val+'">'+sectionAssoc[val]+'</option>');
      });
    }
    else {
      $('#sections').append('<option value="">Sections not fetched</option>');
    }
  }

  // Get Stories

  function getStories(section) {
    newSection = section || $('#sections').val();
    request[1] = newSection;
    request[3] = currentPages[newSection];
    thisRequest = request.join('');
    $.getJSON(thisRequest)
    .done(function(data) {
      dataObject = data;
      populateStories();
    })
    .fail(function() {
      alert('Error Contacting Server');
    });
  }

  function populateStories() {
    if (dataObject.response.total === 0) {
      alert('Sorry, No stories in this category');
    }
    else if ( $('#'+newSection+'tab').length) {
      alert('This section has already been added');
    }
    else {
      $('#tab-headers').append("<li class='"+newSection+" tab-header' role='presentation'><a href='#"+newSection+"' id='"+newSection+"tab' aria-controls='"+newSection+"' role='tab' data-toggle='tab'>"+sectionAssoc[newSection]+"</a></li>");
      $('#tab-bodies').append("<div role='tabpanel' class='tab-pane active' id='"+newSection+"'><div class='panel-group' id='accordion-"+newSection+"' role='tablist' aria-multiselectable='true'></div></div>");
      $('#'+newSection+'tab').trigger('click');
      titles = [];
      urls = [];
      trails = [];
      $.each(dataObject.response.results, function (ind, val) {
        titles.push(val.webTitle);
        urls.push(val.webUrl);
        trails.push(val.fields.trailText);
        allBodies[newSection][val.webTitle] = val.fields.body;
      });
      $.each(titles, function (ind, val) {
        $('#accordion-'+newSection).append("<div class='panel panel-default'>" +
                                          "<div class='panel-heading' role='tab' id='"+newSection+ind+"'>" +
                                          "<h4 class='panel-title'>" +
                                          "<a data-toggle='collapse' data-parent='#accordion-"+newSection+"' href='#collapse"+ind+newSection+"' aria-expanded='false' aria-controls='collapse"+ind+newSection+"' class='"+newSection+"' id='"+newSection+"-title"+ind+"'>" +
                                          "</a>" +
                                          "</h4>" +
                                          "</div>" +
                                          "<div id='collapse"+ind+newSection+"' class='panel-collapse collapse' role='tabpanel' aria-labelledby='"+newSection+ind+"'>" +
                                          "<div class='panel-body' id='"+newSection+"-trail"+ind+"'>" +
                                          "</div>" +
                                          "</div>" +
                                          "</div>");
        $('#'+newSection+'-title'+ind).append(val);
        $('#'+newSection+'-trail'+ind).append('<a href="'+urls[ind]+'" target="_blank">'+trails[ind]+'</a>');
      });
    }
  }

  $(document).on('click', '#add-tab', function(){
    if ( $('.tab-header').size() >= 5 ) {
      alert('Sorry, max 5 tabs');
    }
    else {
      newSection = $('#sections').val();
      currentPages[newSection] = 1;
      allBodies[newSection] = {};
      getStories();
    }
  });


  $('#del-tab').click(function(){
    if ($('.tab-header').size() < 2) {
      alert('Sorry, cannot delete last tab');
    }
    else {
      var delId = $('.tab-header.active').attr('class');
      delId = delId.substr(0,delId.indexOf(' '));
      delete currentPages[delId];
      $('.active').remove();
      $('.tab-header :first').trigger('click');
    }
  });

  $('#refresh-tab').click(function(){
    var refreshId = $('.tab-header.active').attr('class');
    refreshId = refreshId.substr(0,refreshId.indexOf(' '));

    $('.active').remove();

    delete allBodies[refreshId];

    newSection = refreshId;

    currentPages[newSection] = 1;
    allBodies[newSection] = {};
    getStories(newSection);
  });

  $('#next-page').click(function(){
    var nextId = $('.tab-header.active').attr('class');
    nextId = nextId.substr(0,nextId.indexOf(' '));

    $('.active').remove();

    delete allBodies[nextId];

    newSection = nextId;

    currentPages[newSection] += 1;
    allBodies[newSection] = {};
    getStories(newSection);
  });

  // TODO find source of error on first click
  $(document).on('click', 'h4 a', function(){
    var thisStory = $(this).text();
    var catClass = $(this).attr('class');
    catClass = catClass.substr(0,catClass.indexOf(' '));
    console.log(thisStory);
    console.log(catClass);
    $('#current-story-body').html(allBodies[catClass][thisStory]);
  });

  // call first on page load
  getSections();
  newSection = 'uk-news';
  currentPages['uk-news'] = 1;
  allBodies['uk-news'] = {};
  getStories('uk-news');


});
