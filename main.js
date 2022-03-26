img="";
status="";
objects = [];
function preload(){
    img=loadImage("dog_cat.jpg");
}
function setup(){
    canvas=createCanvas(380,450);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,450);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status - Detecting objacts";
}
function modelLoaded(){
    console.log("model is model");
    status = true;
    // objectDetector.detect(video, gotResults);
}
function gotResults(error,results){
    if (error){
        console.log(error + " this is ann error");
    }
    console.log(results);
    objects = results;
}
function draw(){
    image(video, 0,0,380,450);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
        for(i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Object - detected";
            document.getElementById("items").innerHTML="number of object = " + object.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15 ,objects[i].y + 15);
            noFill();                                   
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }


}
