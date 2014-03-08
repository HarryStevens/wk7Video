function initialize() {
	google.maps.visualRefresh = true;
	var isMobile = (navigator.userAgent.toLowerCase().indexOf('android') > -1) || (navigator.userAgent.match(/(iPod|iPhone|iPad|BlackBerry|Windows Phone|iemobile)/));
	if (isMobile) {
		var viewport = document.querySelector("meta[name=viewport]");
		viewport.setAttribute('content', 'initial-scale=1.0, user-scalable=no');
	}
	var mapDiv = document.getElementById('googft-mapCanvas');
	mapDiv.style.width = isMobile ? '100%' : '100&';
	mapDiv.style.height = isMobile ? '100%' : '100%';
	var map = new google.maps.Map(mapDiv, {
		center : new google.maps.LatLng(50, 20),
		zoom : 4,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	});
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('googft-legend-open'));
	map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(document.getElementById('googft-legend'));

	var style = [{
		featureType : 'all',
		elementType : 'all',
		stylers : [{
			saturation : -45
		}]
	}];
	var styledMapType = new google.maps.StyledMapType(style, {
		map : map,
		name : 'Styled Map'
	});
	map.mapTypes.set('map-style', styledMapType);
	map.setMapTypeId('map-style');

	layer = new google.maps.FusionTablesLayer({
		map : map,
		heatmap : {
			enabled : false
		},
		query : {
			select : "col9\x3e\x3e1",
			from : "1Qnx3b_cB9jVnU-I2aoudMJQAz9s5L8m2pZXHTFd8",
			where : ""
		},
		options : {
			styleId : 2,
			templateId : 2
		}
	});

	if (isMobile) {
		var legend = document.getElementById('googft-legend');
		var legendOpenButton = document.getElementById('googft-legend-open');
		var legendCloseButton = document.getElementById('googft-legend-close');
		legend.style.display = 'none';
		legendOpenButton.style.display = 'block';
		legendCloseButton.style.display = 'block';
		legendOpenButton.onclick = function() {
			legend.style.display = 'block';
			legendOpenButton.style.display = 'none';
		}
		legendCloseButton.onclick = function() {
			legend.style.display = 'none';
			legendOpenButton.style.display = 'block';
		}
	}
}

google.maps.event.addDomListener(window, 'load', initialize);
