ig.module(
  'entities.rampage'
)
.requires(
  'impact.entity'
)
.defines(function() {
  
	EntityRampage = ig.Entity.extend({

		showRampage: false,
		showCrown: true,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.crownTimer = new ig.Timer(0.5);
			this.rampageTimer = new ig.Timer();
		},

		update: function() {

			if (this.showCrown && this.crownTimer.delta() >= 0) {
				this.showCrown = false;
				this.showRampage = true;
				this.rampageTimer = new ig.Timer(0.5);
			}

			if (this.showRampage && this.rampageTimer.delta() >= 0) {
				this.kill();
			}

		},


		draw: function() {
			if (this.showCrown) {
				TreatFighter.Sprites.TripleCrown.draw(
					150, 150
				);
			}
			if (this.showRampage) {
				TreatFighter.Sprites.Rampage.draw(
					150, 150
				);
			}
		}

	})

});