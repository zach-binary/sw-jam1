ig.module(
  'entities.player'
)
.requires(
  'impact.entity',
  'settings',
  'plugins.impactEvents',

  'entities.hurtBoxes.frankenFist'
)
.defines(function() {
  
	EntityPlayer = ig.Entity.extend({

		animSheet: TreatFighter.Sprites.Frankenstein,
		size: {x: 33, y: 67},

		maxVel: { x: 200, y: 200 },
		friction: { x: 1000, y: 1000 },
		collides: ig.Entity.COLLIDES.PASSIVE,
		type: ig.Entity.TYPE.A,
		name: "Player",

		engagedBy: [],

		flip: false,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 0.5, [0, 1]);
			this.addAnim('walking', 0.2, [0, 2]);
			this.addAnim('punching', 0.3, [3, 0]);
			this.addAnim('hurt', 0.3, [4, 0]);
			this.state = this.MoveState;
		},

		update: function() {
			this.state();			
			this.CleanEngagements();
			this.parent();
		},

		receiveDamage: function(damage, from) {
			this.parent(damage, from);

			var currentState = this.state;

			this.currentAnim = this.anims.hurt.rewind();
			this.currentAnim.onKeyframe(1, function() {
				this.state = currentState;
			}.bind(this));
			this.state = this.HurtState;
		},

		kill: function() {
			this.parent();
			ig.game.loadLevel(ig.game.firstLevel);
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

			if (ig.input.pressed('punch')) {
				this.InitiatePunch();
				return;
			}

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

		InitiatePunch: function() {
			this.currentAnim = this.anims.punching.rewind();
			this.currentAnim.onKeyframe(1, function() {
				this.state = this.MoveState;
			}.bind(this));

			ig.game.spawnEntity(Frankenfist, this.pos.x, this.pos.y, { 
				flip: this.flip,
				anchor: this,
			});

			TreatFighter.Sounds.ThrowPunch.play();

			this.state = this.AttackState;
		},

		CutsceneState: function() {
			this.StopAccelerating();
		},

		AttackState: function() {
			this.StopAccelerating();
			this.currentAnim.flip.x = this.flip;
		},

		HurtState: function() {
			this.StopMoving();
			this.currentAnim.flip.x = this.flip;
		},

		CleanEngagements: function() {
			var i = this.engagedBy.length;
			while(i--) {
				if (!this.engagedBy[i] || this.engagedBy[i].health <= 0)
					this.engagedBy.splice(i, 1);
			}
		},

		GetDirection: function() {
			return {
				x: this.accel.x / 600,
				y: this.accel.y / 600
			};
		},

	});

});