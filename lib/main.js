ig.module(
	'main'
)
.requires(
	'impact.game',
	'impact.debug.debug',
	'plugins.astar-for-entities-debug',
	'plugins.astar-for-entities',

	'utility',

	'levels.test'
)
.defines(function() {

	Game = ig.Game.extend({
	
		gravity: 0,

		firstLevel: LevelTest,
		currentLevel: null,
	
		init: function() {
		
			ig.input.bind(ig.KEY.A, 'left');
			ig.input.bind(ig.KEY.S, 'down');
			ig.input.bind(ig.KEY.W, 'up');
			ig.input.bind(ig.KEY.D, 'right');
		
			this.loadLevel(this.firstLevel);
		},

		draw: function() {
			this.parent();
		}

	});
	
	ig.main( '#canvas', Game, 60, 900, 600, 1 );

	window.addEventListener("blur", function () {
		if (ig.system) {
			ig.music.stop();
			ig.system.stopRunLoop();
		}
	}, false);
	 
	window.addEventListener("focus", function () {
		if (ig.system) {
			ig.music.play();
			ig.system.startRunLoop();
		}
	}, false);

});