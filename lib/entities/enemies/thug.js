ig.module(
  'entities.enemies.thug'
)
.requires(
  'impact.entity',
  'settings'
)
.defines(function() {
  
	EntityThug = ig.Entity.extend({

		animSheet: TreatFighter.Sprites.Thug1,
		size: {x: 33, y: 67},
		
		type: ig.Entity.TYPE.B,
		health: 20,

		flip: true,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 0.5, [0, 1]);
			this.addAnim('hurt', 0.3, [3, 0]);

			this.state = this.MoveState;
		},

		update: function() {
			this.state();
			this.parent();
		},

		receiveDamage: function(damage) {
			this.parent(damage);

			this.currentAnim = this.anims.hurt.rewind();
			this.currentAnim.onKeyframe(1, function() {
				this.state = this.MoveState;
			}.bind(this));
			this.state = this.HurtState;
		},

		MoveState: function() {
			this.currentAnim = this.anims.idle;

			// consider flipping all animations here so when animations change they are less jittery
			this.currentAnim.flip.x = this.flip;
		},

		HurtState: function() {
			this.StopMoving();
			this.currentAnim.flip.x = this.flip;
		}

	});

});