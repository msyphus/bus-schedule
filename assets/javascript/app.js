var database = firebase.database();

$("button").on("click", function() {
    var route = $("#rte").val();
    var destination = $("#dest").val();
    var frequency = $("#freq").val();
    var firstBus = $("#frst").val();

    //Variables for time calculations
    var firstBusConverted = moment(firstBus, "HH:mm").subtract(1, "years");
    var timeDifference = moment().diff(moment(firstBusConverted), "minutes");
    var timeRemainder = timeDifference % frequency;
    var minutesLeft = frequency - timeRemainder
    var nextBus = moment().add(minutesLeft, "minutes");
    var nextBusFormatted = moment(nextBus).format("HH:mm");
    

    database.ref().push({
        inputRoute: route,
        inputDest: destination,
        inputFreq: frequency,
        inputFirstBus: firstBus,
        inputNextBus: nextBusFormatted,
        inputMinLeft: minutesLeft
    })
});

database.ref().on("child_added", function(snapshot) {
    var addedRoute = snapshot.val().inputRoute;
    var addedDest = snapshot.val().inputDest;
    var addedFreq = snapshot.val().inputFreq;
    var addedNextBus = snapshot.val().inputNextBus;
    var addedMinLeft = snapshot.val().inputMinLeft;

var newRow = $("<tr>").append(
    $("<td>").text(addedRoute),
    $("<td>").text(addedDest),
    $("<td>").text(addedFreq),
    $("<td>").text(addedNextBus),
    $("<td>").text(addedMinLeft)
);

$("#routeTable").append(newRow);
});

