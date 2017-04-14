# MMM-Podcast
This is an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror). It can show/hide a video downloaded from a Podcast or a private server (needs static file path).
Hereby you can use an existing podcast or be able to create your own script to select the displayed videos.
At the moment you can only display the video by clicking a button ([MMM-Button](https://github.com/ptrbld/MMM-Button)) or using [MMM-voice](https://github.com/fewieden/MMM-voice).

## Installation
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/ptrbld/MMM-Podcast.git`. A new folder will appear navigate into it.
2. Execute `npm install` to install the node dependencies.
3. Install [omxplayer](http://elinux.org/Omxplayer).

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-Podcast',
		config: {
			// See 'Configuration options' for more information.
		}
	}
]
````

## Configuration options

The following properties can be configured:


<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>feedUrl</code></td>
			<td>The url from the wanted podcast. Default value is the 100 second news podcast from German TV (Tagesschau)<br>
				<br><b>Possible values:</b> <code>string</code>
				<br><b>Default value:</b> <code>'http://www.tagesschau.de/export/video-podcast/webxl/tagesschau-in-100-sekunden/'</code>
			</td>
		</tr>
		<tr>
			<td><code>videoUrl</code></td>
			<td>The static file url from any server you want (for custom video "podcast") <br>
				<br><b>Possible values:</b> <code>string</code>
				<br><b>Default value:</b> <code>''</code>
			</td>
		</tr>
		<tr>
			<td><code>updateVideoHours</code></td>
			<td>The daily hour when the video gets updated<br>
				<br><b>Possible values:</b> <code>int</code>
				<br><b>Default value:</b> <code>4</code>
			</td>
		</tr>
		<tr>
			<td><code>updateVideoMinutes</code></td>
			<td>The minute when the video gets updated<br>
				<br><b>Possible values:</b> <code>int</code>
				<br><b>Default value:</b> <code>0</code>
			</td>
		</tr>
	</tbody>
</table>

## Voice Commands

You need to say your KEYWORD (Default: MAGIC MIRROR), when the KEYWORD is recognized the microphone will start to flash and as long as the microphone is flashing (timeout config option) the mirror will recognize COMMANDS or MODES (Keep in mind that the recognition will take a while, so when you say your COMMAND right before the microphone stops flashing the COMMAND will propably not recognized).

Mode of this module: PODCAST

COMMANDS:

SHOW PODCAST

HIDE PODCAST

## Dependencies
- [node-omx](https://www.npmjs.com/package/node-omx) (installed via `npm install`)
- [omxdirector](https://www.npmjs.com/package/omxdirector) (installed via `npm install`)
- [omxplayer](http://elinux.org/Omxplayer) (installed via `apt-get install omxplayer`)

The MIT License (MIT)
=====================

Copyright © 2016 PtrBld

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
