function makeApiCall() {
    var params = {
        spreadsheetId: "1DDhxHZlb-JjFoqZG871_z6NcMBhhslZ1u0LQI89dNPA",
        range: "Profiles!A2:C2",
        valueRenderOption: "",
        dateTimeRenderOption: ""
    };
    var request = gapi.client.sheets.spreadsheets.values.get(params);
    request.then(function(response) {
        console.log(response.result);
    }, function(reason) {
        console.error("Error: " + reason.result.error.message);
    });
};

function initClient() {
    var API_KEY = "AIzaSyBZVkWNos71BbPDZBqmGq1mqrAWKcGTU8w";
    var CLIENT_ID = "483324398762-spin1l8qnducebdmjg1ldbp28tccto5f.apps.googleusercontent.com";
    var SCOPE = "https://www.googleapis.com/auth/spreadsheets";

    gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function() {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        makeApiCall();
    }
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

$(document).ready(function() {
    let scoreboard = $("#scoreboard");
    makeApiCall();
});
