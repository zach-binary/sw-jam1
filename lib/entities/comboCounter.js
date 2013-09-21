ig.module(
  'entities.comboCounter'
)
.requires(
  'impact.entity'
)
.defines(function() {
  
	EntityComboCounter = ig.Entity.extend({

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.font = new ig.Font('media/fonts/lilyupc1.png', { borderColor: '#000', borderSize: 2 });
		},

		draw: function() {
			if (this.IsEditorMode()) {
				this.font.draw(
					"01", 
					this.pos.x - this.offset.x - ig.game._rscreen.x,
					this.pos.y - this.offset.y - ig.game._rscreen.y
				);
			}
			else {
				var player = ig.game.getEntityByName('Player');

				if (player.comboCounter <= 1)
					return;

				this.font.draw(
					this.pad(player.comboCounter, 2) + " hits",
					this.pos.x,
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