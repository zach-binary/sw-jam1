ig.module(
  'entities.horsemen'
)
.requires(
  'impact.entity',
  'entities.items.crown',
  'settings'
)
.defines(function() {
  
	EntityHorsemen = ig.Entity.extend({

		maxVel: { x: 250, y: 250 },
		animSheet: TreatFighter.Sprites.Horsemen,
		size: { x: 60, y: 50 },
		checkAgainst: ig.Entity.TYPE.A,

		yVels: [0, 50, -50],
		direction: 1,

		init: function(x, y, settings) {
			this.parent(x, y, settings);

			this.addAnim('running', 0.2, [0, 1]);
			this.font = new ig.Font('media/fonts/lilyupc1.png', { borderColor: '#000', borderSize: 1 });
		},

		update: function() {

			if (this.CutsceneIsActive())
				return;

			this.vel.x = 250 * this.direction;
			this.vel.y = this.yVels[(Math.random() * 2).round()];

			if (this.pos.x > 2000)
				this.kill();

			if (this.vel.x < 0)
				this.currentAnim.flip.x = true;

			this.parent();
		},

		draw: function() {
			this.parent();
			if (this.redeemed) {
				this.font.draw(
					"Thanks!", 
					this.pos.x - this.offset.x - ig.game._rscreen.x + 6,
					this.pos.y - this.offset.y - ig.game._rscreen.y - 18
				);
			}
		},

		check: function(other) {
			var isPlayer = other instanceof EntityPlayer;
			if (!isPlayer || this.redeemed)
				return;

			if (other.candyCount > 0) {
				other.candyCount--;
				other.redemptionCount++;
				other.comboTimer.reset();
				this.DropCrown();
				this.redeemed = true;
				TreatFighter.Sounds.Bonus.play();
			}
		},

		handleMovementTrace: function(res) {
			this.pos.x += this.vel.x * ig.system.tick;
			this.pos.y += this.vel.y * ig.system.tick;
		},

		DropCrown: function() {
			if (Math.random() > 0.70) {
				ig.game.spawnEntity(EntityCrown, this.pos.x + 12, this.pos.y + 12);
			}
		}
	})

});