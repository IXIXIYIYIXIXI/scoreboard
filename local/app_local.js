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
        [3, "Will", "#ee2400", "https://cdn.discordapp.com/avatars/173933721919946752/120b291139b57857896167c767afd4d8.webp?size=128"]
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
}

let displayUserSelect = function(users) {
    function generateRowDiv(user) {        
        let pfpDiv = $("<div>", { class: "pfp-wrapper" });
        let pfpImg = $("<img>", { class: "pfp", src: user.pfpUrl });
        pfpDiv.append(pfpImg);

        let nameDiv = $("<div>", { class: "name-wrapper" });
        let nameSpan = $("<span>", { class: "name" }).text(user.name);
        nameSpan.css({ color: user.textColor })
        nameDiv.append(nameSpan);

        let checkboxDiv = $("<div>", { class: "checkbox-wrapper" });
        let checkboxInput = $("<input>", { type: "checkbox" });
        checkboxDiv.append(checkboxInput);

        let rowDiv = $("<div>", { class: "row-wrapper" });
        rowDiv.css({ "background-color": user.color });
        rowDiv.append(pfpDiv, nameDiv, checkboxDiv);

        return rowDiv;
    }

    users.forEach(user => {
        $("#userSelect").append(generateRowDiv(user));
    })

    $("#content").removeClass("hidden");
}

$(document).ready(function() {
    let users = getDataFromDatabase();
    displayUserSelect(users);
});
