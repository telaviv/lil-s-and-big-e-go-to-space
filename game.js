"use strict";

var BLOCK_WIDTH = 25;
var BLOCK_HEIGHT = BLOCK_WIDTH;
var BOARD_BLOCK_WIDTH = 22;
var BOARD_BLOCK_HEIGHT = 12;
var BOARD_WIDTH = BLOCK_WIDTH * BOARD_BLOCK_WIDTH;
var BOARD_HEIGHT = BLOCK_HEIGHT * BOARD_BLOCK_HEIGHT;
var BLOCK_SPEED = BLOCK_HEIGHT // pixels per second


Crafty.init(BOARD_WIDTH, BOARD_HEIGHT, document.getElementById('game'));
Crafty.sprite("tiles.png", {
    PlayerSprite: [5 * BLOCK_WIDTH, 0, BLOCK_WIDTH, BLOCK_HEIGHT],
    PlantSprite: [0, 0, BLOCK_WIDTH, BLOCK_HEIGHT],
});

Crafty.c('KeyboardMovement', {
  init: function() {
    this.requires('Keyboard');
    this.bind('KeyDown', this._onKeyDown.bind(this));
  },

  _onKeyDown: function(e) {
    if (e.key == Crafty.keys.LEFT_ARROW) {
      this.moveLeft();
    } else if (e.key == Crafty.keys.RIGHT_ARROW) {
      this.moveRight();
    } else if (e.key == Crafty.keys.UP_ARROW) {
      this.moveUp();
    } else if (e.key == Crafty.keys.DOWN_ARROW) {
      this.moveDown();
    }
  },

  moveLeft: function() {
    if (this.x !== this.bb.x) {
      this.x -= this.w;
    }
  },

  moveRight: function(x, y) {
    if (this.x !== this.bb.w + this.bb.x - this.w) {
      this.x += this.w;
    }
  },

  moveUp: function() {
    if (this.y !== this.bb.y) {
      this.y -= this.h;
    }
  },

  moveDown: function() {
    if (this.y !== this.bb.h + this.bb.y - this.h) {
      this.y += this.h;
    }
  },
});

Crafty.c('Tile', {
  init: function() {
    this.requires('2D, Canvas');
    this.attr({w: BLOCK_WIDTH, h: BLOCK_HEIGHT, vy: BLOCK_SPEED})
  },

  create: function(x, y) {
    this.attr({x: x * BLOCK_WIDTH, y: y * BLOCK_HEIGHT});
    return this;
  },
});

Crafty.c('Player', {
  init: function() {
    this.requires('Tile, KeyboardMovement, PlayerSprite');
    this.z = 1;
  },

  _onHit: function() {
    this.vy = 0;
    this.y = Math.round(this.y / BLOCK_HEIGHT) * BLOCK_HEIGHT;
    this.trigger('Collision');
  },

});

Crafty.c('Plant', {
  init: function() {
    this.requires('Tile, PlantSprite');
  },
});

Crafty.c('Water', {
  init: function() {
    this.requires('Tile, Color');
    this.color('blue');
  },
})


Crafty.c('Nursery', {
  init: function() {
    this.requires('2D, Canvas, Color, Keyboard');
    this.attr({
      w: BLOCK_WIDTH * 20 ,
      h: BLOCK_HEIGHT * 10,
      x: BLOCK_WIDTH,
      y: BLOCK_HEIGHT
    });
    this.color('green');
    this._spawnPlayer();
    this._spawnPlant();
    this._spawnWater();
  },

  _spawnPlayer: function() {
    this.player = Crafty.e('Player').create(9, 6);
    this.player.shift(this.x, this.y);
    this.player.bb = this;
    this.attach(this.player);
  },

  _spawnPlant: function() {
    var plant = Crafty.e('Plant').create(8, 6);
    plant.shift(this.x, this.y);
    this.attach(plant);
  },

  _spawnWater: function() {
    var water = Crafty.e('Water').create(0, 0);
    water.shift(this.x, this.y);
  },

});

Crafty.c('Game', {
  init: function() {
    this.requires('2D, Canvas, Color');
    this.attr({x: 0, y: 0, w: BOARD_WIDTH, h: BOARD_HEIGHT});
    this.color('black');
    this.board = Crafty.e('Nursery');
    this.attach(this.board);
  }
});

Crafty.e('Game');
