
var facebook = null;

$( document ).ready(function() {
    initialize();
});

var initialize = function()
{
    facebook = new facebook_api(statusChangeCallback);
};

var statusChangeCallback = function(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        facebook.request("/me", function(response) {
            console.log('Successful login for: ' + response.name);
            document.getElementById('status').innerHTML =
              'Thanks for logging in, ' + response.name + '!';
            $("#fb_login").hide();
            $("#fb_logout").show();
        });
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        $("#fb_logout").hide();
        $("#fb_login").show();
        $('#status').html('Please log into this app.');
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        $("#fb_logout").hide();
        $("#fb_login").show();
        $('#status').html('Please log into facebook.');
    }
};
