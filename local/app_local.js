$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();  
    let users = getDataFromDatabase();
    displayUserSelect(users);
});

let getDataFromDatabase = function() {
    function getTextColorForBackground(hex) {
        var hex = hex.substring(1);
        var rgb = parseInt(hex, 16);
        var r = (rgb >> 16) & 0xff;
        var g = (rgb >>  8) & 0xff;
        var b = (rgb >>  0) & 0xff;
        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luma > 150 ? "#333333" : "#EFEFEF";
    }

    let users = [
        [0, "Ishawn", "#7a25ba", "https://cdn.discordapp.com/avatars/164874920701067264/e203ec771f89b249a985833ed7e3b266.webp?size=128"],
        [1, "Kavin", "#404040", "https://cdn.discordapp.com/avatars/188463569157881856/a92ec885fce994c0727bf103deca8488.webp?size=128"],
        [2, "Andrew", "#2eca68", "https://cdn.discordapp.com/avatars/156934322165776384/f5309719034e85eded2c9ced46de0c6b.webp?size=128"],
        [4, "Venkat", "#008080", "https://cdn.discordapp.com/avatars/142444164401987584/e5e01422082b56c074ba31d1e4f6538f.webp?size=128"],
        [5, "Anjali", "#D7707E", "https://cdn.discordapp.com/avatars/539256425927540758/3ed0ecddf7a20c077e7a3e2fd1fbb296.webp?size=128"],
        [6, "Jalen", "#000000", "https://cdn.discordapp.com/avatars/198860502590423040/2a3d3204df5504cc5890e5bdf634c574.webp?size=128"],
        [7, "Will", "#ee2400", "https://cdn.discordapp.com/avatars/173933721919946752/120b291139b57857896167c767afd4d8.webp?size=128"],
        [8, "Daniel", "#c0c0c0", "https://cdn.discordapp.com/avatars/164869984101728256/a_6b7544e9f6f6099b403ee57647a0df61.webp?size=128"],
        [9, "Sean", "#f547ff", "https://cdn.discordapp.com/avatars/165612940177833984/6c3b381a8d34a45f0e2de47a9e172333.webp?size=128"],
        [10, "Sabrina", "#9acbff", "https://cdn.discordapp.com/avatars/716047120909598812/1f06bf796f707f355d29a2c2ea146e06.webp?size=128"],
        [11, "Ying", "#ff8b00", "https://static.wikia.nocookie.net/rainbowsix/images/2/27/Ying_-_Full_Body.png/revision/latest/top-crop/width/360/height/360?cb=20180409014805"],
        [12, "Sid", "#BAB86C", "data:image/jpeg;base64,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"],
        [13, "Tri", "#26453e", "https://icons.iconarchive.com/icons/fasticon/happy-trees/256/Tree-02-icon.png"]
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


function hotCommit(e) {
    if (e.key === 'Enter') {
        commitButtonPressed();
    }
}

document.addEventListener('keyup', hotCommit, false);


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
        let additionalScoreSpan = $("<span>", { class: "additional-score" }).text("");
        additionalScoreSpan.css({ color: player.textColor, "padding-left": 20 });
        scoreDiv.append(scoreSpan);
        scoreDiv.append(additionalScoreSpan);        

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

    updateScoreboard();

    $("#pregame").addClass("hidden");
    $("#perigame").removeClass("hidden");
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
