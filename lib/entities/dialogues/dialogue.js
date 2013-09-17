ig.module(
  'entities.dialogues.dialogue'
)
.requires(
  'impact.entity'
)
.defines(function() {

  EntityDialogue = ig.Entity.extend({

    dialogue: '',
    gravityFactor: 0,
    speed: 0.030,

    dialogueToShow: '',
    currentChar: 0,

    init: function(x, y, settings) {
      this.parent(x, y, settings);

      this.font = new ig.Font('media/fonts/lilyupc1.png');
      this.charTimer = new ig.Timer(this.speed);
    },

    update: function() {
      if (this.charTimer.delta() >= 0 && this.currentChar < this.dialogue.length) { 
        this.dialogueToShow = this.dialogue.slice(0, ++this.currentChar);
        this.charTimer.reset();
      }
    },

    draw: function() {
      ig.system.context.globalAlpha = 0.7;
      ig.system.context.fillRect(this.pos.x - 7, this.pos.y - 3, 515, 30);
      ig.system.context.globalAlpha = 1.0;

      var text = this.dialogueToShow;
      this.font.draw(
        text, 
        this.pos.x,
        this.pos.y
      );
    },

    SetDialogue: function(text) {
      this.dialogue = text;
      this.dialogueToShow = '';
      this.currentChar = 0;
    }

  });

});