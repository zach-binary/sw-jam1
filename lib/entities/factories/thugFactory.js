ig.module(
  'entities.factories.thugFactory'
)
.requires(
  'impact.entity',
  'entities.enemies.thug',
  'entities.cameraAnchor'
)
.defines(function() {
  
	EntityThugFactory = ig.Entity.extend({

		_wmDrawBox: true,
		_wmBoxColor: 'rbga(250, 50, 50, 0.5)',

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.spawnTimer = new ig.Timer(this.RandomNumber());
		},

		update: function() {
			if (this.spawnTimer.delta() >= 0) {

				this.spawnTimer.set(this.RandomNumber());

				if (this.pos.x > ig.game._rscreen.x && this.pos.x < ig.game._rscreen.x + ig.system.canvas.width)
					return;

				var thugs = ig.game.getEntitiesByType(EntityThug);

				if (thugs.length > 5)
					return;



				ig.game.spawnEntity(EntityThug, this.pos.x, this.pos.y).ready();


			}
		},

		RandomNumber: function() {
			return 10 + Math.random() * 3;
		}

	})

});