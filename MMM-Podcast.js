Module.register("MMM-Podcast",{
    // Default module config.
    defaults: {
		//download time for video
		updateVideoHours: 4,
		updateVideoMinutes: 0,
		//add your static server url here (if needed)
		videoUrl: '',
		//add your feed url here:
		//sadly there are not so many English Podcasts:
		//feedUrl: 'http://podcastfeeds.nbcnews.com/audio/podcast/MSNBC-MADDOW-NETCAST-M4V.xml',
		//German news in 100 seconds:
		feedUrl: 'http://www.tagesschau.de/export/video-podcast/webxl/tagesschau-in-100-sekunden/',
    },
	getScripts: function() {
		return [
			'https://code.jquery.com/jquery-2.2.3.min.js',  // this file will be loaded from the jquery servers.
		]
	},
	start: function() {
		Log.info("Starting module: " + this.name);
		this.timedUpdate();
	},
	timedUpdate: function(){
		if(this.config.feedUrl !== ''){
			this.loadVideo();
		}
		else{
			self.sendSocketNotification('VIDEO_DOWNLOAD', self.config);
		}
		var self = this;
		//calculate Timeout
		var now = new Date();
		var millisTillDownload = new Date(now.getFullYear(), now.getMonth(), now.getDate(), this.config.updateVideoHours, this.config.updateVideoMinutes, 0, 0) - now;
		if (millisTillDownload < 0) {
			 millisTillDownload += 86400000; // it's after the needed time, try time tomorrow.
		}
		setTimeout(function(){self.timedUpdate},millisTillDownload);
	},
	playVideo: function(){
		this.sendSocketNotification('VIDEO_CHANGED', this.config);
	},
	loadVideo: function(){
		 var yqlURL = 'http://query.yahooapis.com/v1/public/yql'; //yql 
		 var yqlQS = '?format=json&callback=?&q=select%20*%20from%20rss%20where%20url%3D'; //yql query string
		 var cachebuster = Math.floor((new Date().getTime()) / 1200 / 1000); //yql caches feeds, so we change the feed url every 20min  
		 var url = yqlURL + yqlQS + "'" + encodeURIComponent(this.config.feedUrl) + "'" + "&_nocache=" + cachebuster;
		 var self = this;
		 var html = $.getJSON(url, function(data){  
					 //rss feed is loaded so get url
					 data = data.query.results;
					 if(data.item[0]){
						self.config.videoUrl = data.item[0].enclosure.url;
					 }
					 else{
						self.config.videoUrl = data.item.enclosure.url;
					 }
					 self.sendSocketNotification('VIDEO_DOWNLOAD', self.config);					 
		});
	},
	notificationReceived: function(notification, payload, sender) {
		 if(notification === "ALL_MODULES_STARTED"){
			this.sendNotification("REGISTER_VOICE_MODULE", {
			    mode: "PODCAST",
			    sentences: [
				"SHOW PODCAST",
				"HIDE PODCAST"
			    ]
			});
		    }
		//register MMM-Button click
		else if(notification == "BUTTON_PRESSED") {
			Log.log(this.name + " received a system notification: " + notification);
			this.playVideo();
		}
		else if(notification === "VOICE_PODCAST" && sender.name === "MMM-voice"){
			this.checkCommands(payload);
    		}
	},	
	// test for your commands
	checkCommands: function(data){
    		if(/(SHOW)/g.test(data) && /(PODCAST)/g.test(data)){
			this.playVideo();
		}
		if(/(HIDE)/g.test(data) && /(PODCAST)/g.test(data)){
			this.playVideo();
		}
    	}
});
