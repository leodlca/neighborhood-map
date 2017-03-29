var view = {

	// This function 

    displayMenuFunc: function() {
        var navbar = $("#navbar");

        if (navbar.hasClass("hidden-sm")) {
            navbar.removeClass("hidden-sm");
            navbar.removeClass("hidden-xs");
        } else {
        	navbar.addClass("hidden-sm");
        	navbar.addClass("hidden-xs");
        }
    },

    // This array handles all the markers

    markerArray: ko.observableArray(),

    // At first, there's no previous infowindow

    prevInfoWindow: false,

};