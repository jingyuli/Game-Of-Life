var Options = function(board) {
    var start_button = document.createElement('div');
    start_button.id = "start_button";
    start_button.className = "my_button";
    start_button.innerHTML = "Start";
    start_button.onclick = board.leave_select_mode;
    
    var clear_button = document.createElement('div');
    clear_button.id = "clear_button";
    clear_button.className = "my_button";
    clear_button.innerHTML = "Clear";
    clear_button.onclick = board.clear_board;
    
    var preset_1 = document.createElement('div');
    preset_1.id = "preset_1";
    preset_1.className = "my_button";
    preset_1.innerHTML = "Preset 1";
    preset_1.onclick = function() {run_preset(board, preset_pattern_1)};
    
    var preset_2 = document.createElement('div');
    preset_2.id = "preset_2";
    preset_2.className = "my_button";
    preset_2.innerHTML = "Preset 2";
    preset_2.onclick = function() {run_preset(board, preset_pattern_2)};
    
    var preset_3 = document.createElement('div');
    preset_3.id = "preset_3";
    preset_3.className = "my_button";
    preset_3.innerHTML = "Preset 3";
    preset_3.onclick = function() {run_preset(board, preset_pattern_3)};
    
    $('#options').append(start_button);
    $('#options').append(clear_button);
    $('#options').append(preset_1);
    $('#options').append(preset_2);
    $('#options').append(preset_3);
    
}

var run_preset = function(board, pattern) {
    board.clear_board();
    pattern(board);
    board.leave_select_mode();
}

var preset_pattern_1 = function(board) {
    board.square_wake(3, 4);
    board.square_wake(4, 4);
    board.square_wake(5, 4);
    board.square_wake(3, 11);
    board.square_wake(4, 11);
    board.square_wake(5, 11);
    board.square_wake(8, 7);
    board.square_wake(8, 8);
    board.square_wake(9, 6);
    board.square_wake(10, 6);
    board.square_wake(9, 9);
    board.square_wake(10, 9);
    board.square_wake(11, 7);
    board.square_wake(11, 8);
}

var preset_pattern_2 = function(board) {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if ((i == j) || (i + j == rows - 1)) {
                board.square_wake(i, j);
            }
        }
    }
}

var preset_pattern_3 = function(board) {
    for (var i = 3; i < rows - 3; i++) {
        board.square_wake(i, 3);
        board.square_wake(3, i);
        board.square_wake(i, rows - 4);
        board.square_wake(rows - 4, i);
    }
}

var game_board = Board();
game_board.init();
Options(game_board);
setInterval(game_board.update_board, 800);