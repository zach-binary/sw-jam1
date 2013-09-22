ig.module(
  'entities.factories.horseFactory'
)
.requires(
  'impact.entity',
  'entities.horsemen'
)
.defines(function() {
  
	EntityHorseFactory = ig.Entity.extend({

		_wmDrawBox: true,
		_wmBoxColor: 'rbga(250, 50, 50, 0.5)',

		direction: 1, // going to the right

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.spawnTimer = new ig.Timer(this.RandomNumber());
		},

		update: function() {
			if (this.spawnTimer.delta() >= 0) {

				ig.game.spawnEntity(EntityHorsemen, this.pos.x, this.pos.y, 
				{
					direction: this.direction
				});

				this.spawnTimer.set(this.RandomNumber());

			}
		},

		RandomNumber: function() {
			return Math.random() * 2;
		}

	})

});