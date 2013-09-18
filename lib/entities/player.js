ig.module(
  'entities.player'
)
.requires(
  'impact.entity',
  'settings',
  'plugins.impactEvents'
)
.defines(function() {
  
	EntityPlayer = ig.Entity.extend({

		animSheet: TreatFighter.Sprites.Frankenstein,
		size: {x: 33, y: 67},

		maxVel: { x: 200, y: 200 },
		friction: { x: 1000, y: 1000 },
		collides: ig.Entity.COLLIDES.PASSIVE,
		name: "Player",

		flip: false,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 0.5, [0, 1]);
			this.addAnim('walking', 0.2, [0, 2]);
			this.addAnim('punching', 0.5, [0, 3, 3]);
			this.state = this.MoveState;
		},

		update: function() {
			this.state();			
			this.parent();
		},

		MoveState: function() {
			this.accel = { x: 0, y: 0 };
		
			if (ig.input.state('left')) 
				this.accel.x -= 600;
			
			if (ig.input.state('right'))
				this.accel.x += 600;
				
			if (ig.input.state('down')) 
				this.accel.y += 600;
				
			if (ig.input.state('up')) 
				this.accel.y -= 600;

			var direction = this.GetDirection();

			if (direction.x === 1)
				this.flip = false;
			else if (direction.x === -1)
				this.flip = true;

			if (direction.x === 0 && direction.y === 0)
				this.currentAnim = this.anims.idle;
			else
				this.currentAnim = this.anims.walking;

			this.currentAnim.flip.x = this.flip;
		},

		CutsceneState: function() {},

		AttackState: function() {
		},

		GetDirection: function() {
			return {
				x: this.accel.x / 600,
				y: this.accel.y / 600
			};
		},

	})

});