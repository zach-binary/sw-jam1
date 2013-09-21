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
		health: 15,

		maxTurbo: 16,
		turbo: 16,

		comboCounter: 0,
		consectutivePunches: 0,

		candyCount: 0,

		engagedBy: [],

		flip: false,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 0.5, [0, 1]);
			this.addAnim('moving', 0.2, [0, 2]);
			this.addAnim('punching', 0.15, [0, 3, 0, 0]);
			this.addAnim('hurt', 0.3, [4, 0]);
			this.state = this.MoveState;

			this.currentAttack = null;
			this.comboTimer = new ig.Timer(0.5);
		},

		update: function() {
			this.state();			
			this.CleanEngagements();
			this.parent();
		},

		draw: function() {
			this.DrawShadow(3.5, 50);
			this.parent();
		},

		receiveDamage: function(damage, from) {
			this.parent(damage, from);

			this.PushBackFrom(from, damage);

			if (this.currentAttack)
				this.currentAttack.kill();

			this.currentAnim = this.anims.hurt.rewind();
			this.currentAnim.onKeyframe(1, function() {
				this.state = this.MoveState;
			}.bind(this));
			this.state = this.HurtState;
		},

		kill: function() {
			this.parent();
			ig.game.loadLevel(ig.game.firstLevel);
		},

		MoveState: function() {
			this.accel = { x: 0, y: 0 };

			if (ig.input.state('run') && this.turbo > 0) {
				this.maxVel = { x: 300, y: 300 };
				this.turbo -= 0.05;
			}
			else if (this.turbo <= this.maxTurbo) {
				this.maxVel = { x: 200, y: 200 };
				this.turbo += 0.025;
			}
		
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

			if (this.comboTimer.delta() >= 0) 
				this.comboCounter = 0;

			this.AdjustAnims();
		},

		InitiatePunch: function() {
			this.currentAnim = this.anims.punching.rewind();
			this.currentAnim.onKeyframe(3, function() {
				this.consectutivePunches = 0;
				this.state = this.MoveState;
			}.bind(this));

			this.currentAttack = ig.game.spawnEntity(Frankenfist, this.pos.x, this.pos.y, { 
				flip: this.flip,
				anchor: this,
			});

			this.consectutivePunches++;
			TreatFighter.Sounds.ThrowPunch.play();

			this.state = this.AttackState;
		},

		CutsceneState: function() {
			this.StopAccelerating();
		},

		AttackState: function() {
			this.StopAccelerating();
			this.currentAnim.flip.x = this.flip;

			if (ig.input.pressed('punch') && this.currentAttack.guysThatHaveBeenHit.length > 0) {
				this.currentAnim.removeKeyframeListener(2);
				this.currentAttack.kill();
				
				if (this.consectutivePunches > 2)
					return;

				this.comboTimer.reset();

				this.InitiatePunch();
			}

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