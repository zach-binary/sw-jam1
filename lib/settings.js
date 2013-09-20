ig.module(
  'settings'
)
.requires(
	'impact.entity'
)
.defines(function() {

	TreatFighter = {};

	TreatFighter.Sprites = {
		Frankenstein: new ig.AnimationSheet('media/sprites/frankenstein.png', 33, 62),
		Frankenfist: new ig.AnimationSheet('media/sprites/frankenfist.png', 8, 8),
		Thug1: new ig.AnimationSheet('media/sprites/thug1.png', 33, 67),
		Thugfist: new ig.AnimationSheet('media/sprites/thugfist.png', 8, 8)
	};

	TreatFighter.Sounds = {
		TitleScreen: new ig.Sound('media/sounds/start.mp3', false),
		ThrowPunch: new ig.Sound('media/sounds/throwPunch.mp3', false),
		Hurt: new ig.Sound('media/sounds/hurt.mp3', false)
	};

	TreatFighter.Sounds.ThrowPunch.volume = 0.3;

	TreatFighter.Convos = {

		SceneActOne: [
			'Thugs everywhere are stealing candy on halloween',
			'Stop them!  Attack using the "E" key!'
		]

	};
  
});