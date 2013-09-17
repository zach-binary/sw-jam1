ig.module(
  'entities.player'
)
.requires(
  'impact.entity',
  'settings'
)
.defines(function() {
  
	EntityPlayer = ig.Entity.extend({

		animSheet: TreatFighter.Sprites.Frankenstein,

		maxVel: { x: 200, y: 200 },
		friction: { x: 1000, y: 1000 },
		collides: ig.Entity.COLLIDES.PASSIVE,
		name: "Player",

		flip: false,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 0.5, [0, 1]);
			this.addAnim('walking', 0.5, [0, 2]);
		},

		update: function() {
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
			
			this.parent();
		},

		GetDirection: function() {
			return {
				x: this.accel.x / 600,
				y: this.accel.y / 600
			};
		},

	})

});