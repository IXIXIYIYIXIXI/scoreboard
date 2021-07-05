$(document).ready(function() {

});

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
        renderContent();
    }
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

async function makeApiCall(range) {
    var params = {
        spreadsheetId: "1DDhxHZlb-JjFoqZG871_z6NcMBhhslZ1u0LQI89dNPA",
        range: range,
        valueRenderOption: "FORMATTED_VALUE",
        dateTimeRenderOption: "SERIAL_NUMBER"
    };
    request = gapi.client.sheets.spreadsheets.values.get(params)
    .then(function(response) {
        return response.result;
    }, function(reason) {
        console.error("Error: " + reason.result.error.message);
        return null;
    });
};

function renderContent() {
    $("#signin-button").remove();

    let scoreboard = $("#scoreboard");
    let users = await makeApiCall("Profiles!A2:C1000").then(value => users = value);
    console.log(users);
}
