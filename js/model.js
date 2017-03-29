var model = {

	map_style: [{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]}],

	map_markers: ko.observableArray([
        
        {
            position: ko.observable({lat: 49.28586337652517, lng: -123.11202049255371}),
            title: ko.observable('Waterfront Station'),
            icon: 'icons/metro.png'
        },
        {
            position: ko.observable({lat: 49.28191619790829, lng: -123.12440156936646}),
            title: ko.observable('Scotiabank Theatre'),
            icon: 'icons/movie-theater.png'
        },
        {
            position: ko.observable({lat: 49.30313206596573, lng: -123.14369201660156}),
            title: ko.observable('Stanley Park'),
            icon: 'icons/park.png'
        },
        {
            position: ko.observable({lat: 49.282742, lng: -123.121097}),
            title: ko.observable('UBC Robson Square'),
            icon: 'icons/shopping-bag.png'
        },
        {
            position: ko.observable({lat: 49.28631126335739, lng: -123.14348816871643}),
            title: ko.observable('English Bay Beach'),
            icon: 'icons/beach.png'
        },
        {
            position: ko.observable({lat: 49.27783571484951, lng: -123.10882329940796}),
            title: ko.observable('Rogers Arena'),
            icon: 'icons/stadium.png'
        },
        {
            position: ko.observable({lat: 49.283511903907026, lng: -123.11758875846863}),
            title: ko.observable('CF Pacific Centre'),
            icon: 'icons/shopping-mall.png'
        },
        {
            position: ko.observable({lat: 49.28794531597201, lng: -123.1131899356842}),
            title: ko.observable('Canada Place'),
            icon: 'icons/point-of-interest.png'
        },
        {
            position: ko.observable({lat: 49.27979550871238, lng: -123.115673661232}),
            title: ko.observable('Vancouver Public Library'),
            icon: 'icons/library.png'
        },
        {
            position: ko.observable({lat: 49.276694, lng: -123.111998}),
            title: ko.observable('BC Place'),
            icon: 'icons/field.png'
        },
        {
            position: ko.observable({lat: 49.273376893694476, lng: -123.10383439064026}),
            title: ko.observable('Science World'),
            icon: 'icons/museum.png'
        },
        {
            position: ko.observable({lat: 49.277615233166564, lng: -123.12720715999603}),
            title: ko.observable('Tim Hortons'),
            icon: 'icons/cafe.png'
        }
    ])

};