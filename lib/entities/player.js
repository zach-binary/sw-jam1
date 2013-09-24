ig.module(
  'entities.player'
)
.requires(
  'impact.entity',
  'settings',
  'plugins.impactEvents',

  'entities.hurtBoxes.frankenFist',
  'entities.hurtBoxes.frankenFoot',
  'entities.highScores'
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
		crownCount: 0,
		killCount: 0,
		redemptionCount: 0,
		modifier: 0,

		engagedBy: [],

		score: 0,

		flip: false,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 0.5, [0, 1]);
			this.addAnim('moving', 0.2, [0, 2]);
			this.addAnim('punching', 0.15, [0, 3, 0, 0]);
			this.addAnim('kicking', 0.20, [0, 5, 0, 0]);
			this.addAnim('hurt', 0.3, [4, 0]);
			this.state = this.MoveState;

			this.currentAttack = null;
			this.comboTimer = new ig.Timer(2.0);
			this.rampageTimer = new ig.Timer();
		},

		update: function() {
			this.state();			
			this.CleanEngagements();
			this.parent();
		},

		draw: function() {
			this.DrawShadow(3.5, 50);

			if (this.rampageTimer.delta() < 0) {
				TreatFighter.Sprites.Poweredup.drawTile(
					this.pos.x - this.offset.x - ig.game._rscreen.x - 1,
					this.pos.y - this.offset.y - ig.game._rscreen.y - 1,
					0, 33, 62, this.flip, false
				);
			}

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

			this.CalculateScore();
			ig.game.spawnEntity(EntityHighScores, 0, 0, { newScore: this.score });
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

			if (this.rampageTimer.delta() < 0) {
				this.maxVel = { x: 300, y: 300 };
				this.turbo = this.maxTurbo;
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

			if (ig.input.pressed('kick')) {
				this.InitiateKick();
				return;
			}

			if (this.comboTimer.delta() >= 0) {
				this.CalculateScore();
			}

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

		InitiateKick: function() {
			this.currentAnim = this.anims.kicking.rewind();
			this.currentAnim.onKeyframe(3, function() {
				this.consectutivePunches = 0;
				this.state = this.MoveState;
			}.bind(this));

			this.currentAttack = ig.game.spawnEntity(Frankenfoot, this.pos.x, this.pos.y, { 
				flip: this.flip,
				anchor: this,
			});

			this.consectutivePunches += 3; // lame way to keep him from comboing after kicks
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

			if (ig.input.pressed('kick') && this.currentAttack.guysThatHaveBeenHit.length > 0) {
				this.currentAnim.removeKeyframeListener(2);
				this.currentAttack.kill();
				
				if (this.consectutivePunches > 2)
					return;

				this.comboTimer.reset();

				this.InitiateKick();
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

		CalculateScore: function() {
			var score = this.GetBaseScore();

			score *= this.GetModifier();

			this.score += score;
			this.comboCounter = 0;
			this.redemptionCount = 0;
			this.killCount = 0;

		},

		GetBaseScore: function() {
			return this.comboCounter * 100 + this.killCount * 500 + this.redemptionCount * 1000;
		},

		GetModifier: function() {
			var modifier = 1;

			for (var i = 1; i < this.redemptionCount; i++) {
				if (i % 3 === 0)
					modifier *= 3;
				else
					modifier++;
			}

			return modifier;
		}

	});

});