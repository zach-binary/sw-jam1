ig.module(
  'entities.highScores'
)
.requires(
  'impact.entity'
)
.defines(function() {
  
	EntityHighScores = ig.Entity.extend({

		scores: [],
		showText: true,
		index: -1,

		zIndex: 100,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.font = new ig.Font('media/fonts/lilyupc1.png', { borderColor: '#000', borderSize: 2 });
			this.newScoreTimer = new ig.Timer(0.5);

			var highScores = [];

			if (typeof(Storage) != "undefined") {
				if (localStorage.highScores != null)
					highScores = JSON.parse(localStorage.highScores);
			}
			else {
				localStorage = {};
			}

			highScores.push(settings.newScore);
			highScores.sort(function(a, b) { return a < b; });

			this.scores = highScores.slice(0, 5);
			localStorage.highScores = JSON.stringify(this.scores);
			this.index = highScores.indexOf(this.newScore);

			ig.game.sortBy = ig.Game.SORT.Z_INDEX;
		},

		update: function() {
			if (ig.input.pressed('enter')) {
				ig.game.loadLevel(LevelTitle);
			}

			if (this.newScoreTimer.delta() >= 0) {
				this.showText = !this.showText;
				this.newScoreTimer.reset();
			}
		},

		draw: function() {
			ig.system.context.save();

			ig.system.context.globalAlpha = 0.6;
			ig.system.context.fillRect(160, 120, 300, 170);

			ig.system.context.globalAlpha = 1.0;

			this.font.draw("High Scores", 230, 128);

			var length = this.scores.length;
			for (var i = 0; i < length; i++) {
				if (i == this.index && this.showText) { 
					this.font.draw(i + 1 + " ", 200, 158 + i * 16);
					this.font.draw(this.pad(this.scores[i], 8), 230, 158 + i * 16);
				}
				else if (i != this.index) {
					this.font.draw(i + 1 + " ", 200, 158 + i * 16);
					this.font.draw(this.pad(this.scores[i], 8), 230, 158 + i * 16);
				}
			}

			this.font.draw('Press ENTER', 230, 250);

			ig.system.context.restore();
		},

		pad: function (n, width, z) {
		  z = z || '0';
		  n = n + '';
		  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
		}


	})

});