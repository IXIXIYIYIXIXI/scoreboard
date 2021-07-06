
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
        $('#SignIn').modal('hide');
        renderContent();
    } else {
        $('#SignIn').modal({backdrop: 'static', keyboard: false});
    }
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function makeApiCall(range) {
    var params = {
        spreadsheetId: "1DDhxHZlb-JjFoqZG871_z6NcMBhhslZ1u0LQI89dNPA",
        range: range,
        valueRenderOption: "FORMATTED_VALUE",
        dateTimeRenderOption: "SERIAL_NUMBER"
    };
    return gapi.client.sheets.spreadsheets.values.get(params);
};

function startButtonPressed() {
    $("#userSelect").children().each(function(index, tr) {
        if ($(tr).find("input").is(":checked")) {
            console.log(index, $(tr).find("p").text());
        }
    });
}

function renderContent() {
    function getTextColor(hex) {
        var hex = hex.substring(1);
        var rgb = parseInt(hex, 16);
        var r = (rgb >> 16) & 0xff;
        var g = (rgb >>  8) & 0xff;
        var b = (rgb >>  0) & 0xff;
        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luma > 150 ? "#000000" : "#ffffff";
    }

    $("#startButton").removeClass("hidden");
    makeApiCall("Profiles!A2:D1000").then(function(response) {
        let users = response.result.values;
        users.forEach(user => {
            $("#userSelect").append(
                $("<tr>").append(
                    $("<td>").append(
                        $("<img>", { "src": user[3], "class": "profilePicture" })
                    ),
                    $("<td>").append(
                        $("<p>", { "text": user[1] }).css({ "color": getTextColor(user[2]) })
                    ),
                    $("<td>").append(
                        $("<input>", { "type": "checkbox" })
                    )
                ).css({ "background-color": user[2] })
            );
        });
    }, function(reason) {
        console.error("Error: " + reason.result.error.message);
    });
}
