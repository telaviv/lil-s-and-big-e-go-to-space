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

Crafty.c('Player', {
  init: function() {
    this.requires('2D, Canvas, Tile');
    this.attr({w: BLOCK_WIDTH, h: BLOCK_HEIGHT, vy: BLOCK_SPEED})
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

  moveRight: function(x, y) {
    if (this.x !== BLOCK_WIDTH * (BOARD_BLOCK_WIDTH - 1)) {
      this.x += BLOCK_WIDTH;
    }
  },

  moveUp: function() {
    if (this.y !== 0) {
      this.y -= BLOCK_HEIGHT;
    }
  },

  moveDown: function() {
    if (this.y !== BLOCK_HEIGHT * (BOARD_BLOCK_HEIGHT - 1)) {
      this.y += BLOCK_HEIGHT;
    }
  },

  _onHit: function() {
    this.vy = 0;
    this.y = Math.round(this.y / BLOCK_HEIGHT) * BLOCK_HEIGHT;
    this.trigger('Collision');
  },

});

Crafty.c('Board', {
  init: function() {
    this.requires('2D, Canvas, Color, Keyboard');
    this.attr({w: BOARD_WIDTH, h: BOARD_HEIGHT, x: 0, y: 0});
    this.color('green');
    this.bind('KeyDown', this._onKeyDown.bind(this));
    this._spawnPlayer();
  },

  _spawnPlayer: function() {
    this.player = Crafty.e('Player').create(9, 6);
    this.attach(this.player);
  },

  _onKeyDown: function(e) {
    if (e.key == Crafty.keys.LEFT_ARROW) {
      this.player.moveLeft();
    } else if (e.key == Crafty.keys.RIGHT_ARROW) {
      this.player.moveRight();
    } else if (e.key == Crafty.keys.UP_ARROW) {
      this.player.moveUp();
    } else if (e.key == Crafty.keys.DOWN_ARROW) {
      this.player.moveDown();
    }
  }
});

var board = Crafty.e('Board');
