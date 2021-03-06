ig.module(
  'entities.hurtBoxes.thugFist'
)
.requires(
  'impact.entity',
  'settings',
  'plugins.impactEvents'
)
.defines(function() {
  
	Thugfist = ig.Entity.extend({

		animSheet: TreatFighter.Sprites.Thugfist,
		size: {x: 8, y: 8},

		checkAgainst: ig.Entity.TYPE.A,

		guysThatHaveBeenHit: [],
		active: false,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 0.2, [1, 0, 1]); // stays active for 0.3 seconds
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
					y: this.anchor.pos.y + 26
				};
			}
			else {
				this.pos = {
					x: this.anchor.pos.x + this.anchor.size.x,
					y: this.anchor.pos.y + 26
				};
			}

			this.parent();
		},

		check: function(other) {
			if (this.guysThatHaveBeenHit.indexOf(other) === -1 && this.active) {
				other.receiveDamage(1, this.anchor);
				this.guysThatHaveBeenHit.push(other);
				TreatFighter.Sounds.Hurt.play();
			}
		}

	});

});