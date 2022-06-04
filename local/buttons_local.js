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
    let addSpan = $(event.path[2]).find(".additional-score");
    let add = 0;
    if (addSpan.text().length !== 0) {
        add = parseInt(addSpan.text().replace("(", "").replace("+", "").replace(")", ""));
    }
    if (add + 1 === 0) {
        addSpan.text("");
    } else {
        addSpan.text("(" + (add + 1 > 0 ? "+": "") + (add + 1) + ")");
    }
    updateScoreboard();
}

function decrementButtonPressed(event) {
    let addSpan = $(event.path[2]).find(".additional-score");
    let add = 0;
    if (addSpan.text().length !== 0) {
        add = parseInt(addSpan.text().replace("(", "").replace("+", "").replace(")", ""));
    }
    if (add - 1 === 0) {
        addSpan.text("");
    } else {
        let score = parseInt($(event.path[2]).find(".score").text());
        if (score + (add - 1) < 0) {
            if (add == 0) {
                addSpan.text("");
            } else {
                addSpan.text("(" + (add > 0 ? "+": "") + add + ")");
            }
        } else {
            addSpan.text("(" + (add - 1 > 0 ? "+": "") + (add - 1) + ")");
        }
    }
    updateScoreboard();
}

function commitButtonPressed() {
    $("#scoreboard").children().each(function(_, rowDiv) {
        if ($(rowDiv).find(".additional-score").text().length !== 0) {
            let add = parseInt($(rowDiv).find(".additional-score").text().replace("(", "").replace("+", "").replace(")", ""));
            let score = parseInt($(rowDiv).find(".score").text());
            $(rowDiv).find(".score").text(score + add);
            $(rowDiv).find(".additional-score").text("");
            console.log($(rowDiv).find(".name").text() + (add > 0 ? " drank " : " threw up ") + Math.abs(add) + " shot(s) at " + new Date());
        }
    });
    updateScoreboard();
}

function testAddButtonPressed() {
    $("button").click(function() {
        data = {
            "name": "Test Website",
            "pfpUrl": "https://cdn.discordapp.com/avatars/164874920701067264/e203ec771f89b249a985833ed7e3b266.webp?size=128",
        };

        $.ajax({
            url: "https://792w3ig3nj.execute-api.us-east-2.amazonaws.com/create-mongodb-player-document",
            type: "POST",
            crossDomain: true,
            contentType: "application/json",
            data: JSON.stringify(data),
            dataType: "json",
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });
}
