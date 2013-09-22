ig.module(
  'entities.hurtBoxes.frankenFoot'
)
.requires(
  'impact.entity',
  'settings',
  'plugins.impactEvents'
)
.defines(function() {
  
	Frankenfoot = ig.Entity.extend({

		animSheet: TreatFighter.Sprites.Frankenfoot,
		size: {x: 15, y: 10},

		checkAgainst: ig.Entity.TYPE.B,

		guysThatHaveBeenHit: [],
		active: false,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 0.20, [-1, 0, -1]); // stays active for 0.3 seconds
			this.anims.idle.onKeyframe(2, function() {
				this.kill();
			}.bind(this));

			this.anims.idle.onKeyframe(1, function() {
				this.active = true;
			}.bind(this));

			this.anims.idle.flip.x = settings.flip;

			ig.assert(this.anchor, 'feet need a body');
		},

		update: function() {
			if (this.flip) {
				this.pos = {
					x: this.anchor.pos.x - this.size.x,
					y: this.anchor.pos.y + 38
				};
			}
			else {
				this.pos = {
					x: this.anchor.pos.x + this.anchor.size.x,
					y: this.anchor.pos.y + 38
				};
			}

			this.parent();
		},

		check: function(other) {
			if (this.active && this.guysThatHaveBeenHit.indexOf(other) === -1) {

				if (this.anchor.rampageTimer.delta() < 0) {
					other.receiveDamage(30, this.anchor);
				}
				else {
					other.receiveDamage(9, this.anchor);	
				}
				this.guysThatHaveBeenHit.push(other);
				this.anchor.comboCounter++;
				TreatFighter.Sounds.Hurt.play();
			}
		}

	});

});