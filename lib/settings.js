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
		Frankface: new ig.Image('media/sprites/frankface.png'),
		Frankenfoot: new ig.AnimationSheet('media/sprites/frankenfoot.png', 18, 10),
		Poweredup: new ig.Image('media/sprites/frankenyellow.png'),
		Thug1: new ig.AnimationSheet('media/sprites/thug1.png', 33, 67),
		Thugfist: new ig.AnimationSheet('media/sprites/thugfist.png', 8, 8),
		HealthDot: new ig.Image('media/sprites/healthdot.png'),
		TurboDot: new ig.Image('media/sprites/turbodot.png'),
		Shadow: new ig.Image('media/sprites/shadow.png'),
		Candy: new ig.Image('media/sprites/candy.png'),
		Crown: new ig.Image('media/sprites/crown.png'),
		Horsemen: new ig.AnimationSheet('media/sprites/horsemen.png', 60, 58),
		TripleCrown: new ig.Image('media/sprites/triplecrown.png'),
		Rampage: new ig.Image('media/sprites/rampage.png')
	};

	TreatFighter.Sprites.Shadow.alpha = 0.3;

	TreatFighter.Sounds = {
		TitleScreen: new ig.Sound('media/sounds/start.mp3', false),
		ThrowPunch: new ig.Sound('media/sounds/throwPunch.mp3', false),
		Hurt: new ig.Sound('media/sounds/hurt.mp3', false),
		Pickup: new ig.Sound('media/sounds/pickup.mp3', false),
		Bonus: new ig.Sound('media/sounds/bonus.mp3', false)
	};

	TreatFighter.Sounds.ThrowPunch.volume = 0.3;

	TreatFighter.Convos = {

		SceneActOne: [
			'Beat up the street thugs and take\n back their stolen candy.',
			'Throw punches using the "E" key.',
			'If you see a trick or treater,\ncatch them to return the candy.',
			'You can move faster using "SPACE"'
		]

	};
  
});