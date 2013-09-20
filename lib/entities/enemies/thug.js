ig.module(
  'entities.enemies.thug'
)
.requires(
  'impact.entity',
  'settings',
  'entities.hurtBoxes.thugFist'
)
.defines(function() {
  
	EntityThug = ig.Entity.extend({

		animSheet: TreatFighter.Sprites.Thug1,
		size: {x: 33, y: 67},
		
		type: ig.Entity.TYPE.B,
		health: 20,

		flip: true,

		rulesOfEngagement: {
			maxNumAttackers: (Math.random() * 2).round() + 1
		},

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 0.5, [0, 1]);
			this.addAnim('moving', 0.2, [0, 2]);
			this.addAnim('punching', 0.4, [4, 0]);
			this.addAnim('hurt', 0.3, [3, 0]);

			this.state = this.MoveState;
		},

		update: function() {
			if (this.CutsceneIsActive()) {
				this.AdjustAnims();
				return;
			}
			this.state();
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

		MoveState: function() {
			var player = ig.game.getEntityByName('Player');

			if (player) {
				this.EngagePlayer(player);
			}

			this.AdjustAnims();
		},

		EngagedState: function() {
			var player = ig.game.getEntityByName('Player');

			if (!player)
				return;

			if (this.distanceTo(player) > 40) {
				this.MoveToEntity(150, player);
			}
			else {
				this.InitiatePunch();
				return;
			}

			this.AdjustAnims();
		},

		HurtState: function() {
			this.StopMoving();
			this.currentAnim.flip.x = this.flip;
		},

		AttackState: function() {
			this.StopMoving();
			this.currentAnim.flip.x = this.flip;
		},

		InitiatePunch: function() {
			var prevState = this.state;

			this.currentAnim = this.anims.punching.rewind();
			this.currentAnim.onKeyframe(1, function() {
				this.state = prevState;
			}.bind(this));

			ig.game.spawnEntity(Thugfist, this.pos.x, this.pos.y, { 
				flip: this.flip,
				anchor: this,
			});

			TreatFighter.Sounds.ThrowPunch.play();

			this.state = this.AttackState;
		},

		AdjustAnims: function() {
			if (this.vel.x < 0)
				this.flip = true;
			else if (this.vel.x > 0)
				this.flip = false;

			if (Math.abs(this.vel.x) > 0 || Math.abs(this.vel.y))
				this.currentAnim = this.anims.moving;
			else
				this.currentAnim = this.anims.idle;

			// consider flipping all animations here so when animations change they are less jittery
			this.currentAnim.flip.x = this.flip;
		},

		EngagePlayer: function(player) {
			if (player.engagedBy.length < this.rulesOfEngagement.maxNumAttackers) {
				this.state = this.EngagedState;
				player.engagedBy.push(this);
				return;
			}

			if (this.distanceTo(player) > 300) {
				this.MoveToEntity(100, player);
			}
			else {
				this.StopMoving();
			}
		}

	});

});