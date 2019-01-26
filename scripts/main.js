$(document).ready(function () {
    $("body").on("New_Game ShipPlacement MainGame Scoreboard", function(){
        $("#gameoptions").hide();
        $("#boards").hide();
        $("#scoreboard").hide();
        console.log("Hidden");
    });

    $("body").on("New_Game", GameMenu.start);
    $("body").on("ShipPlacement", ShipPlacement.start);
    $("body").on("MainGame", MainGame.start);
    $("body").on("Scoreboard", ScoreBoard.start);
    //$("body").on("shipPlacement", ShipPlacement.start)


    $("#menu_new_game").click(function () {$("body").trigger("New_Game")});
    $("#menu_peek").click(function(){$("body").toggleClass("peek")});
    $("#menu_scoreboard").click(function () {$("body").trigger("Scoreboard")});

    $("body").trigger("New_Game");
});

