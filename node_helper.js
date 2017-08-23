'use strict';

/* Magic Mirror
 * Module: MMM-Video
 *
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
module.exports = NodeHelper.create({
	start: function () {
		this.loaded = false;
	},
	// Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		const self = this;
		this.config = payload;
		if(notification == "VIDEO_DOWNLOAD"){
			this.downloadVideo(self.config.videoUrl,"modules/MMM-Podcast/video.mp4",function(){self.loaded = true;});
		}
		else if (notification == 'VIDEO_CHANGED') {		
			var omx = require('omxdirector');
			this.config = payload;	
			var status = omx.getStatus();
			if(status.playing){
				omx.stop();
			}  
			else if(this.loaded){
				omx.play("modules/MMM-Podcast/video.mp4");
			}
			else{
				setTimeout(function(){this.socketNotificationReceived(notification, payload)},2000);
			}
		}
	},
	downloadVideo : function(url, dest, cb){
		var normalizedUrl = url.replace("https://", "http://");
		this.loaded = false;
		var http = require('http');
		var fs = require('fs');
		const self = this;
		var file = fs.createWriteStream(dest);
		var request = http.get(normalizedUrl, function(response) {
			response.pipe(file);
			file.on('finish', function() {
				file.close(cb);			
			});
		});
	},
});
