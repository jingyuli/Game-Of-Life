(function() {
  mocha.setup("bdd");
  var assert = chai.assert;

  describe("Grid", function() {
    describe("square_click", function() {
        
        // Instantiate Grid
        var test_board = Grid();
        
        it("Cells initially in hibernation", function() {
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    assert.equal(false, test_board.get_value(i, j));
                }
            }
        });
        
        it("Clicking on a hibernating square", function() {
            test_board.square_click(5, 3);
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    if (i == 5 && j == 3) {
                        assert.equal(true, test_board.get_value(i, j));
                    } else {
                        assert.equal(false, test_board.get_value(i, j));
                    }
                }
            }
        });
        
        it("Clicking on a awake square", function() {
            test_board.square_click(5, 3);
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    assert.equal(false, test_board.get_value(i, j));
                }
            }
        });
    });
      
    describe("square_wake", function() {
        
        // Instantiate Grid
        var test_board = Grid();
        
        it("Waking up hibernating square", function() {
            test_board.square_wake(0, 0);
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    if (i == 0 && j == 0) {
                        assert.equal(true, test_board.get_value(i, j));
                    } else {
                        assert.equal(false, test_board.get_value(i, j));
                    }
                }
            }
        });
        
        it("Waking up already awake square", function() {
            test_board.square_wake(0, 0);
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    if (i == 0 && j == 0) {
                        assert.equal(true, test_board.get_value(i, j));
                    } else {
                        assert.equal(false, test_board.get_value(i, j));
                    }
                }
            }
        });
    });
        
    describe("square_hibernate", function() {
        
        // Instantiate Grid
        var test_board = Grid();
        
        it("Hibernating awake square", function() {
            test_board.square_wake(0, 0);
            test_board.square_hibernate(0, 0);
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    assert.equal(false, test_board.get_value(i, j));
                }
            }
        });
        
        it("Hibernating already hibernating square", function() {
            test_board.square_wake(1, 0);
            test_board.square_hibernate(0, 0);
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    if (i == 1 && j == 0) {
                        assert.equal(true, test_board.get_value(i, j));
                    } else {
                        assert.equal(false, test_board.get_value(i, j));
                    }
                }
            }
        });
    });
      
    describe("clear_board", function() {
        
        // Instantiate Grid
        var test_board = Grid();
        
        it("Waking up hibernating square", function() {
            test_board.square_wake(0, 0);
            test_board.square_wake(0, 1);
            test_board.square_wake(3, 5);
            test_board.square_wake(3, 10);
            test_board.square_wake(15, 15);
            test_board.clear_board();
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    assert.equal(false, test_board.get_value(i, j));
                }
            }
        });
    });
      
    describe("check_clear", function() {
        
        // Instantiate Grid
        var test_board = Grid();
        
        it("Checking board with all hibernating squares", function() {
            assert.equal(true, test_board.check_clear());
        });
        
        it("Checking board with awake squares", function() {
            test_board.square_wake(0, 0);
            test_board.square_wake(0, 1);
            assert.equal(false, test_board.check_clear());
        });
    });
      
    describe("update_board", function() {
        
        it("Checking block configuration", function() {
            // Instantiate Grid
            var test_board = Grid();
            test_board.square_wake(1, 1);
            test_board.square_wake(1, 2);
            test_board.square_wake(2, 1);
            test_board.square_wake(2, 2);
            test_board.update_board();
            assert.equal(true, test_board.get_value(1, 1));
            assert.equal(true, test_board.get_value(1, 2));
            assert.equal(true, test_board.get_value(2, 1));
            assert.equal(true, test_board.get_value(2, 2));
        });
        
        it("Checking glider configuration", function() {
            // Instantiate Grid
            var test_board = Grid();
            test_board.square_wake(3, 5);
            test_board.square_wake(4, 6);
            test_board.square_wake(5, 6);
            test_board.square_wake(5, 5);
            test_board.square_wake(5, 4);
            test_board.update_board();
            assert.equal(true, test_board.get_value(4, 4));
            assert.equal(true, test_board.get_value(4, 6));
            assert.equal(true, test_board.get_value(5, 6));
            assert.equal(true, test_board.get_value(5, 5));
            assert.equal(true, test_board.get_value(6, 5));
        });
        
        it("Checking 1x3 configuration", function() {
            // Instantiate Grid
            var test_board = Grid();
            test_board.square_wake(7, 6);
            test_board.square_wake(7, 7);
            test_board.square_wake(7, 8);
            test_board.update_board();
            assert.equal(true, test_board.get_value(6, 7));
            assert.equal(true, test_board.get_value(7, 7));
            assert.equal(true, test_board.get_value(8, 7));
            test_board.update_board();
            assert.equal(true, test_board.get_value(7, 6));
            assert.equal(true, test_board.get_value(7, 7));
            assert.equal(true, test_board.get_value(7, 8));
        });
        
        it("Checking 1x3 configuration, wrap around", function() {
            // Instantiate Grid
            var test_board = Grid();
            test_board.square_wake(0, 0);
            test_board.square_wake(0, 1);
            test_board.square_wake(0, 2);
            test_board.update_board();
            assert.equal(true, test_board.get_value(15, 1));
            assert.equal(true, test_board.get_value(0, 1));
            assert.equal(true, test_board.get_value(1, 1));
            test_board.update_board();
            assert.equal(true, test_board.get_value(0, 0));
            assert.equal(true, test_board.get_value(0, 1));
            assert.equal(true, test_board.get_value(0, 2));
        });
        
        it("Checking another wrap around configuration", function() {
            // Instantiate Grid
            var test_board = Grid();
            test_board.square_wake(0, 0);
            test_board.square_wake(0, 1);
            test_board.square_wake(0, 15);
            test_board.update_board();
            assert.equal(true, test_board.get_value(15, 0));
            assert.equal(true, test_board.get_value(0, 0));
            assert.equal(true, test_board.get_value(1, 0));
            test_board.update_board();
            assert.equal(true, test_board.get_value(0, 0));
            assert.equal(true, test_board.get_value(0, 1));
            assert.equal(true, test_board.get_value(0, 15));
        });
    })
  });

  mocha.run();
})()