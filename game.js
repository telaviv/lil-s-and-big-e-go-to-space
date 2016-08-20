"use strict";

var BLOCK_WIDTH = 25;
var BLOCK_HEIGHT = BLOCK_WIDTH;
var BOARD_BLOCK_WIDTH = 20;
var BOARD_BLOCK_HEIGHT = 10;
var BOARD_WIDTH = BLOCK_WIDTH * BOARD_BLOCK_WIDTH;
var BOARD_HEIGHT = BLOCK_HEIGHT * BOARD_BLOCK_HEIGHT;
var BLOCK_SPEED = BLOCK_HEIGHT // pixels per second


Crafty.init(BOARD_WIDTH, BOARD_HEIGHT, document.getElementById('game'));
Crafty.sprite("tiles.png", {Tile: [5 * BLOCK_WIDTH, 0, BLOCK_WIDTH, BLOCK_HEIGHT]});

Crafty.c('Block', {
  init: function() {
    this.requires('2D, Canvas, Motion, Collision, Tile');
    this.attr({w: BLOCK_WIDTH, h: BLOCK_HEIGHT, vy: BLOCK_SPEED})
    this.checkHits('Floor, Block')
    this.bind('HitOn', this._onHit.bind(this));
  },

  create: function(x, y) {
    this.attr({x: x * BLOCK_WIDTH, y: y * BLOCK_HEIGHT});
    return this;
  },

  moveLeft: function() {
    if (this.x !== 0) {
      this.x -= BLOCK_WIDTH;
    }
  },

  moveRight: function() {
    if (this.x !== BLOCK_WIDTH * (BOARD_BLOCK_WIDTH - 1)) {
      this.x += BLOCK_WIDTH;
    }
  },

  _onHit: function() {
    this.vy = 0;
    this.y = Math.round(this.y / BLOCK_HEIGHT) * BLOCK_HEIGHT;
    this.trigger('Collision');
  },

});

Crafty.c('Floor', {
  init: function() {
    this.requires('Collision');
    this.attr({w: BOARD_WIDTH, h: 1, x: 0, y: BOARD_HEIGHT});
  }
});

Crafty.c('Board', {
  init: function() {
    this.requires('2D, Canvas, Color, Keyboard');
    this.attr({w: BOARD_WIDTH, h: BOARD_HEIGHT, x: 0, y: 0});
    this.color('green');
    this.bind('KeyDown', this._onKeyDown.bind(this));
    this._spawnNewBlock();
  },

  _spawnNewBlock: function() {
    this.block = Crafty.e('Block').create(3, 0);
    this.block.bind('Collision', this._spawnNewBlock.bind(this));
    this.attach(this.block);
  },

  _onKeyDown: function(e) {
    if (e.key == Crafty.keys.LEFT_ARROW) {
      this.block.moveLeft();
    } else if (e.key == Crafty.keys.RIGHT_ARROW) {
      this.block.moveRight();
    }
  }
});

var board = Crafty.e('Board');
var floor = Crafty.e('Floor');
