song1 = "";
song2 = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;

scoreleftwrist = 0;
scorerightwrist = 0;

function preload()
{
    song1 = loadSound("yummy.mp3");
    song2 = loadSound("Avicii.mp3")
}
function setup()
{
    canvas = createCanvas(580, 480);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);

    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("Model is loaded!!");
}

function draw()
{
    image(video, 0,0 ,580, 480);

if(scoreleftwrist > 0.2)
{
    circle(leftWristX, leftWristY, 20);
    song2.stop();
    song1.play();
    song1.setVolume(1);
    song1.rate(1);
    document.getElementById("song").innerHTML = "Now Playing - Yummy Yummy ";
}

if(scorerightwrist > 0.2)
{
    circle(rightWristX, rightWristY, 20);
    song1.stop();
    song2.play();
    song2.setVolume(1);
    song2.rate(1);
    document.getElementById("song").innerHTML = "Now Playing - Avicci - The Nights ";
}

}

function gotPoses(results)
{
if(results.length > 0)
{
    console.log(results);

    scoreleftwrist = results[0].pose.keypoints[9].score;
    scorerightwrist = results[0].pose.keypoints[10].score;

    leftWristX = results[0].pose.leftWrist.x;
    rightWristX = results[0].pose.rightWrist.x;

    leftWristY = results[0].pose.leftWrist.y;
    rightWristY = results[0].pose.rightWrist.y;
}
}