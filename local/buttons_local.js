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
    
}