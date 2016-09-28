var Interface = function() {
    that = Object.create(Interface.prototype);
    var square_height = 4.0;
    var dist_between = 0.2;
    var col_height = square_height * rows + 2 * dist_between * rows;
    var option_width = 15;
    var main_width = col_height + option_width;
    
    var board_div = document.createElement('div');
    board_div.id = "board";
    board_div.setAttribute("style", "height: " + col_height + "vh; width: " + col_height + "vh");

    for (var i = 0; i < rows; i++) {
        var row_div = document.createElement('div');
        row_div.setAttribute("style", "display: flex");
        for (var j = 0; j < cols; j++) {
            var cell_div = document.createElement('div');
            cell_div.id = String(i) + "-" + String(j);
            cell_div.className = "cell_select";
            cell_div.setAttribute("style", "height: " + square_height + "vh; width: " + square_height + "vh; margin: " + dist_between + "vh");
            row_div.appendChild(cell_div);
        }
        board_div.appendChild(row_div);
    }

    var options = document.createElement('div');
    options.id = "options";
    options.setAttribute("style", "width: " + option_width + "vh; height: " + col_height + "vh");

    $("#main").css({width: main_width + "vh"});
    $("#main").append(board_div);
    $("#main").append(options);
    
    // Assumes square_click in the grid was called first (i.e. values updated)
    that.square_click = function(i, j, grid, select) {
        if (grid.get_value(i, j)) {
            that.square_wake(i, j, select);
        } else {
            that.square_hibernate(i, j, select);
        }
    }
    
    that.square_wake = function(i, j, select) {
        if (select) {
            $("#" + String(i) + "-" + String(j)).addClass("cell_awake").removeClass("cell_select");
        } else {
            $("#" + String(i) + "-" + String(j)).addClass("cell_awake").removeClass("cell_sleeping");
        }
    }
    
    that.square_hibernate = function(i, j, select) {
        if (select) {
            $("#" + String(i) + "-" + String(j)).addClass("cell_select").removeClass("cell_awake");
        } else {
            $("#" + String(i) + "-" + String(j)).addClass("cell_sleeping").removeClass("cell_awake");
        }
    }
    
    that.clear_board = function() {
        that.enter_select_mode();
    }
    
    that.enter_select_mode = function() {
        $(".cell_awake").addClass("cell_select").removeClass("cell_awake");
        $(".cell_sleeping").addClass("cell_select").removeClass("cell_sleeping");
    }
    
    that.leave_select_mode = function() {
        $(".cell_select").addClass("cell_sleeping").removeClass("cell_select");
    }
        
    that.update_board = function(grid, select) {
        if (grid.check_clear()) {
            that.clear_board();
        }
        if (!select) {
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    if (grid.get_value(i, j)) {
                        $("#" + String(i) + "-" + String(j)).addClass("cell_awake").removeClass("cell_sleeping");
                    } else {
                        $("#" + String(i) + "-" + String(j)).addClass("cell_sleeping").removeClass("cell_awake");
                    }
                }
            }
        }
    }

    Object.freeze(that);
    return that;
};