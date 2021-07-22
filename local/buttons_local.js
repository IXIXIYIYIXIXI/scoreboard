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
    let playersToAdd = [];
    $("#userSelect").children().each(function(_, rowDiv) {
        let inScoreboard = false;
        let scoreboardObject = null;
        $("#scoreboard").children().each(function(_, scoreboardDiv) {
            let isEqual = function(row, sb) {
                let pfp = $(row).find(".pfp").attr("src") === $(sb).find(".pfp").attr("src");
                let name = $(row).find(".name").text() === $(sb).find(".name").text();
                let color = $(row).find(".name").css("color") === $(sb).find(".name").css("color");
                return pfp && name && color;
            };
            if (isEqual(rowDiv, scoreboardDiv)) {
                inScoreboard = true;
                scoreboardObject = scoreboardDiv;
            }
        });
        if (inScoreboard && !$(rowDiv).find(".checkbox").is(":checked")) {
            $(scoreboardObject).remove();
        } else if (!inScoreboard && $(rowDiv).find(".checkbox").is(":checked")) {
            playersToAdd.push($(rowDiv).data("user"));
        }
    });
    if (playersToAdd.length + $("#scoreboard").children().length > 0) {
        startGame(playersToAdd);
    }
}

function backButtonPressed() {
    if ($("#perigame").hasClass("hidden")) {
        window.location.href = "../index.html";
    } else {
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
