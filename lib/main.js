ig.module(
	'main'
)
.requires(
	'impact.game',
	'plugins.astar-for-entities',

	'utility',
	'settings',

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
			ig.input.bind(ig.KEY.SPACE, 'run');
			ig.input.bind(ig.KEY.ENTER, 'enter');
		
			this.loadLevel(this.firstLevel);
		},

		draw: function() {
			this.parent();
		}

	});

	ig.Sound.use = [ig.Sound.FORMAT.MP3];
	ig.main( '#canvas', Game, 60, 640, 480, 1 );

	window.addEventListener("blur", function () {
		if (ig.system && ig.game) {
			ig.music.stop();
			ig.system.stopRunLoop();
		}
	}, false);
	 
	window.addEventListener("focus", function () {
		if (ig.system && ig.game) {
			ig.music.play();
			ig.system.startRunLoop();
		}
	}, false);

});