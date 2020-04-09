var database = firebase.database();

$("button").on("click", function() {
    var route = $("#rte").val();
    var destination = $("#dest").val();
    var frequency = $("#freq").val();
    var firstBus = $("#frst").val();

    database.ref().push({
        inputRoute: route,
        inputDest: destination,
        inputFreq: frequency,
        inputFirstBus: firstBus,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    })
});

database.ref().on("child_added", function(snapshot) {
    var firstBusConverted = moment(snapshot.val().inputFirstBus, "HH:mm").subtract(1, "years");
    var timeDifference = moment().diff(moment(firstBusConverted), "minutes");
    var timeRemainder = timeDifference % snapshot.val().inputFreq;
    var minutesLeft = snapshot.val().inputFreq - timeRemainder
    var nextBus = moment().add(minutesLeft, "minutes");
    var nextBusFormatted = moment(nextBus).format("HH:mm");

    var addedRoute = snapshot.val().inputRoute;
    var addedDest = snapshot.val().inputDest;
    var addedFreq = snapshot.val().inputFreq;

var newRow = $("<tr>").append(
    $("<td>").text(addedRoute),
    $("<td>").text(addedDest),
    $("<td>").text(addedFreq),
    $("<td>").text(nextBusFormatted),
    $("<td>").text(minutesLeft)
);

$("#routeTable").append(newRow);
});

setInterval(function () {
    window.location.reload();
}, 60000);
