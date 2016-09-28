(function() {
  mocha.setup("bdd");
  var assert = chai.assert;

  describe("TrieNode", function() {
    describe("addword", function() {
        
        /*************** Testing addWord() using TrieNode ***************/
        // Instantiate TrieNode
        var empty_trie = TrieNode();
        var r_subtrie;
        var a_subtrie;
        var b1_subtrie;
        var b2_subtrie;
        var i_subtrie;
        var t_subtrie;
        empty_trie.addWord("rabbit");
        // Checks if Trie correctly adds a single word
        // Checks to make sure nodes that shouldn't have been added are not in the Trie
        it("Root node not word", function() {
            // Check root TrieNode is not a word
            assert.equal(false, empty_trie.check_if_word());
        });
        it("Checking \'r\' subtrie exists and node is not a word, also checks invalid child character does not exist", function() {
            // Gets 'r' subtrie and tests that it is of the prototype TrieNode, and that it is not a word
            r_subtrie = empty_trie.get_child("r");
            assert.equal(false, r_subtrie === 0);
            assert.equal(false, r_subtrie.check_if_word());
            
            // Checks that invalid child does not exist
            assert.equal(empty_trie.get_child("x"), 0);
        });
        it("Checking \'a\' subtrie exists and node is not a word", function() {
            // Gets 'a' subtrie and tests that it is of the prototype TrieNode, and that it is not a word
            a_subtrie = r_subtrie.get_child("a");
            assert.equal(false, a_subtrie === 0);
            assert.equal(false, a_subtrie.check_if_word());
        });
        it("Checking \'b\' subtrie exists and node is not a word", function() {
            // Gets 'b' subtrie and tests that it is of the prototype TrieNode, and that it is not a word
            b1_subtrie = a_subtrie.get_child("b");
            assert.equal(false, b1_subtrie === 0);
            assert.equal(false, b1_subtrie.check_if_word());
        });
        it("Checking second \'b\' subtrie exists and node is not a word", function() {
            // Gets 'b' subtrie and tests that it is of the prototype TrieNode, and that it is not a word
            b2_subtrie = b1_subtrie.get_child("b");
            assert.equal(false, b2_subtrie === 0);
            assert.equal(false, b2_subtrie.check_if_word());
        });
        it("Checking \'i\' subtrie exists and node is not a word", function() {
            // Gets 'i' subtrie and tests that it is of the prototype TrieNode, and that it is not a word
            i_subtrie = b2_subtrie.get_child("i");
            assert.equal(false, i_subtrie === 0);
            assert.equal(false, i_subtrie.check_if_word());
        });
        it("Checking \'t\' subtrie exists and node is not a word, also checks invalid child character does not exist", function() {
            // Gets 't' subtrie and tests that it is a word
            t_subtrie = i_subtrie.get_child("t");
            assert.equal(false, t_subtrie === 0);
            assert.equal(true, t_subtrie.check_if_word());
            
            // Checks that invalid child does not exist
            assert.equal(empty_trie.get_child("t"), 0);
        });
    });
  });


  mocha.run();
})()
