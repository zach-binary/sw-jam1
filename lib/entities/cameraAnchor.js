ig.module
(
  'entities.cameraAnchor'
)
.requires
(
  'impact.entity'
)
.defines(function() {

  EntityCameraAnchor = ig.Entity.extend({
    target: {},
    anchor: null,
    maxVel: {x: 1350, y: 1350},
    gravityFactor: 0,
    collides: ig.Entity.COLLIDES.NEVER,
    zindex: 99,
    size: {x: 12, y: 12},
    _wmDrawBox: true,
    _wmBoxColor: 'rgba(255, 255, 0, 0.5)',

    viewportX: 0,
    viewportY: 0,
    viewportWidth: 5000,
    viewportHeight: 5000,

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.anchor = ig.game.getEntityByName(this.target.player);

      ig.assert(this.anchor, 'no target set for camera anchor');
    },

    update: function() {
      if (!this.anchor) return;

      var distance = this.distanceTo(this.anchor);
      var angle = this.angleTo(this.anchor);
      this.vel.x = Math.cos(angle) * Math.pow(distance, 1.5);
      this.vel.y = Math.sin(angle) * Math.pow(distance, 1.5);

      var paddingX = (ig.system.canvas.width / 2);
      var paddingY = (ig.system.canvas.height / 2);

      var max = {
        x: this.viewportX + this.viewportWidth,
        y: this.viewportY + this.viewportHeight
      };
      
      var min = {
        x: this.viewportX,
        y: this.viewportY
      };

      if (this.pos.x < paddingX + min.x) ig.game.screen.x = min.x;
      else if (this.pos.x > max.x - paddingX) ig.game.screen.x = max.x - ig.system.canvas.width;
      else ig.game.screen.x = this.pos.x.round() - ig.system.width/2;

      if (this.pos.y < paddingY + min.y) ig.game.screen.y = min.y;
      else if (this.pos.y > max.y - paddingY) ig.game.screen.y = max.y - ig.system.canvas.height;
      else ig.game.screen.y = this.pos.y.round() - ig.system.height/2;

      this.parent();
    },

    handleMovementTrace: function(res) {
      // This completely ignores the trace result (res) and always
      // moves the entity according to its velocity
      this.pos.x += this.vel.x * ig.system.tick;
      this.pos.y += this.vel.y * ig.system.tick;
    }

  });

});