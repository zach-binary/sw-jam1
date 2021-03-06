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
			maxNumAttackers: 1,
			side: 0
		},

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 0.5, [0, 1]);
			this.addAnim('moving', 0.2, [0, 2]);
			this.addAnim('punching', 0.2, [0, 4, 0, 0, 0]);
			this.addAnim('hurt', 0.5, [3, 0]);

			this.state = this.MoveState;
		},

		ready: function() {
			this.rulesOfEngagement.maxNumAttackers = (Math.random() * 2).round() + 1;
			this.rulesOfEngagement.side = (Math.random() * 3).round();
			console.log(this.rulesOfEngagement);
			var player = ig.game.getEntityByName('Player');
			if (!player)
				return;

			this.side = ig.game.getEntitiesByType(EntityTarget)[this.rulesOfEngagement.side];
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

			this.PushBackFrom(from, damage * 4);

			if (this.currentAttack)
				this.currentAttack.kill();

			this.currentAnim = this.anims.hurt.rewind();
			this.currentAnim.onKeyframe(1, function() {
				this.state = this.EngagedState;
			}.bind(this));
			this.state = this.HurtState;
		},

		handleMovementTrace: function(res) {
			this.pos.x += this.vel.x * ig.system.tick;
      this.pos.y += this.vel.y * ig.system.tick;
		},

		MoveState: function() {
			var player = ig.game.getEntityByName('Player');

			if (player) {
				this.EngagePlayer(player);
			}
			else {
				this.StopMoving();
			}

			this.AdjustAnims();
		},

		EngagedState: function() {
			var player = ig.game.getEntityByName('Player');

			if (!player) {
				this.state = this.MoveState;
				return;
			}
				
			if (this.distanceTo(this.side) < 2)
				this.state = this.InPositionState;
			else
				this.MoveToEntity(150, this.side);

			this.AdjustAnims();
		},

		InPositionState: function() {
			var player = ig.game.getEntityByName('Player');

			if (!player) {
				this.state = this.MoveState;
				return;
			}

			if (this.distanceTo(player) < 40) {
				this.InitiatePunch();
				return;
			}

			if (this.distanceTo(this.side) > 10)
				this.state = this.EngagedState;

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

			if (this.distanceTo(this.side) > 300) {
				this.MoveToEntity(100, this.side);
			}
			else {
				this.StopMoving();
			}
		},

		AdjustAnims: function() {
			var player = ig.game.getEntityByName('Player');

			if (!player) {
				player = { pos: { x: 0 }};
			}

			if (this.pos.x - player.pos.x > 0)
				this.flip = true;
			else
				this.flip = false;

			if (Math.abs(this.vel.x) > 0 || Math.abs(this.vel.y))
				this.currentAnim = this.anims.moving;
			else
				this.currentAnim = this.anims.idle;

			// consider flipping all animations here so when animations change they are less jittery
			this.currentAnim.flip.x = this.flip;
		}

	});

});