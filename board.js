/**
* Computes m mod n ensuring no negative numbers are returned
* @param m the dividend
* @param n the divisor
*/

const rows = 16;
const cols = 16;

var my_mod = function(m, n) {
    return ((m % n) + n) % n;
}

var Board = function() {
    var that = Object.create(Board.prototype);
    var internal = Grid();
    var interface = Interface();
    // Allow user to select alive squares
    var select = true;
    that.init = function() {
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                var cell_id = "#" + String(i) + "-" + String(j);
                // creates closure so we can pass by value i, j
                (function (i, j) {
                    $(cell_id).click(function() {
                        that.square_click(i, j);
                    });
                })(i, j);
            }
        }
    }
    that.square_click = function(i, j) {
        internal.square_click(i, j);
        interface.square_click(i, j, internal, select);
    }
    that.square_wake = function(i, j) {
        internal.square_wake(i, j);
        interface.square_wake(i, j, select);
    }
    that.square_hibernate = function(i, j) {
        internal.square_hibernate(i, j);
        interface.square_hibernate(i, j, select);
    }
    that.enter_select_mode = function() {
        select = true;
        interface.enter_select_mode();
    }
    that.leave_select_mode = function() {
        select = false;
        interface.leave_select_mode();
    }
    that.clear_board = function() {
        that.enter_select_mode();
        internal.clear_board();
        interface.clear_board();
    }
    that.update_board = function() {
        internal.update_board(select);
        interface.update_board(internal, select);
    }
    Object.freeze(that);
    return that;
}