ig.module(
  'utility'
)
.requires(
  'impact.entity',
  'entities.dialogues.cutscene'
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
		},

		CutsceneIsActive: function() {
			return ig.game.getEntitiesByType(EntityCutscene).some(function(e) {
				return e.active;
			});
		}

	});

});