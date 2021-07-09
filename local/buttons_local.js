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
    startGame(players);
}

function backButtonPressed() {
    console.log("test");
    window.location.href = "../index.html";
}

function incrementButtonPressed(event) {
    let scoreSpan = $(event.path[2]).find(".score");
    let score = parseInt(scoreSpan.text());
    scoreSpan.text(score + 1);
}

function decrementButtonPressed(event) {
    let scoreSpan = $(event.path[2]).find(".score");
    let score = parseInt(scoreSpan.text());
    scoreSpan.text(Math.max(0, score - 1));
}