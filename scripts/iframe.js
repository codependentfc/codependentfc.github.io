$(document).ready(function(){
    $("#uk-news").click(function() {
        $("#myiframe").attr("src", $(this).attr("href"));
    })
});

$(document).ready(function loadIframe(iframeName, url) {
    var $iframe = $('#' + iframeName);
    if ( $iframe.length ) {
        $iframe.attr('src',url);   
        return false;
    }
    return true;
}
