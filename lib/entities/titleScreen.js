ig.module(
  'entities.titleScreen'
)
.requires(
  'impact.entity'
)
.defines(function() {
  
	EntityTitleScreen = ig.Entity.extend({

		imgSrc: "media/treatFighter_title.png",
		showText: true,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.imgSrc = new ig.Image(this.imgSrc);
			this.font = new ig.Font("media/fonts/lilyupc1.png");
			this.textTimer = new ig.Timer(0.5);
			this.sound = new ig.Sound('media/sounds/start.ogg');
		},

		update: function() {
			if (this.textTimer.delta() >= 0) {
				this.showText = !this.showText;
				this.textTimer.reset();
			}

			if (ig.input.pressed('enter')) {
				this.sound.play();
				ig.game.loadLevel(LevelActOne);
			}
		},

		draw: function() {
			this.imgSrc.draw(0, 0);

			if (this.showText)
				this.font.draw("Press ENTER to start", 220, 350);			
		}
	});

});