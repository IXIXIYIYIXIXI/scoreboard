let getDataFromDatabase = function() {
    function getTextColorForBackground(hex) {
        var hex = hex.substring(1);
        var rgb = parseInt(hex, 16);
        var r = (rgb >> 16) & 0xff;
        var g = (rgb >>  8) & 0xff;
        var b = (rgb >>  0) & 0xff;
        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luma > 150 ? "#000000" : "#ffffff";
    }

    let users = [
        [0, "Ishawn", "#8f00ff", "https://cdn.discordapp.com/avatars/164874920701067264/e203ec771f89b249a985833ed7e3b266.webp?size=128"],
        [1, "Kavin", "#404040", "https://cdn.discordapp.com/avatars/188463569157881856/a92ec885fce994c0727bf103deca8488.webp?size=128"],
        [2, "Andrew", "#2eca68", "https://cdn.discordapp.com/avatars/156934322165776384/f5309719034e85eded2c9ced46de0c6b.webp?size=128"],
        [4, "Venkat", "#008080", "https://cdn.discordapp.com/attachments/863217152361365554/863217667335127040/venkat.jpg"],
        [5, "Anjali", "#D7707E", "https://cdn.discordapp.com/avatars/539256425927540758/3ed0ecddf7a20c077e7a3e2fd1fbb296.webp?size=128"],
        [6, "Ashlee", "#9AC8FF", "https://cdn.discordapp.com/avatars/235730443616518145/b18ad9afdd764f610af44b7f2cb74722.webp?size=128"],
        [7, "Jalen", "#000", "https://cdn.discordapp.com/avatars/198860502590423040/2a3d3204df5504cc5890e5bdf634c574.webp?size=128"],
        [8, "Will", "#ee2400", "https://cdn.discordapp.com/avatars/173933721919946752/120b291139b57857896167c767afd4d8.webp?size=128"],
        [9, "Aadil", "#00FE00", "https://cdn.discordapp.com/avatars/180448170885644288/95b74b47138ebd9971416f9d8b146afe.webp?size=128"],
        [10, "Daniel", "#c0c0c0", "https://cdn.discordapp.com/avatars/164869984101728256/a_6b7544e9f6f6099b403ee57647a0df61.webp?size=128"]
    ];
    users.sort(function(a, b) {
        return a[1] < b[1] ? -1 : 1;
    });

    let userObjects = [];
    users.forEach(user => {
        let userId = user[0];
        let name = user[1];
        let color = user[2];
        let pfpUrl = user[3];
        let textColor = getTextColorForBackground(color);
        let object = {
            userId,
            name,
            color,
            pfpUrl,
            textColor
        };
        userObjects.push(object);
    });

    return userObjects;
};

let displayUserSelect = function(users) {
    function generateRowDiv(user) {        
        let pfpDiv = $("<div>", { class: "pfp-wrapper" });
        let pfpImg = $("<img>", { class: "pfp", src: user.pfpUrl });
        pfpDiv.append(pfpImg);

        let nameDiv = $("<div>", { class: "name-wrapper" });
        let nameSpan = $("<span>", { class: "name" }).text(user.name);
        nameSpan.css({ color: user.textColor });
        nameDiv.append(nameSpan);

        let checkboxDiv = $("<div>", { class: "checkbox-wrapper" });
        let checkboxInput = $("<input>", { class: "checkbox", type: "checkbox" });
        checkboxDiv.append(checkboxInput);

        let rowDiv = $("<div>", { class: "row-wrapper" });
        rowDiv.css({ "background-color": user.color });
        rowDiv.append(pfpDiv, nameDiv, checkboxDiv);
        rowDiv.data("user", user);

        return rowDiv;
    }

    users.forEach(user => {
        $("#userSelect").append(generateRowDiv(user));
    })

    $("#content").removeClass("hidden");
};

$(document).ready(function() {
    let users = getDataFromDatabase();
    displayUserSelect(users);
});

var startGame = function(players) {
    function generateRowDiv(player) {        
        let pfpDiv = $("<div>", { class: "pfp-wrapper" });
        let pfpImg = $("<img>", { class: "pfp", src: player.pfpUrl });
        pfpDiv.append(pfpImg);

        let nameDiv = $("<div>", { class: "name-wrapper" });
        let nameSpan = $("<span>", { class: "name" }).text(player.name);
        nameSpan.css({ color: player.textColor });
        nameDiv.append(nameSpan);

        let scoreDiv = $("<div>", { class: "score-wrapper" });
        let scoreSpan = $("<span>", { class: "score" }).text(0);
        scoreSpan.css({ color: player.textColor });
        scoreDiv.append(scoreSpan);

        let incrementDiv = $("<div>", { class: "increment-wrapper" });
        let incrementButton = $("<button>", { type:"button", class: "increment-button btn btn-sm", onclick: "incrementButtonPressed(event)" }).text("+");
        incrementDiv.append(incrementButton);

        let decrementDiv = $("<div>", { class: "decrement-wrapper" });
        let decrementButton = $("<button>", { type:"button",class: "decrement-button btn btn-sm", onclick: "decrementButtonPressed(event)" }).text("-");
        decrementDiv.append(decrementButton);

        let rowDiv = $("<div>", { class: "row-wrapper" });
        rowDiv.css({ "background-color": player.color });
        rowDiv.append(pfpDiv, nameDiv, scoreDiv, incrementDiv, decrementDiv);
        rowDiv.data("player", player);

        return rowDiv;
    }

    players.forEach(player => {
        $("#scoreboard").append(generateRowDiv(player));
    });

    $("#pregame").addClass("hidden");
    $("#scoreboard").removeClass("hidden");
};

var updateScoreboard = function() {
    let rowDivs = $("#scoreboard").children().get();
    rowDivs.sort(function(a, b) {
        let aScore = parseInt($(a).find(".score").text());
        let bScore = parseInt($(b).find(".score").text());
        if (aScore > bScore) {
            return -1;
        } else if (aScore < bScore) {
            return 1;
        } else {
            return $(a).find(".name").text() < $(b).find(".name").text() ? -1 : 1;
        }
    });
    rowDivs.forEach(rowDiv => {
        $("#scoreboard").append($(rowDiv));
    });
}