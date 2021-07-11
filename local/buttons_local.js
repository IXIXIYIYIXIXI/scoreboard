function selectAllButtonPressed() {
    $("#userSelect").children().each(function(_, rowDiv) {
        $(rowDiv).find(".checkbox").prop("checked", true);
    });
}

function deselectAllButtonPressed() {
    $("#userSelect").children().each(function(_, rowDiv) {
        $(rowDiv).find(".checkbox").prop("checked", false);
    });
}

function startButtonPressed() {
    let players = [];
    $("#userSelect").children().each(function(_, rowDiv) {
        if ($(rowDiv).find(".checkbox").is(":checked")) {
            players.push($(rowDiv).data("user"));
        }
    });
    if (players.length > 0) {
        startGame(players);
    }
}

function backButtonPressed() {
    if($("#perigame").hasClass("hidden")){
        console.log("test");
        window.location.href = "../index.html";
    }else{
        $("#pregame").removeClass("hidden");
        $("#perigame").addClass("hidden");
    }
}

function incrementButtonPressed(event) {
    var today = new Date();
    let nameSpan = $(event.path[2]).find(".name");
    console.log(nameSpan.text() + " drank one shot at " + today.getHours() + ':' + today.getMinutes()+  " on " + today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate());
    let scoreSpan = $(event.path[2]).find(".score");
    let score = parseInt(scoreSpan.text());
    scoreSpan.text(score + 1);
    updateScoreboard();
}

function decrementButtonPressed(event) {
    var today = new Date();
    let nameSpan = $(event.path[2]).find(".name");
    console.log(nameSpan.text() + " removed one shot at " + today.getHours() + ':' + today.getMinutes()+  " on " + today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate());
    let scoreSpan = $(event.path[2]).find(".score");
    let score = parseInt(scoreSpan.text());
    scoreSpan.text(Math.max(0, score - 1));
    updateScoreboard();
}
