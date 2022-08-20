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
        [7, "Will", "#ee2400", "https://cdn.discordapp.com/avatars/173933721919946752/ff4978552393415aca6167c5f7b01e98.webp?size=128"],
        [8, "Daniel", "#c0c0c0", "https://cdn.discordapp.com/avatars/164869984101728256/eb49c5abaeebebaac94d1358a2339af5.webp?size=128"],
        [9, "Sean", "#f547ff", "https://cdn.discordapp.com/avatars/165612940177833984/6c3b381a8d34a45f0e2de47a9e172333.webp?size=128"],
        [10, "Sabrina", "#9acbff", "https://cdn.discordapp.com/avatars/716047120909598812/1f06bf796f707f355d29a2c2ea146e06.webp?size=128"],
        [11, "Tri", "#26453e", "https://icons.iconarchive.com/icons/fasticon/happy-trees/256/Tree-02-icon.png"],
        [12, "Emaan", "#ef5250", "https://cdn.discordapp.com/avatars/409189769273278464/38947cc4eb45b8fd8746738d0d9da273.webp?size=128"],
        [13, "Megan", "#000000", ""],
        [14, "Sid", "#000000", ""],
        [15, "Aadil", "#000000", ""],
        [16, "Myana", "#000000", ""],
	[16, "Rushil", "FF0000", ""]
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
        let pfpImg = $("<img>", { class: "pfp", onerror: "this.src='../assets/defpfp.jpg'" , src: user.pfpUrl });
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
        let pfpImg = $("<img>", { class: "pfp", onerror: "this.src='../assets/defpfp.jpg'" , src: player.pfpUrl });
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
