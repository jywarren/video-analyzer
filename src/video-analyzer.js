/*

look at: 
https://www.npmjs.com/package/jsmpeg
https://github.com/damianociarla/node-ffmpeg

*/

(function() {

//var Plotly = require("plotly");
var trace1 = {
  x: [],
  y: [],
  type: 'line'
};

// based on https://jsfiddle.net/epistemex/gdp00x2s/
var x = 50, y = 50;
var width = $('#video').width()
var height = $('#video').height();
var i = 0;
var video = document.getElementById("video");
//var thumbs = document.getElementById("thumbs");

video.onmousedown = function(e) {
  x = parseInt(e.clientX - $('#video').position().left);
  y = parseInt(e.clientY - $('#video').position().top);
  console.log(x, y);
}

video.addEventListener('loadeddata', function() {
  video.currentTime = i;
}, false);

video.addEventListener('seeked', function() {
  // now video has seeked and current frames will show
  // at the time as we expect
  generateThumbnail(i);

  // when frame is captured, increase
  i++;

  // if we are not passed end, seek to next interval
  if (i <= video.duration) {
    // this will trigger another seeked event
    video.currentTime = i;
  } else {

  }

}, false);

video.preload = "auto";
//video.src = "https://media.w3.org/2010/05/sintel/trailer.mp4";
video.src = "mine.mp4";

function generateThumbnail() {
  var c = document.createElement("canvas");
  var ctx = c.getContext("2d");
  c.width = width;
  c.height = height;
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.drawImage(video, 0, 0, width, height);
  var pixel = ctx.getImageData(x, y, 1, 1);
  trace1.x.push(i);
  trace1.y.push(pixel.data[0]);
  var data = [trace1];
  Plotly.newPlot('plot', data);
}

})();
