ig.module(
	'main'
)
.requires(
	'impact.game',
	'plugins.gamepad.gamepad',

	'utility',
	'settings',

	'levels.Prologue',
	'levels.Title',
	'levels.ActOne'
)
.defines(function() {

	Game = ig.Game.extend({
	
		gravity: 0,
		autoSort: true,

		sortBy: ig.Game.SORT.POS_Y,

		firstLevel: LevelPrologue,
		currentLevel: null,
	
		init: function() {
		
			ig.input.bind(ig.KEY.A, 'left');
			ig.input.bind(ig.KEY.S, 'down');
			ig.input.bind(ig.KEY.W, 'up');
			ig.input.bind(ig.KEY.D, 'right');
			ig.input.bind(ig.KEY.E, 'punch');
			ig.input.bind(ig.KEY.R, 'kick');
			ig.input.bind(ig.KEY.SPACE, 'run');
			ig.input.bind(ig.KEY.ENTER, 'enter');
		
			this.loadLevel(this.firstLevel);
		},

		update: function() {
			if (Gamepad.supported) {
				var gamepad = new Gamepad.getState(1);      
    		var mappings = [[ gamepad.dpadUp, ig.KEY.W ],
                    [ gamepad.dpadDown, ig.KEY.S ],
                    [ gamepad.dpadLeft, ig.KEY.A ],
                    [ gamepad.dpadRight, ig.KEY.D ],
                    [ gamepad.faceButton0, ig.KEY.E ],
                    [ gamepad.faceButton1, ig.KEY.R ],
                    [ gamepad.faceButton2, ig.KEY.SPACE ],
                    [ gamepad.faceButton3, ig.KEY.ENTER ]];
    		new Gamepad.magic(gamepad, mappings);
			}

			this.parent();
		},

		draw: function() {
			this.parent();
		}

	});

	ig.Sound.use = [ig.Sound.FORMAT.MP3, ig.Sound.FORMAT.OGG];
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