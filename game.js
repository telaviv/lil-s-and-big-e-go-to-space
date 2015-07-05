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
    },

    getPosition: function() {
        return {x: this.x / BLOCK_WIDTH, y: this.y / BLOCK_HEIGHT};
    }
});

Crafty.c('Board', {
    init: function() {
        this.requires('2D, DOM, Color, Delay');
        this.attr({w: BOARD_WIDTH, h: BOARD_HEIGHT, x: 0, y: 0});
        this.color('green');
        this.createEmptyGrid();
        this.appendBlock(0, 0);
        this.delay(this.updateState, 1000, 10);
    },

    createEmptyGrid: function() {
        var rows = [];
        for (var x = 0; x < BOARD_BLOCK_WIDTH; ++x) {
            var column = [];
            for (var y = 0; y < BOARD_BLOCK_HEIGHT; ++y) {
                column.push(null);
            }
            rows.push(column);
        }
        this.grid = rows;
    },

    appendBlock: function(x, y) {
        this.block = Crafty.e('Block').attr({x: x, y: y}).color('#F00');
        this.attach(this.block);
        this.grid[x][y] = this.block;
    },

    updateState: function() {
        var position = this.block.getPosition();
        this.grid[position.x][position.y] = null;
        this.block.moveDown();
        this.grid[position.x][position.y + 1] = this.block;
    }
});



var board = Crafty.e('Board');
