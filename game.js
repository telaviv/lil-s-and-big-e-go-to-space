var BLOCK_WIDTH = 50;
var BLOCK_HEIGHT = 50;
var BOARD_BLOCK_WIDTH = 6;
var BOARD_BLOCK_HEIGHT = 12;
var BOARD_WIDTH = BLOCK_WIDTH * BOARD_BLOCK_WIDTH;
var BOARD_HEIGHT = BLOCK_HEIGHT * BOARD_BLOCK_HEIGHT;
var BLOCK_SPEED = 2 // pixels per second


Crafty.init(BOARD_WIDTH, BOARD_HEIGHT, document.getElementById('game'));
Crafty.sprite("tiles.png", {RedTile:[0, 0, 50, 50]});

Crafty.c('Block', {
    init: function() {
        this.requires('2D, DOM, RedTile');
        this.attr({w: BLOCK_WIDTH, h: BLOCK_HEIGHT})
    },

    create: function(x, y) {
        this.attr({x: x * BLOCK_WIDTH, y: y * BLOCK_HEIGHT});
        return this;
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
        this.createNewBlock();
        this.blocks = [];
    },

    createNewBlock: function() {
        this.appendBlock(3, 0);
    },

    appendBlock: function(x, y) {
        this.block = Crafty.e('Block').create(x, y);
        this.attach(this.block);
    },

    shiftBlock: function(delta) {
        if (this.block === null) return;
        var position = this.block.getPosition();
        this.block.movePosition({x: delta.x, y: delta.y});
    },

    tick: function(frameData) {
        if (this.block === null) {
            this.createNewBlock();
            return;
        }

        this.shiftBlock({x: 0, y: frameData.dt / 1000 * BLOCK_SPEED});
        var pos = this.block.getPosition();
        if (pos.y === BOARD_BLOCK_HEIGHT - 1 || this.collidesWith(0, 1)) {
            this.blocks.push(this.block);
            this.block = null;
        }
    },

    moveLeft: function() {
        if (this.block === null) return;
        var pos = this.block.getPosition();
        if(pos.x !== 0 && !this.collidesWith(-1, 0)) {
            this.block.movePosition({x: -1, y: 0});
        }
    },

    moveRight: function() {
        if (this.block === null) return;
        var pos = this.block.getPosition();
        if(pos.x !== BOARD_BLOCK_WIDTH - 1 && !this.collidesWith(1, 0)) {
            this.block.movePosition({x: 1, y: 0});
        }
    },

    collidesWith: function(dx, dy) {
        var pos = this.block.getPosition()
        return this.hasBlockAt(pos.x + dx, pos.y + dy);
    },

    hasBlockAt: function(x, y) {
        var hasBlock = false
        this.blocks.forEach(function(block) {
            var pos = block.getPosition()
            if (pos.x === x && pos.y === y) {
                hasBlock = true;
            }
        });
        return hasBlock;
    },
});

Crafty.c('Board', {
    init: function() {
        this.requires('2D, DOM, Color, Delay');
        this.attr({w: BOARD_WIDTH, h: BOARD_HEIGHT, x: 0, y: 0});
        this.color('green');
        this.blocks = Crafty.e('Blocks');
        this.attach(this.blocks);
        this.bind('KeyUp', this.handleKeyPress);
        this.bind('EnterFrame', this.blocks.tick.bind(this.blocks));
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
