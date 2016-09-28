var Grid = function() {
    var that = Object.create(Grid.prototype);
    
    var grid = [];
    for (var i = 0; i < rows; i++) {
        grid.push([]);
        for (var j = 0; j < cols; j++) {
            grid[i].push(false);
        }
    }
    
    that.get_value = function(i, j) {
        return grid[i][j];
    }
    
    that.square_click = function(i, j) {
        grid[i][j] = !grid[i][j];
    }
    
    that.square_wake = function(i, j) {
        grid[i][j] = true;
    }
    
    that.square_hibernate = function(i, j) {
        grid[i][j] = false;
    }
    
    that.clear_board = function() {
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                grid[i][j] = false;
            }
        }
    }
    
    that.check_clear = function() {
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                if (grid[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }
    
    that.update_board = function(select) {
        if (that.check_clear()) {
            that.clear_board();
        }
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
                }
            }
            grid = new_grid;
        }
    }
    
    Object.freeze(that);
    return that;
};