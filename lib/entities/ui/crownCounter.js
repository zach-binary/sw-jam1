ig.module(
  'entities.ui.crownCounter'
)
.requires(
  'impact.entity'
)
.defines(function() {
  
	EntityCrownCounter = ig.Entity.extend({

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			this.font = new ig.Font('media/fonts/lilyupc1.png', { borderColor: '#000', borderSize: 2 });
		},

		ready: function() {
			this.player = ig.game.getEntityByName('Player');
			ig.assert(this.player, "Crown counter requires an entity named 'Player'");
		},

		draw: function() {
			if (this.IsEditorMode()) {
				TreatFighter.Sprites.Candy.draw(
					this.pos.x - this.offset.x - ig.game._rscreen.x,
					this.pos.y - this.offset.y - ig.game._rscreen.y
				);
				this.font.draw(
					"x11",
					this.pos.x - this.offset.x - ig.game._rscreen.x + 25,
					this.pos.y - this.offset.y - ig.game._rscreen.y
				);
			}
			else {
				TreatFighter.Sprites.Crown.draw(
					this.pos.x,
					this.pos.y
				);
				this.font.draw(
					"x" + this.pad(this.player.crownCount, 1),
					this.pos.x + 25,
					this.pos.y
				);
			}
		},

		pad: function (n, width, z) {
		  z = z || '0';
		  n = n + '';
		  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
		}

	})

});