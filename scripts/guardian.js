// TODO //
/////////
// Search bar


$(document).ready(function() {

  // Declare all variables before use
  var sectionRequest = 'http://content.guardianapis.com/sections?api-key=yht9jzt3ccngxwgyknvfaj89';
  var request = ['http://content.guardianapis.com/search?section=', null, '&page=', null ,'&order-by=newest&show-fields=body%2CtrailText&page-size=5&api-key=yht9jzt3ccngxwgyknvfaj89'];
  var allBodies = {};
  var sectionAssoc = {};
  var currentPages = {};
  var sectionIds = [];
  var sectionNames = [];
  var newSection;
  var thisRequest;
  var thisSection;
  var dataObject;
  var titles = [];
  var urls = [];
  var trails = [];
  var autocompleteArray = [];

  // Get Section names
  // Populate sectionAssoc object for Id/Name lookup
  // Populate autocompleteArray for autocomplete field (requiers a specific structure)

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
      $.each(sectionAssoc, function (key, val){
        autocompleteArray.push({ value: val, data: key});
      });
      sectionIds.sort();
      populateSections();
    })
    .fail(function(){
      alert('Error Contacting Server - Section Name Request');
    });
    // empty result check
    // NON FUNCTIONAL
    // $.each(sectionIds, function (ind, val){
    //   request[1] = val;
    //   request[3] = 1;
    //   thisRequest = request.join('');
    //   $.getJSON(thisRequest)
    //   .done(function(data) {
    //     if (data.response.total === 0) {
    //       emptySections.push(val);
    //       console.log(emptySections);
    //     }
    //   })
    //   .fail(function(){
    //     alert('Error Contacting Server - Empty Section Test');
    //   });
    // });
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
  // Use search term and current page to complete query URL

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

  // Write HTML to page, populated with data from API query
  // Fail if no stories in section or if tab for section already exists

  function populateStories() {
    if (dataObject.response.total === 0) {
      alert('Sorry, No stories in this category');
    }
    else if ( $('#'+newSection+'tab').length) {
      alert('This section has already been added');
    }
    else {
      $('#tab-headers').append("<li class='"+newSection+" tab-header' role='presentation'><a href='#"+newSection+"' class='tab-name' id='"+newSection+"tab' aria-controls='"+newSection+"' role='tab' data-toggle='tab'>"+sectionAssoc[newSection]+"</a></li>");
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

  function pageNum(section) {
    $('#page-num').text(currentPages[section]);
  }

  // Add New Tab
  // fail if 4 tabs already

  $(document).on('click', '#add-tab', function(){
    if ( $('.tab-header').size() >= 5 ) {
      alert('Sorry, 5 tabs maximum');
    }
    else {
      newSection = $('#sections').val();
      currentPages[newSection] = 1;
      allBodies[newSection] = {};
      getStories();
      pageNum(newSection);
      $('#'+newSection+'tab').trigger('click');
    }
  });

  // Delete Active Tab
  // fail if only 1 tab
  // clear current pages for section by grabbing delId from HTML

  $('#del-tab').click(function(){
    if ($('.tab-header').size() < 2) {
      alert('Sorry, cannot delete last tab');
    }
    else {
      var delId = $('.tab-header.active').attr('class');
      delId = delId.substr(0,delId.indexOf(' '));
      delete currentPages[delId];
      delete allBodies[delId];
      $('.active').remove();
      $('.tab-header :first').trigger('click');
      console.log(allBodies);
    }
  });

  // Reload Current Tab

  $('#refresh-tab').click(function(){
    var refreshId = $('.tab-header.active').attr('class');
    refreshId = refreshId.substr(0,refreshId.indexOf(' '));

    $('.active').remove();

    delete allBodies[refreshId];

    newSection = refreshId;

    currentPages[newSection] = 1;
    allBodies[newSection] = {};
    getStories(newSection);
    pageNum(newSection);
    $('#'+newSection+'tab').trigger('click');
  });

  // More Stories
  // increment page counter for API call and repopulate

  $('#next-page').click(function(){
    var nextId = $('.tab-header.active').attr('class');
    nextId = nextId.substr(0,nextId.indexOf(' '));

    $('.active').remove();

    delete allBodies[nextId];

    newSection = nextId;

    currentPages[newSection] += 1;
    allBodies[newSection] = {};
    getStories(newSection);
    pageNum(newSection);
    $('#'+newSection+'tab').trigger('click');
  });

  // Display full story text in bottom collapse on header click

  $(document).on('click', 'h4 a', function(){
    var thisStory = $(this).text();
    var catClass = $(this).parent().parent().attr('id');
    catClass = catClass.slice(0,-1);
    console.log(thisStory);
    console.log(catClass);
    $('#current-story-body').html(allBodies[catClass][thisStory]);
  });

  $(document).on('click','.tab-name', function(){
    thisSection = $(this).attr('id');
    thisSection = thisSection.slice(0,-3);
    pageNum(thisSection);
  });

  // Initial page population

  getSections();
  newSection = 'uk-news';
  currentPages['uk-news'] = 1;
  allBodies['uk-news'] = {};
  getStories('uk-news');

  // Automplete.js

  $('#autocomplete').autocomplete({
    lookup: autocompleteArray,
    onSelect: function (suggestion) {
      $('option[value='+suggestion.data+']').prop('selected', true);
    }
  });

});
