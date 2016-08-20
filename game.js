"use strict";

var BLOCK_WIDTH = 25;
var BLOCK_HEIGHT = BLOCK_WIDTH;
var BOARD_BLOCK_WIDTH = 20;
var BOARD_BLOCK_HEIGHT = 10;
var BOARD_WIDTH = BLOCK_WIDTH * BOARD_BLOCK_WIDTH;
var BOARD_HEIGHT = BLOCK_HEIGHT * BOARD_BLOCK_HEIGHT;
var BLOCK_SPEED = 40 // pixels per second


Crafty.init(BOARD_WIDTH, BOARD_HEIGHT, document.getElementById('game'));
Crafty.sprite("tiles.png", {Tile: [3 * BLOCK_WIDTH, 0, BLOCK_WIDTH, BLOCK_HEIGHT]});

Crafty.c('Block', {
  init: function() {
    this.requires('2D, Canvas, Motion, Collision, Tile');
    this.attr({w: BLOCK_WIDTH, h: BLOCK_HEIGHT, vy: BLOCK_SPEED})
    this.onHit('Floor', this._onHit.bind(this));
  },

  create: function(x, y) {
    this.attr({x: x * BLOCK_WIDTH, y: y * BLOCK_HEIGHT});
    return this;
  },

  _onHit: function() {
    this.vy = 0;
    this.y = Math.round(this.y / BLOCK_HEIGHT) * BLOCK_HEIGHT;
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
    this.requires('2D, Canvas, Color, Collision');
    this.attr({w: BOARD_WIDTH, h: BOARD_HEIGHT, x: 0, y: 0});
    this.color('green');
    this.block = Crafty.e('Block').create(3, 0);
    this.attach(this.block);
  },
});

var board = Crafty.e('Board');
var floor = Crafty.e('Floor');
