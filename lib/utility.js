ig.module(
  'utility'
)
.requires(
  'impact.entity'
)
.defines(function() {
  
	ig.Entity.inject({

		MoveToEntity: function(speed, entity) {
			var angle = this.angleTo(entity);

			this.vel.x = Math.cos(angle) * speed;
			this.vel.y = Math.sin(angle) * speed;
		},

		StopAccelerating: function() {
			this.accel = {
				x: 0, y: 0
			};
		},
		
		StopMoving: function() {
			this.vel = {
				x: 0, y: 0
			};
		}

	});

});