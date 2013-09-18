ig.module(
	'main'
)
.requires(
	'impact.game',
	'impact.debug.debug',
	'plugins.astar-for-entities-debug',
	'plugins.astar-for-entities',

	'settings',
	'utility',

	'levels.Title',
	'levels.ActOne'
)
.defines(function() {

	Game = ig.Game.extend({
	
		gravity: 0,
		autoSort: true,

		sortBy: ig.Game.SORT.POS_Y,

		firstLevel: LevelTitle,
		currentLevel: null,
	
		init: function() {
		
			ig.input.bind(ig.KEY.A, 'left');
			ig.input.bind(ig.KEY.S, 'down');
			ig.input.bind(ig.KEY.W, 'up');
			ig.input.bind(ig.KEY.D, 'right');
			ig.input.bind(ig.KEY.E, 'punch');
			ig.input.bind(ig.KEY.ENTER, 'enter');
		
			this.loadLevel(this.firstLevel);
		},

		draw: function() {
			this.parent();
		}

	});
	
	ig.main( '#canvas', Game, 60, 640, 480, 1 );
	ig.debug.togglePanel(ig.debug.panels.graph);

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