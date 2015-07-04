var BLOCK_WIDTH = 60;
var BLOCK_HEIGHT = 80;
var BOARD_BLOCK_WIDTH = 6;
var BOARD_BLOCK_HEIGHT = 12;
var BOARD_WIDTH = BLOCK_WIDTH * BOARD_BLOCK_WIDTH;
var BOARD_HEIGHT = BLOCK_HEIGHT * BOARD_BLOCK_HEIGHT;


Crafty.init(BOARD_WIDTH, BOARD_HEIGHT, document.getElementById('game'));

Crafty.c('Block', {
    init: function() {
        this.requires('2D, DOM, Color');
        this.attr({w: BLOCK_WIDTH, h: BLOCK_HEIGHT})
    },

    create: function(x, y) {
        this.attr({x: x * BLOCK_WIDTH, y: y * BLOCK_HEIGHT});
    }
});

Crafty.e('Block').attr({x: 0, y: 0}).color('#F00');
