ig.module(
  'entities.items.candy'
)
.requires(
  'impact.entity'
)
.defines(function() {
  
	EntityCandy = ig.Entity.extend({

		checkAgainst: ig.Entity.TYPE.A,

		init: function(x, y, settings) {
			this.parent(x, y, settings);
		},

		draw: function() {
			TreatFighter.Sprites.Candy.draw(
				this.pos.x - this.offset.x - ig.game._rscreen.x,
				this.pos.y - this.offset.y - ig.game._rscreen.y
			);
		},

		check: function(other) {
			var isPlayer = other instanceof EntityPlayer;

			if (!isPlayer)
				return;

			other.candyCount++;
			this.kill();
		}

	});

});