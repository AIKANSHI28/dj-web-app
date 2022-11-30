song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scorerightWrist=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide()

    poseNet=ml5.poseNet(video,moldelLoaded);
    poseNet.on('pose',gotPoses)
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scorerightWrist=results[0].pose.keypoints[10].score;
        console.log("scorerightWrist="+scorerightWrist+"scoreLeftWrist="+scoreLeftWrist);

       
        leftWristX=results[0].poses.leftWrist.x;
        leftWristY=results[0].poses.leftWrist.y;
       console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);

       rightWristX=results[0].poses.rightWrist.x;
        rightWristY=results[0].poses.rightWrist.y;
       console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);


    }
}


function moldelLoaded(){
    console.log('PoseNet is initiallized')
}
function preload(){
    song=loadSound("music.mp3");
}

function draw(){
    image(video,0,0,600,500);
    fill("#8B008B");
    stroke("#8B008B");

    if(scoreLeftWrist >0.2){
    circle(rightWristX,rightWristY,20);

    if(rightWristY>0 && rightWristX<=100){
document.getElementById("speed").innerHTML="speed=0.5x";
song.rate(0.5);

    }

    else if(rightWristY>100 && rightWristX<=200){
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);  
    }
    else if(rightWristY>200 && rightWristX<=300){
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);  
    }
    else if(rightWristY>300 && rightWristX<=400){
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);  
    }
    else if(rightWristY>400 && rightWristX<=500){
        document.getElementById("speed").innerHTML="speed=2.5x";
        song.rate(2.5);  
    }
}

    if(scoreLeftWrist >0.2){

    circle(leftWristX,leftWristY,20);
    InNumberleftWristY=Number(leftWristY);
    volume=floor(InNumberleftWristY)/500;
    document.getElementById("volume").innerHTML="volume="+volume;
    song.setVolume(volume)
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1)
}