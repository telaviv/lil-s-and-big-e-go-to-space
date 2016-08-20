"use strict";

var BLOCK_WIDTH = 25;
var BLOCK_HEIGHT = 25;
var BOARD_BLOCK_WIDTH = 20;
var BOARD_BLOCK_HEIGHT = 10;
var BOARD_WIDTH = BLOCK_WIDTH * BOARD_BLOCK_WIDTH;
var BOARD_HEIGHT = BLOCK_HEIGHT * BOARD_BLOCK_HEIGHT;
var BLOCK_SPEED = 40 // pixels per second


Crafty.init(BOARD_WIDTH, BOARD_HEIGHT, document.getElementById('game'));
Crafty.sprite("tiles.png", {RedTile: [3 * BLOCK_WIDTH, 0, BLOCK_WIDTH, BLOCK_HEIGHT]});

Crafty.c('Block', {
  init: function() {
    this.requires('2D, Canvas, Motion, RedTile');
    this.attr({w: BLOCK_WIDTH, h: BLOCK_HEIGHT, vy: BLOCK_SPEED})
  },

  create: function(x, y) {
    this.attr({x: x * BLOCK_WIDTH, y: y * BLOCK_HEIGHT});
    return this;
  },
});

Crafty.c('Board', {
  init: function() {
    this.requires('2D, Canvas, Color');
    this.attr({w: BOARD_WIDTH, h: BOARD_HEIGHT, x: 0, y: 0});
    this.color('green');
    this.block = Crafty.e('Block').create(3, 0);
    this.attach(this.block);
    this.bind('KeyDown', this.handleKeyPress);
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
