/*

look at: 
https://www.npmjs.com/package/jsmpeg
https://github.com/damianociarla/node-ffmpeg

*/

var c, ctx, video, height = 0, width = 0;
var x = 50, y = 50;

(function() {

//var Plotly = require("plotly");
var trace1 = {
  x: [],
  y: [],
  type: 'line'
};

// based on https://jsfiddle.net/epistemex/gdp00x2s/
var i = 0;
video = document.getElementById("video");
//var thumbs = document.getElementById("thumbs");

video.onmousedown = function(e) {
  x = parseInt(e.clientX - $('#video').position().left);
  y = parseInt(e.clientY - $('#video').position().top);
  console.log(x, y, $('#video').position().left, $('#video').position().top);
}

video.addEventListener('loadeddata', function() {
  width = $('#video').width()
  height = $('#video').height();
  console.log(height, width);
  x = parseInt(width/2);
  y = parseInt(height/2);
  video.currentTime = i;
  Plotly.newPlot('plot', [trace1]);
}, false);

// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
// video.addEventListener('seeked', function() {
video.addEventListener('timeupdate', function() {

  // now video has seeked and current frames will show
  // at the time as we expect
  if (video.currentTime != 0) generateThumbnail(i);

  // when frame is captured, increase
  i++;

  // if we are not passed end, seek to next interval
  if (i <= video.duration) {
    // this will trigger another seeked event
    video.currentTime = i;
  } else {

  }

}, false);

//video.preload = "auto";
//video.src = "https://media.w3.org/2010/05/sintel/trailer.mp4";
//video.src = "mine.mp4";

function generateThumbnail() {
  c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  c.style.width = width;
  c.style.height = height;
  ctx = c.getContext("2d");
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.drawImage(video, 0, 0, width, height);
  var pixel = ctx.getImageData(x, y, 1, 1);
  var newx = video.currentTime; // or i for frame #?
  var newy = pixel.data[0] + pixel.data[1] + pixel.data[2];
  if (newy > 0) Plotly.extendTraces('plot', { x: [[newx]], y: [[newy]] }, [0])
}

})();
