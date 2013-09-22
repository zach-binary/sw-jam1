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

		ready: function() {
			this.player = ig.game.getEntityByName('Player');
		},

		draw: function() {
			// lame check to see if we're actually in a game
			if (ig.game.getEntitiesByType) {
				TreatFighter.Sprites.Frankface.draw(
					this.pos.x,
					this.pos.y
				);

				var i;
				for (i = this.player.health; i > 0; i--) {
					TreatFighter.Sprites.HealthDot.draw(
						this.pos.x + 30 + (8 * i),
						this.pos.y + 5
					);
				}
				for (i = this.player.turbo.round() - 1; i > 0; i--) {
					TreatFighter.Sprites.TurboDot.draw(
						this.pos.x + 30 + (8 * i),
						this.pos.y + 15
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