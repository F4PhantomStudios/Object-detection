objectDetector= "";

img = "";
objects = [];
status = "";



function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video.createCapture(VIDEO);
  video.hide();
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}


function draw() {
  image(video, 0, 0, 380, 380);

      if(status != "")
      {
        R= random(255);
        G = random(255);
        B = random(255);
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
    
          fill(R, G, B);
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke(R, G, B);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
}