var BLOCK_WIDTH = 50;
var BLOCK_HEIGHT = 50;
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
    },

    moveDown: function() {
        this.y += BLOCK_HEIGHT;
    }
});

Crafty.c('Board', {
    init: function() {
        this.requires('2D, DOM, Color, Delay');
        this.attr({w: BOARD_WIDTH, h: BOARD_HEIGHT, x: 0, y: 0});
        this.color('green');
        this.block = Crafty.e('Block').attr({x: 0, y: 0}).color('#F00');
        this.attach(this.block);
        this.delay(this.updateState, 1000, 10);
    },

    updateState: function() {
        this.block.moveDown();
    }
});



var board = Crafty.e('Board');
