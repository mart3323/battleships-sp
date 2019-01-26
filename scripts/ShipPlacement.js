var ShipPlacement = {
    start: function () {
        $("#boards").show();
        $(".board.opponent").hide();
        $("#score").hide();
        $("#submitshipsbutton").show().attr("disabled", true).off().click(ShipPlacement.finish);
        ShipPlacement.generateBoard($(".board.own"));
        ShipPlacement.prepHandlers($(".board.own"));
    },
    generateBoard: function (board) {
        board.empty();
        var size = $("body").data("board_size");
        for (var y = 0; y < size; y++) {
            var row = $("<tr></tr>");
            for (var x = 0; x < size; x++) {
                var square = $("<td></td>");
                square.data("x",x);
                square.data("y",y);
                square.addClass("cell");
                square.appendTo(row);
            }
            row.appendTo(board);
        }
    },
    prepHandlers: function (board) {
        board.off();
        board.find(".cell").hover(this.overlay.add, this.overlay.remove);
        board.on("click", ".cell", ShipPlacement.boardClick);
    },
    isValidPos: function($el){
        var up = TableNavigation.up;
        var down = TableNavigation.down;
        var left = TableNavigation.left;
        var right = TableNavigation.right;

        if($el.hasClass("ship")) return false;
        if(right($el).hasClass("ship") || right($el).length == 0) return false;
        var surrounding_tiles = [
            left($el)
            ,up($el)
            ,right(up($el))
            ,right(right($el))
            ,right(down($el))
            ,down($el)
        ];
        for (var i = 0; i < surrounding_tiles.length; i++) {
            if(surrounding_tiles[i].length != 0){
                if(surrounding_tiles[i].hasClass("ship")){
                    return false;
                }
            }
        }
        return true;

    },
    placeShip: function ($this) {
        var right = TableNavigation.right;
        $this.addClass("ship").addClass("left");
        right($this).addClass("ship").addClass("right");
    },
    boardClick: function (e) {
        var up = TableNavigation.up;
        var down = TableNavigation.down;
        var left = TableNavigation.left;
        var right = TableNavigation.right;

        console.log(e);

        var $this = $(e.target);

        if($this.hasClass("ship")){
            $this.removeClass("ship");
            left($this).removeClass("ship");
            right($this).removeClass("ship");
        } else if(ShipPlacement.isValidPos($this)){
            ShipPlacement.placeShip($this);
        }
        ShipPlacement.checkIfAllShipsPlaced();

    },
    checkIfAllShipsPlaced: function () {
        var placed = $(".board.own .cell.ship.left").length;
        var ships = $("body").data("num_ships");
        $("#submitshipsbutton").attr("disabled", placed != ships )
    },
    overlay: {
        remove: function () {
            var right = TableNavigation.right;
            $(this).removeClass("hover").removeClass("invalid").removeClass("valid");
            right($(this)).removeClass("hover").removeClass("invalid").removeClass("valid");
        },
        add: function () {
            var right = TableNavigation.right;
            var validityClass = ShipPlacement.isValidPos($(this)) ? "valid" : "invalid";
            $(this).addClass("hover").addClass(validityClass);
            right($(this)).addClass("hover").addClass(validityClass);
        }
    },

    AutoplaceShips: function ($el) {
        var num_ships = $("body").data("num_ships");
        ShipPlacement.generateBoard($el);
        for (var i = 0; i < num_ships; i++) {
            var validPositions = [];
            $el.find(".cell").each(function(){
                if (ShipPlacement.isValidPos($(this))) {
                    validPositions.push($(this));
                }
            });
            var random_index = Math.floor(Math.random() * validPositions.length);
            ShipPlacement.placeShip(validPositions[random_index])
        }
    },
    finish: function () {
        if(!$(this).attr("disabled")){
            ShipPlacement.AutoplaceShips($(".board.opponent"));
            $("#boards *").off();
            $("#submitshipsbutton").hide();
            $("body").trigger("MainGame");
        }
    }

};