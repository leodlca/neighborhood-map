
var globalMap;

// loadMap starts the Map, loads the markers and the infowindows

var loadMap = function() {

    var self = this;

    this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {
            lat: 49.29109779978075,
            lng: -123.12446594238281
        },
        styles: model.map_style,
    });

    var markers = model.map_markers();

    var markerArray = view.markerArray();

    for (var i = 0; i < markers.length; i++) {

        // Get the position, title and icon from the map_markers array

        var position = markers[i].position();
        var title = markers[i].title();
        var icon = {
            url: markers[i].icon,
            scaledSize: new google.maps.Size(32, 32)
        };

        // Create a marker per location, and put into markerArray

        var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: icon,
            id: i
        });

        markerArray.push(marker);
    }

    markerArray.forEach(function(item) {

        // Transform the marker title into a string readable by Wikipedia query
        // and create an empty infowindow

        var rawTitle = item.title.split(" ");
        var formatedTitle = rawTitle.join("%20");
        var HTMLString;

        var infowindow = new google.maps.InfoWindow();

        // Make an ajax request to Wikipedia API

        function ajax() {
            return $.ajax({
                url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
                    formatedTitle,
                dataType: "jsonp",
            });
        }

        // When the ajax request is done, runs this script

        ajax().done(function(result) {

            // Create two HTML strings to be displayed on the infowindow of the marker

            var header = "<h5>Articles Provided by Wikipedia: </h5><br><ul>";
            var links = [];

            for (var i = 0; i < result[3].length; i++) {

                if (i === 4) {
                    break;
                }

                links.push("<li><a href=" + result[3][i] + ">" +
                    result[1][i] + "</a></li>");
            }

            // Set the content to be the HTML string

            if (links.length > 0) {
                HTMLString = header + links.join(" ") + "</ul>";
            } else {
                HTMLString = header +
                    "There are no Wikipedia articles for this Location" + "</ul";
            }

            infowindow.setContent(HTMLString);

        }).fail(function() {

            // Tell the user if by some reason, the AJAX Request fails

            alert("Something Bad Happened, AJAX Request Failed");
        });

        // Mousedown is being used instead of click so the UX on mobile is improved

        item.addListener('mousedown', function() {

            // view.prevInfoWindow contains the last infowindow that was open,
            // this if statement closes it

            if (view.prevInfoWindow) {
                view.prevInfoWindow.close();
            }

            self.map.setZoom(15);
            self.map.setCenter(item.position);

            var current = this;

            // This makes the marker bounce when it's clicked
            // The animation fades after 3s

            if (current.getAnimation() !== null) {
                current.setAnimation(null);
            } else {
                current.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    current.setAnimation(null);
                }, 1400);
            }

            // Set the current infowindow to be the view.prevInfoWindow, after the last
            // one is closed

            view.prevInfoWindow = infowindow;

            infowindow.open(self.map, item);
        });

    });

    // Make sure viewModel is loaded after Google Maps API finished loading.

    ko.applyBindings(viewModel);

    // Displays all the markers

    setMapOnAll(view.markerArray(), self.map);

    return map;

};

// initMap is the callback function of googleMap API and assigns globalMap
// to the map object produced by loadMap, so it can be used by other functions.

function initMap() {
    globalMap = loadMap();
}

var viewModel = function() {

    self = this;

    setMapOnAll = function(markerArray, map) {
        markerArray.forEach(function(marker) {
            marker.setMap(map);
        });
    };

    setMapCenter = function(id) {

        // Mousedown is being used instead of click so it guarantees the best
        // UX on mobiles

        google.maps.event.trigger(view.markerArray()[id], 'mousedown');
    };

    query = ko.observable('');

    toDisplay = ko.observableArray(view.markerArray());

    toHide = ko.observableArray([]);

    search = ko.computed(function() {

        // This function handles the user search

        // Query is what the user is currently typing, after each keystroke, query is updated

        var query = self.query().toLowerCase();

        if (query !== '') {

            // When query is not empty, the toDisplay Array is wiped

            self.toDisplay([]);

            // And then it's populated according to what the user is typing

            for (var i = 0; i < view.markerArray().length; i++) {
                if (view.markerArray()[i].title.toLowerCase().indexOf(query) >= 0) {
                    self.toDisplay.push(view.markerArray()[i]);
                    self.setMapOnAll(self.toDisplay(), globalMap);
                } else {

                    // If the marker does not match the query, it is pushed to toHide

                    self.toHide.push(view.markerArray()[i]);
                }
            }

            // And then every marker on toHide is hidden from the map.

            self.setMapOnAll(self.toHide(), null);
            self.toHide([]);

        } else {

            // If the query is empty, every marker is displayed on the list,
            // and on the map

            self.toHide([]);
            self.toDisplay(view.markerArray());
            self.setMapOnAll(self.toDisplay(), globalMap);
        }

    });

};