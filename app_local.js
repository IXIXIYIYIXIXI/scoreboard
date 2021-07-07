function startButtonPressed() {
    $("#userSelect").children().each(function(index, tr) {
        if ($(tr).find("input").is(":checked")) {
            console.log(index, $(tr).find("p").text());
        }
    });
}

$(document).ready(function() {
    function getTextColor(hex) {
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

    $("#content").removeClass("hidden");
});
