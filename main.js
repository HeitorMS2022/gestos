Webcam.set({
    width: 350,
    heigth: 300,
    image_format: "png",
    png_quality: 90
});
var camera = document.getElementById("camera");
Webcam.attach("#camera");
var previsão1 = "";
var previsão2 = "";
function capturar(){
    Webcam.snap(function(data_uri){
        document.getElementById("foto").innerHTML = '<img id="imagem" src="'+ data_uri +'" style="width: 350; height: 200";>';
    });
}
console.log("ml5", ml5.version)
var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/t2ypj6hRo/model.json", modelLoaded);
function modelLoaded(){
    console.log("modelo carregado");
}
function speak(){
    var synth = window.speechSynthesis;
    speakData = "A primeira previção é" + previsão1;
    speakData2 = "E a segunda previção é" + previsão2;
    var utterThis = new SpeechSynthesisUtterance(speakData + speakData2);
    synth.speak(utterThis);
}
function gesto(){
    img = document.getElementById("imagem");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("previsão1").innerHTML = results[0].label;
        document.getElementById("previsão2").innerHTML = results[1].label;
        emoção1 = results[0].label;
        emoção2 = results[1].label;
        previsão1 = results[0].label;
        previsão2 = results[1].label;
    }
    speak();
}