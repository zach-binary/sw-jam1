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
		Thug1: new ig.AnimationSheet('media/sprites/thug1.png', 33, 67)
	};

	TreatFighter.Convos = {

		SceneActOne: [
			'Thugs everywhere are stealing candy on halloween',
			'Stop them!!'
		]

	}
  
});