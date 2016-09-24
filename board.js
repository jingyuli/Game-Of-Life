/**
* Computes m mod n ensuring no negative numbers are returned
* @param m the dividend
* @param n the divisor
*/
var my_mod = function(m, n) {
    return ((m % n) + n) % n;
}

var Board = function() {
    var that = Object.create(Board.prototype);
    var rows = 16;
    var cols = 16;
    var square_height = 4.0;
    var dist_between = 0.2;
    var col_height = square_height * rows + 2 * dist_between * rows;
    var option_width = 15;
    var main_width = col_height + option_width;
    // Allow user to select alive squares
    var select = true;
    
    var grid = Object.create(Array.prototype);
    for (var i = 0; i < rows; i++) {
        grid.push(Object.create(Array.prototype));
    }
    
    var board_div = document.createElement('div');
    board_div.id = "board";
    board_div.setAttribute("style", "height: " + col_height + "vh; width: " + col_height + "vh");
    
    that.square_click = function(i, j) {
        if (grid[i][j]) {
            that.square_hibernate(i, j);
        } else {
            that.square_wake(i, j);
        }
    }
    
    that.square_wake = function(i, j) {
        grid[i][j] = true;
//        $("#" + String(i) + "-" + String(j)).css({backgroundColor: '#443985'});
        if (select) {
            $("#" + String(i) + "-" + String(j)).addClass("cell_awake").removeClass("cell_select");
        } else {
            $("#" + String(i) + "-" + String(j)).addClass("cell_awake").removeClass("cell_sleeping");
        }
    }
    
    that.square_hibernate = function(i, j) {
        grid[i][j] = false;
//        $("#" + String(i) + "-" + String(j)).css({backgroundColor: '#bebae3'});
        if (select) {
            $("#" + String(i) + "-" + String(j)).addClass("cell_select").removeClass("cell_awake");
        } else {
            $("#" + String(i) + "-" + String(j)).addClass("cell_sleeping").removeClass("cell_awake");
        }
    }
    
    for (var i = 0; i < rows; i++) {
        var row_div = document.createElement('div');
        row_div.setAttribute("style", "display: flex");
        for (var j = 0; j < cols; j++) {
            grid[i][j] = false;
            var cell_div = document.createElement('div');
            cell_div.id = String(i) + "-" + String(j);
            cell_div.className = "cell_select";
            cell_div.setAttribute("style", "height: " + square_height + "vh; width: " + square_height + "vh; margin: " + dist_between + "vh");
            // creates closure so we can pass by value i, j
            (function (i, j) {
                cell_div.onclick = function() {
                    if (select) {
                        that.square_click(i, j);
                    }
                }
            })(i, j);
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
    
    that.update_board = function() {
        if (!select) {
            var new_grid = Object.create(Array.prototype);
            for (var i = 0; i < rows; i++) {
                new_grid.push(Object.create(Array.prototype));
            }
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    var neighbors = [];
                    var directions = [-1, 0, 1];
                    for (var y = 0; y < 3; y++) {
                        for (var x = 0; x < 3; x++) {
                            // not the current location
                            if (x != 1 || y != 1) {
                                neighbors.push([i + directions[y], j + directions[x]]);
                            }
                        }
                    }
                    var states = neighbors.map(function(coords) {
                        return grid[my_mod(coords[0], rows)][my_mod(coords[1], cols)];
                    });
                    var alive = states.filter(function(color) { return color; });
                    var num_alive = alive.length;
                    if (grid[i][j]) {
                        if (num_alive > 1 && num_alive < 4) {
                            new_grid[i][j] = true;
                        } else {
                            new_grid[i][j] = false;
                        }
                    } else {
                        if (num_alive == 3) {
                            new_grid[i][j] = true;
                        } else {
                            new_grid[i][j] = false;
                        }
                    }
                    if (new_grid[i][j]) {
                        $("#" + String(i) + "-" + String(j)).addClass("cell_awake").removeClass("cell_sleeping");
                    } else {
                        $("#" + String(i) + "-" + String(j)).addClass("cell_sleeping").removeClass("cell_awake");
                    }
                }
            }
            grid = new_grid;
        }
    }
    
    that.start_simu = function() {
        that.leave_select_mode();
    }
    
    that.clear_board = function() {
        that.enter_select_mode();
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                grid[i][j] = false;
            }
        }
    }
    
    that.enter_select_mode = function() {
        select = true;
        $(".cell_awake").addClass("cell_select").removeClass("cell_awake");
        $(".cell_sleeping").addClass("cell_select").removeClass("cell_sleeping");
    }
    
    that.leave_select_mode = function() {
        select = false;
        $(".cell_select").addClass("cell_sleeping").removeClass("cell_select");
    }
    
    Object.freeze(that);
    return that;
};

var Options = function(board) {
    var start_button = document.createElement('div');
    start_button.id = "start_button";
    start_button.className = "my_button";
    start_button.innerHTML = "Start";
    start_button.onclick = board.start_simu;
    
    var clear_button = document.createElement('div');
    clear_button.id = "clear_button";
    clear_button.className = "my_button";
    clear_button.innerHTML = "Clear";
    clear_button.onclick = board.clear_board;
    
    $('#options').append(start_button);
    $('#options').append(clear_button);
    
}

var game_board = Board();
Options(game_board);
//game_board.clear_board();
setInterval(game_board.update_board, 1000);