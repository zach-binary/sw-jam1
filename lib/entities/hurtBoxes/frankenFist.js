ig.module(
  'entities.hurtBoxes.frankenFist'
)
.requires(
  'impact.entity',
  'settings',
  'plugins.impactEvents'
)
.defines(function() {
  
	Frankenfist = ig.Entity.extend({

		animSheet: TreatFighter.Sprites.Frankenfist,
		size: {x: 8, y: 8},

		checkAgainst: ig.Entity.TYPE.B,

		guysThatHaveBeenHit: [],
		active: false,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 0.15, [-1, 0, -1]); // stays active for 0.3 seconds
			this.anims.idle.onKeyframe(2, function() {
				this.kill();
			}.bind(this));

			this.anims.idle.onKeyframe(1, function() {
				this.active = true;
			}.bind(this));

			this.anims.idle.flip.x = settings.flip;

			ig.assert(this.anchor, 'fists need a body');
		},

		update: function() {
			if (this.flip) {
				this.pos = {
					x: this.anchor.pos.x - this.size.x,
					y: this.anchor.pos.y + 22
				};
			}
			else {
				this.pos = {
					x: this.anchor.pos.x + this.anchor.size.x,
					y: this.anchor.pos.y + 22
				};
			}

			this.parent();
		},

		check: function(other) {
			if (this.active && this.guysThatHaveBeenHit.indexOf(other) === -1) {
				other.receiveDamage(3, this.anchor);
				this.guysThatHaveBeenHit.push(other);
				this.anchor.comboCounter++;
				TreatFighter.Sounds.Hurt.play();
			}
		}

	});

});