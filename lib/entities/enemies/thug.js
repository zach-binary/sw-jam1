ig.module(
  'entities.enemies.thug'
)
.requires(
  'impact.entity',
  'settings',
  'entities.hurtBoxes.thugFist',
  'entities.items.candy'
)
.defines(function() {
  
	EntityThug = ig.Entity.extend({

		animSheet: TreatFighter.Sprites.Thug1,
		size: {x: 33, y: 67},
		
		type: ig.Entity.TYPE.B,
		health: 20,
		friction: { x: 1000, y: 1000 },

		flip: true,

		rulesOfEngagement: {
			maxNumAttackers: (Math.random() * 2).round() + 1
		},

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 0.5, [0, 1]);
			this.addAnim('moving', 0.2, [0, 2]);
			this.addAnim('punching', 0.2, [0, 4, 0, 0, 0]);
			this.addAnim('hurt', 0.5, [3, 0]);

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

		draw: function() {
			this.DrawShadow(3.5, 55);
			this.parent();
		},

		kill: function() {
			this.parent();

			var player = ig.game.getEntityByName('Player');
			player.killCount++;

			if (Math.random() > 0.50) {
				ig.game.spawnEntity(EntityCandy, this.pos.x + 3, this.pos.y + 50);
			}
		},

		receiveDamage: function(damage, from) {
			this.parent(damage, from);

			this.PushBackFrom(from, damage);

			if (this.currentAttack)
				this.currentAttack.kill();

			this.currentAnim = this.anims.hurt.rewind();
			this.currentAnim.onKeyframe(1, function() {
				this.state = this.EngagedState;
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
			this.currentAnim.onKeyframe(4, function() {
				this.state = prevState;
			}.bind(this));

			this.currentAttack = ig.game.spawnEntity(Thugfist, this.pos.x, this.pos.y, { 
				flip: this.flip,
				anchor: this,
			});

			TreatFighter.Sounds.ThrowPunch.play();

			this.state = this.AttackState;
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