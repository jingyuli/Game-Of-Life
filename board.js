/**
* Computes m mod n ensuring no negative numbers are returned
* @param m the dividend
* @param n the divisor
*/

const rows = 16;
const cols = 16;

/** 
* Controller
* @return Board object which contains a Grid object (model) and Interface object (view)
*/
var Board = function() {
    var that = Object.create(Board.prototype);
    var internal = Grid();
    var interface = Interface();
    // Allow user to select alive squares
    var select = true;
    
    /**
    * Initializes Board - adds click listener to each cell
    */
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
    
    /**
    * Called when square is clicked on (or the equivalent)
    * Wakes a square that is in hibernation; hibernates a square that is awake
    * @param row in grid
    * @param column in grid
    */
    that.square_click = function(i, j) {
        internal.square_click(i, j);
        interface.square_click(i, j, internal, select);
    }
    
    /**
    * Wakes a square
    * @param row in grid
    * @param column in grid
    */
    that.square_wake = function(i, j) {
        internal.square_wake(i, j);
        interface.square_wake(i, j, select);
    }
    
    /**
    * Hibernates a square
    * @param row in grid
    * @param column in grid
    */
    that.square_hibernate = function(i, j) {
        internal.square_hibernate(i, j);
        interface.square_hibernate(i, j, select);
    }
    
    /**
    * Enters select mode, where user can select which squares are awake
    */
    that.enter_select_mode = function() {
        select = true;
        interface.enter_select_mode();
    }
    
    /**
    * Exits select mode (i.e. starts simulation)
    */
    that.leave_select_mode = function() {
        select = false;
        interface.leave_select_mode();
    }
    
    /**
    * Hibernates every square
    */
    that.clear_board = function() {
        that.enter_select_mode();
        internal.clear_board();
        interface.clear_board();
    }
    
    /**
    * Updates board (next generation)
    */
    that.update_board = function() {
        internal.update_board(select);
        interface.update_board(internal, select);
    }
    Object.freeze(that);
    return that;
}