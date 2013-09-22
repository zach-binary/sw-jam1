ig.module(
  'entities.items.crown'
)
.requires(
  'impact.entity',
  'entities.rampage'
)
.defines(function() {
  
	EntityCrown = ig.Entity.extend({

		checkAgainst: ig.Entity.TYPE.A,

		init: function(x, y, settings) {
			this.parent(x, y, settings);
		},

		draw: function() {
			TreatFighter.Sprites.Crown.draw(
				this.pos.x - this.offset.x - ig.game._rscreen.x,
				this.pos.y - this.offset.y - ig.game._rscreen.y
			);
		},

		check: function(other) {
			var isPlayer = other instanceof EntityPlayer;

			if (!isPlayer)
				return;

			TreatFighter.Sounds.Pickup.play();

			if (++other.crownCount >= 3) {
				other.crownCount = 0;
				other.rampageTimer.set(10.0);

				ig.game.spawnEntity(EntityRampage);
			}
			this.kill();
		}

	});

});