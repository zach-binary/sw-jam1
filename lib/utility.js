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

			this.accel = this.vel;
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
		},

		PushBackFrom: function(entity, distance) {
			if (this.pos.x - entity.pos.x > 0)
				this.pos.x += distance;
			else
				this.pos.x -= distance;
		},

		AdjustAnims: function() {
			if (this.accel.x < 0)
				this.flip = true;
			else if (this.accel.x > 0)
				this.flip = false;

			if (Math.abs(this.vel.x) > 0 || Math.abs(this.vel.y))
				this.currentAnim = this.anims.moving;
			else
				this.currentAnim = this.anims.idle;

			// consider flipping all animations here so when animations change they are less jittery
			this.currentAnim.flip.x = this.flip;
		},

		DrawShadow: function(xoff, yoff) {
			TreatFighter.Sprites.Shadow.draw(
				this.pos.x - this.offset.x - ig.game._rscreen.x - xoff,
				this.pos.y - this.offset.y - ig.game._rscreen.y + yoff
			);
		},

		IsEditorMode: function() {
			return !ig.game.getEntitiesByType;  // this method only exists during actual gameplay
		}

	});

	ig.Image.inject({

		alpha: 1.0,

		draw: function(targetX, targetY, sourceX, sourceY, width, height) {
			ig.system.context.save();

			ig.system.context.globalAlpha = this.alpha;
			this.parent(targetX, targetY, sourceX, sourceY, width, height);

			ig.system.context.restore();
		}

	});

});