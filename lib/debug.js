ig.module(
  'debug'
)
.requires(
  'impact.debug.debug',
  'plugins.astar-for-entities-debug'
)
.defines(function() {

  ig.debug.togglePanel(ig.debug.panels.graph);

});