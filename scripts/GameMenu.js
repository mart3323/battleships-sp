
var GameMenu = {
    start: function () {
        $("#boards").hide();
        $("#board_size, #num_ships").on("click keyup mouseup change", GameMenu.onSizeChange);
        $("#playgame").click(GameMenu.finish);
        $("#gameoptions").show();
    },
    onSizeChange: function () {
        var new_size = parseInt($("#board_size").val());
        var $optionShips = $("#num_ships");
        var current_ships = parseInt($optionShips.val());
        $optionShips.val(Math.min(current_ships, new_size-1));
        GameMenu.checkValid();
    },
    checkValid: function () {
        var size = parseInt($("#board_size").val());
        var ships = parseInt($("#num_ships").val());
        if(3 <= size && size <= 10 && 1 <= ships && ships < size){
            $("#playgame").attr("disabled",false);
        } else {
            $("#playgame").attr("disabled",true);
        }
    },
    finish: function () {
        if(!$("#playgame").attr("disabled")){
            console.log("Done placing ships");
            $("#gameoptions").hide();
            $("body")
                .data("board_size",parseInt($("#board_size").val()))
                .data("num_ships",parseInt($("#num_ships").val()))
                .trigger("ShipPlacement");
        }
    },
};
