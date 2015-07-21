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

    movePosition: function(delta) {
        this.x += delta.x * BLOCK_WIDTH;
        this.y += delta.y * BLOCK_HEIGHT;
    },

    getPosition: function() {
        return {x: this.x / BLOCK_WIDTH, y: this.y / BLOCK_HEIGHT};
    }
});

Crafty.c('Blocks', {
    init: function() {
        this.requires('2D, DOM');
        this.attr({w: BOARD_WIDTH, h: BOARD_HEIGHT, x: 0, y: 0});
        this.appendBlock(0, 0);
        this.blocks = [];
    },

    appendBlock: function(x, y) {
        this.block = Crafty.e('Block').attr({x: x, y: y}).color('#F00');
        this.attach(this.block);
    },

    shiftBlock: function(delta) {
        var position = this.block.getPosition();
        this.block.movePosition({x: delta.x, y: delta.y});
    },


    tick: function() {
        this.shiftBlock({x: 0, y: 1});
        var pos = this.block.getPosition();
        if (pos.y === BOARD_BLOCK_HEIGHT - 1) {
            this.blocks.push(this.block);
            this.appendBlock(0, 0);
        }
    },

    moveLeft: function() {
        var pos = this.block.getPosition();
        if(pos.x !== 0) {
            this.block.movePosition({x: -1, y: 0});
        }
    },

    moveRight: function() {
        var pos = this.block.getPosition();
        if(pos.x !== BOARD_BLOCK_WIDTH - 1) {
            this.block.movePosition({x: 1, y: 0});
        }
    },
});

Crafty.c('Board', {
    init: function() {
        this.requires('2D, DOM, Color, Delay');
        this.attr({w: BOARD_WIDTH, h: BOARD_HEIGHT, x: 0, y: 0});
        this.color('green');
        this.blocks = Crafty.e('Blocks');
        this.attach(this.blocks);
        this.delay(this.blocks.tick.bind(this.blocks), 1000, -1);
        this.bind('KeyUp', this.handleKeyPress);
    },

    handleKeyPress: function(e) {
        if(e.key == Crafty.keys.LEFT_ARROW) {
            this.blocks.moveLeft();
        } else if (e.key == Crafty.keys.RIGHT_ARROW) {
            this.blocks.moveRight();
        }
    }
});






var board = Crafty.e('Board');
