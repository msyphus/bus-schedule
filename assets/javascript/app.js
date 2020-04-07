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
    inputFirstBus: firstBus
    })
});

database.ref().on("child_added", function(snapshot) {
    var addedRoute = snapshot.val().inputRoute;
    var addedDest = snapshot.val().inputDest;
    var addedFreq = snapshot.val().inputFreq;
    var addedFirstBus = snapshot.val().inputFirstBus;

var newRow = $("<tr>").append(
    $("<td>").text(addedRoute),
    $("<td>").text(addedDest),
    $("<td>").text(addedFreq),
    //$("<td>").text(nextArrival),
    //$("<td>").text(minLeft)
);

$("#routeTable").append(newRow);
});

