ig.module(
  'entities.enemies.thug'
)
.requires(
  'impact.entity',
  'settings'
)
.defines(function() {
  
	EntityThug = ig.Entity.extend({

		animSheet: TreatFighter.Sprites.Thug1,
		size: {x: 33, y: 67},
		

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('idle', 0.5, [0, 1]);
			this.currentAnim.flip.x = true;
		},

		update: function() {
			this.parent();
		}

	})

});