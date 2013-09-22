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

		ready: function() {
			this.player = ig.game.getEntityByName('Player');
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
				this.font.draw(
					this.pad(this.player.score, 6),
					this.pos.x,
					this.pos.y
				);

				var string = this.player.GetBaseScore() + "x" + this.player.GetModifier();

				this.font.draw(
					string,
					this.pos.x,
					this.pos.y + 22
				);

				if (this.player.redemptionCount >= 3) {
					string = "Triple Treat!";

					if ((this.player.redemptionCount / 3).round() > 1)
						string += "x" + (this.player.redemptionCount / 3).round();

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