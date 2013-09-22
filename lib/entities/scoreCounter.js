ig.module(
  'entities.scoreCounter'
)
.requires(
  'impact.entity'
)
.defines(function() {
  
	EntityScoreCounter = ig.Entity.extend({

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.font = new ig.Font('media/fonts/lilyupc1.png', { borderColor: '#000', borderSize: 2 });
			this.sweetFont = new ig.Font('media/fonts/lilyupc1.png', { borderColor: '#000', fontColor: '#DD7', borderSize: 2 });
		},

		draw: function() {
			if (this.IsEditorMode()) {
				this.font.draw(
					"123456", 
					this.pos.x - this.offset.x - ig.game._rscreen.x,
					this.pos.y - this.offset.y - ig.game._rscreen.y
				);
			}
			else {
				var player = ig.game.getEntityByName('Player');

				this.font.draw(
					this.pad(player.score, 6),
					this.pos.x,
					this.pos.y
				);

				var string = player.GetBaseScore() + "x" + player.GetModifier();

				this.font.draw(
					string,
					this.pos.x,
					this.pos.y + 22
				);

				if (player.redemptionCount >= 3) {
					string = "Triple Treat!";

					if (player.redemptionCount / 3 > 1)
						string += "x" + (player.redemptionCount / 3).round();

					this.sweetFont.draw(
						string,
						this.pos.x,
						this.pos.y + 44
					);
				}
			}
		},

		pad: function (n, width, z) {
		  z = z || '0';
		  n = n + '';
		  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
		}

	})

});