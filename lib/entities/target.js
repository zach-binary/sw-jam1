ig.module(
  'entities.target'
)
.requires(
  'impact.entity'
)
.defines(function() {
  
	EntityTarget = ig.Entity.extend({

		_wmDrawBox: true,
		_wmBoxColor: 'rgba(40, 150, 40, 0.5)',

		ready: function() {
			var target = ig.game.getEntityByName(this.target.target);

			ig.assert(target, 'targets need a target');

			this.rel = {
				x: this.pos.x - target.pos.x,
				y: this.pos.y - target.pos.y
			};

			this.target = target;
		},

		update: function() {
			this.pos = {
				x: this.target.pos.x + this.rel.x,
				y: this.target.pos.y + this.rel.y
			};
		}

	})

});