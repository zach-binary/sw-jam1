ig.module(
  'entities.dialogues.cutscene'
)
.requires(
  'impact.entity',
  'entities.dialogues.dialogue'
)
.defines(function() {

  EntityCutscene = ig.Entity.extend({

    checkAgainst: ig.Entity.TYPE.A,
    gravityFactor: 0,
    zIndex: -1,
    _wmDrawBox: true,
    _wmBoxColor: 'rgba(40, 40, 200)',

    dialogue: [],
    textPos: { x: 40, y: 80 },
    sequence: -1,
    active: false,

    init: function(x, y, settings) {
      this.parent(x, y, settings);

      var convo = TreatFighter.Convos[settings.convo];

      if (convo) 
        this.dialogue = convo;
    },

    ready: function() {
      this.Activate();
    },

    update: function() {
      if (!this.active)
        return;

      if (ig.input.pressed('enter'))
        this.NextInSequence();
    },

    kill: function() {
      if (this.OnComplete) {
        this.OnComplete();
      }
      this.parent();
    },

    Activate: function() {
      this.active = true;

      var player = ig.game.getEntityByName("Player");
        if (player) {
        player.state = player.CutsceneState;
        player.vel = {x:0, y:0};
        player.accel = {x:0, y:0};
      }
      this.NextInSequence();
    },

    NextInSequence: function() {
      if (!this.dialogueBox) 
        this.dialogueBox = ig.game.spawnEntity(EntityDialogue, this.textPos.x, this.textPos.y);

      var dialogue = this.dialogue[++this.sequence];

      if (!dialogue) {
        this.CloseDialogue();
        return;
      }

      this.dialogueBox.SetDialogue(dialogue);
    },

    CloseDialogue: function() {
      this.dialogueBox.kill();
      this.dialogueBox = null;
      this.sequence = -1;
      this.active = false;

      var player = ig.game.getEntityByName("Player");
      if (player)
        player.state = player.MoveState;

      ig.game.loadLevel(LevelTitle);
      
      this.kill();
    }

  });

});


