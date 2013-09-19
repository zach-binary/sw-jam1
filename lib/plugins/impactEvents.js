ig.module
(
	'plugins.impactEvents'
	)
.requires
(
	'impact.game'
	)
.defines(function () {
	
		// event aggregator
		ig.Game.prototype._publishers = {};
		
		// if you want your callback to execute in a specific context
		// make sure to pass callback with bind()
		// ex. addListener(this, "onclick" (function () { [...] }).bind(this));
		ig.Game.prototype.addListener = function (publisher, event, callback) {
			if (!publisher._uniqueId) {
				publisher._uniqueId = ig.game._nextId();
			}
			
			if (!this._publishers[publisher._uniqueId]) {
				this._publishers[publisher._uniqueId] = {};
			}
			
			if (!this._publishers[publisher._uniqueId][event] || !(this._publishers[publisher._uniqueId][event] instanceof Array)) {
				this._publishers[publisher._uniqueId][event] = [];
			}
			
			var nextId = ig.game._nextId();
			
			this._publishers[publisher._uniqueId][event].push({ callback: callback, uniqueId: nextId });
			
			return nextId;
		};
		
		ig.Game.prototype.fire = function (publisher, event) {
			if (!this._publishers || !this._publishers[publisher._uniqueId]) return;
			
			var i = this._publishers[publisher._uniqueId][event].length;
			while(i--) {
				var callback = this._publishers[publisher._uniqueId][event][i].callback;
				callback.apply(publisher);
			}
		};
		
		ig.Game.prototype.removeListener = function (publisher, event, uniqueId) {
			if (!this._publishers || !this._publishers[publisher._uniqueId]) return;

			var listeners = this._publishers[publisher._uniqueId][event];
			if (!listeners) return;

			var i = listeners.length;
			while(i--) {
				if (listeners[i].uniqueId === uniqueId) {
					listeners.splice(i,1);
					break;
				}
			}
		};
		
		ig.Game.prototype._nextId = function () {
			if (!this._uniqueId) { this._uniqueId = 0; }
			
			return this._uniqueId++;
		};
		
		// direct entity API
		// if you want your callback to execute in a specific context
		// make sure to pass callback with bind()
		// ex. addListener("onclick" (function () { [...] }).bind(this));
		ig.Entity.prototype.addListener = function (event, callback) {
			return ig.game.addListener(this, event, callback);
		};
		
		ig.Entity.prototype.removeListener = function (event, uniqueAttachment) {
			ig.game.removeListener(this, event, uniqueAttachment);
		};
		
		ig.Entity.prototype.fire = function (event) {
			
			if (arguments[1] !== null && arguments[1] !== "undefined"){
				ig.game.fire(this, event, arguments[1]);
			}
			else {
				ig.game.fire(this, event);   
			}
		};
		
		ig.Entity.inject({
			kill: function () {
				this.parent();
				
						// delete publisher references in the aggregator
						if (ig.game._publishers !== undefined && this._uniqueId > 0 && ig.game._publishers[this._uniqueId] !== undefined){
							delete ig.game._publishers[this._uniqueId];
						}
					}           
				});
		
		// animation API
		ig.Animation.prototype.onComplete = function (callback) {
			var uniqueId = ig.game.addListener(this, "complete", callback);
			var completeData = {loopCount: this.loopCount, uniqueId: uniqueId};
			
			if (this._completeData === undefined || typeof(this._completeData) !== "object"){
				this._completeData = [];
			}
			
			this._completeData.push(completeData);
			
			return uniqueId;
		};

		ig.Animation.prototype.onKeyframe = function (keyframe, callback) {
			var uniqueId = ig.game.addListener(this, "onKeyframe" + keyframe, callback);
			var onKeyframe = { loopCount: this.loopCount, keyframe: keyframe, uniqueId: uniqueId };
			
			if (this._keyframeData === undefined || typeof(this._keyframeData) !== "object"){
				this._keyframeData = [];
			}
			
			this._keyframeData.push(onKeyframe);
			
			return uniqueId;
		};

		ig.Animation.inject({
			update: function () {

				this.parent();
				
				this._listenComplete();
				this._listenKeyframe();
				
			},

			_listenComplete: function() {
				if (!this._completeData || !this._completeData.length) return;

				var i = this._completeData.length;
				while(i--) {
					if (this.loopCount > this._completeData[i].loopCount) {
						try {
							ig.game.fire(this, "complete");
						}
						finally {
							// stop notifying automatically.
							// extend or change to notify perpetually
							ig.game.removeListener(this, "complete", this._completeData[i].uniqueId);
						}
					}
				}
			},

			_listenKeyframe: function() {
				if (!this._keyframeData || !this._keyframeData.length) return;

				var i = this._keyframeData.length;
				while(i--) {
					if (this.frame >= this._keyframeData[i].keyframe) {
						try{
							ig.game.fire(this, "onKeyframe" + this._keyframeData[i].keyframe);
						}
						finally{
							// remove this from the notifications
							ig.game.removeListener(this, "onKeyframe" + this._keyframeData[i].keyframe, this._keyframeData[i].uniqueId);
						}
					}
				}
			},

			removeKeyframeListener: function(frame) {
				if (!this._keyframeData || !this._keyframeData.length) return;
				
				var i = this._keyframeData.length;
				while(i--) {
					if (this._keyframeData[i].keyframe === frame) {
						ig.game.removeListener(this, "onKeyframe" + this._keyframeData[i].keyframe, this._keyframeData[i].uniqueId);
					}
				}
			}
		});
});