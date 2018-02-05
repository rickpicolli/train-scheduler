
//firebase key
var config = {
    apiKey: "AIzaSyASkrypJHQMt7G1zHS5GhszEwu-wcukvNI",
    authDomain: "train-scheduler-6073f.firebaseapp.com",
    databaseURL: "https://train-scheduler-6073f.firebaseio.com",
    projectId: "train-scheduler-6073f",
    storageBucket: "train-scheduler-6073f.appspot.com",
    messagingSenderId: "338466507482"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


var name = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";
var nextArrival = "";
var minutesAway = "";
var nextTrain = "";
var currentTime = "";
var firstTimeConverted = "";
var difference = "";
var trainRemain = "";


$(document).ready(function() {

	$("#add-train").on("click", function(event) {
		event.preventDefault();

		name = $("#train-name-input").val().trim();
		destination = $("#destination-input").val().trim();
		firstTrainTime = $("#time-input").val().trim();
		frequency = $("#frequency-input").val().trim();		
		currentTime = moment();
		firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years").format("X");
		
		difference = moment().diff(moment(firstTimeConverted), "minutes");
		trainRemain = difference % frequency
		minutesAway = frequency - trainRemain;
		nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");


database.ref().push({
	name: name,
	destination: destination,
	firstTrainTime: firstTrainTime,
	frequency: frequency,
	nextArrival: nextArrival,
	minutesAway: minutesAway



	});

	
});

database.ref().on("child_added", function(snapshot) {


		console.log(snapshot.val());

      console.log(snapshot.val().name);

      console.log(snapshot.val().destination);

      console.log(snapshot.val().firstTrainTime);

      console.log(snapshot.val().frequency);


	$(".table").append("<tr><td>" + snapshot.val().name + "</td>" +
		"<td>" + snapshot.val().destination + "</td>" + 
		"<td>" + snapshot.val().frequency + "</td>" +
		"<td>" + snapshot.val().nextArrival + "</td>" + 
		"<td>" + snapshot.val().minutesAway + "</td>" + 
		"</tr>"	);


}, function(errorObject){

	console.log("errors handled" + errorObject.code);

});



 }); 