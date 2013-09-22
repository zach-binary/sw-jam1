<!DOCTYPE html>
<html>
<head>
	<title>Treat Fighter</title>
	<style type="text/css">
		html,body {
			background-color: #333;
			color: #fff;
			font-family: helvetica, arial, sans-serif;
			margin: 0;
			padding: 0;
			font-size: 12pt;
		}
		
		#canvas {
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			margin-top: 30px;
		}

		.content {
			margin: auto;
			width: 640px;
			margin-top: 560px;
		}
	</style>

	<script type="text/javascript">
    var Keen=Keen||{configure:function(e){this._cf=e},addEvent:function(e,t,n,i){this._eq=this._eq||[],this._eq.push([e,t,n,i])},setGlobalProperties:function(e){this._gp=e},onChartsReady:function(e){this._ocrq=this._ocrq||[],this._ocrq.push(e)}};(function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src=("https:"==document.location.protocol?"https://":"http://")+"dc8na2hxrj29i.cloudfront.net/code/keen-2.1.0-min.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})();

	    Keen.configure({
	        projectId: "523a893b73f4bb315e000002",
	        writeKey: "ca4ee15980f70c60dbbfc4eccb844185f98f880b4fd38fd7ea5fb18b56426344362ce7d45342abe77ad9bd5d00c550c862832b84e5676d73d03a3abcbca66df41b6d12d4146c31b90b054f3f3883b97a2e6fdfa018e8d36b1dcd6b6e1ab7e829c49cfe6a51528542f72a253468997a2a", // required for sending events
	        readKey: "67ec3ef60e1d55a3e48b350eaf6d5455b9bffe1610c6364592726e28e2a24a70ef9c41b2eccad49d02ebeeec947d2e101092869cb1551c24bbb0bb8063886856654dd8497e10c9d40daa75e6e7c4b842821283795f7bd50400fb1029ce12f6bfdea3cfb09c50958f338d99d550c9b80f"    // required for doing analysis
	    });
	    Keen.addEvent("hit");
	</script>
	<script type="text/javascript" src="game.min.js"></script>

</head>
<body>
	<canvas id="canvas"></canvas>
	<div class='content'>
		<p>WASD - To Move</p>
		<p>E - To Punch</p>
		<p>R - To Kick</p>
		<p>SPACE - Turbo</p>
		<p>
			<img src='media/sprites/crown.png'/> x 3 = <b>triple crown</b> = <b>rampage mode</b> (1 hit kill)
		</p>
		<p>
			<img src='media/sprites/horsemen.png' /> + <img src='media/sprites/candy.png' /> x 3 = <b>triple treat</b> for a big score bonus!
		</p>
	</div>
</body>
</html>
