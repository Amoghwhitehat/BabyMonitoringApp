img="";
status="";
objects=[];

function preload()
{
  img=loadImage('baby.jpg');
}

function setup()
{
canvas=createCanvas(500,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
object_detector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status  : Detecting Object";
}
function modelLoaded()
{
  console.log("modelLoaded");
  status=true;
  object_detector.detect(img,gotResults);
}
function draw()
{
    image(video,0,0,500,500);
    
    if(status!="")
    {
      for(i=0;i<objects.length;i++)
      {
        document.getElementById("status").innerHTML="status  : Detecting Object";
        fill("black");
        percent=floor(objects[i].confidence *100);
        text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
        textSize(30);    
        noFill();
        stroke("yellow");
        rect(objects[i].x-30,objects[i].y-30,objects[i].width,objects[i].height);
      }
    }
}
function gotResults(error,results)
{
if(error)
{
  console.log(error);
}
console.log(results);
objects=results
}