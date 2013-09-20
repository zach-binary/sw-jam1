ig.module(
  'entities.health'
)
.requires(
  'impact.entity',
  'settings'
)
.defines(function() {
  
	EntityHealth = ig.Entity.extend({

		font: new ig.Font('media/fonts/lilyupc1.png'),

		init: function(x, y, settings) {
			this.parent(x, y, settings);
		},

		draw: function() {
			// lame check to see if we're actually in a game
			if (ig.game.getEntitiesByType) {
				TreatFighter.Sprites.Frankface.draw(
					this.pos.x,
					this.pos.y
				);

				var player = ig.game.getEntityByName('Player');
				var i = player.health;
				while(i--) {
					TreatFighter.Sprites.HealthDot.draw(
						this.pos.x + 30 + (8 * i),
						this.pos.y + 8
					);
				}
			}
			else {
				this.font.draw(
					"health:",
					this.pos.x - this.offset.x - ig.game._rscreen.x,
					this.pos.y - this.offset.y - ig.game._rscreen.y
				);
			}
		}

	})

});