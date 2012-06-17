/**
@author: Sergio Sola (ssola@beidea.es)
@description: Handle geolocation easily getting the current user position
@version: 0.1
**/
var GeoPositioning = function() {
	this.currentLat = 0;
	this.currentLon = 0;
	this.error = "";
	this.wathProcess = null;
	this.handler = null;

	// Init the geolocation system
	this.init = function() {
		if ( navigator.geolocation ) {
			navigator.geolocation.getCurrentPosition(this.receiveData, this.setErrors);
		} else {
			alert("Error: Geolocation is not available");
			return false;
		}
	}

	this.startWatching = function(handler) {
		if ( navigator.geolocation ) {
			if ( this.wathProcess == null ) {
				if ( handler != null ) {
					this.handler = handler;
				}

				this.wathProcess = navigator.geolocation.watchPosition(this.receiveData,this.setErrors);
			}
		}
	}

	this.stopWatching = function() {
		if ( this.watchProcess != null ) {
			navigator.geolocation.clearWatch(this.watchProcess);
			this.watchProcess = null;
		}
	}

	this.receiveData = function(position) {
		this.currentLon = position.coords.longitude;
		this.currentLat = position.coords.latitude;
		
		if ( this.handler != null || this.handler != undefined ) {
			this.handler(this.currentLat, this.currentLon);
		}
	}

	this.setErrors = function(error) {
		if ( error ) {
			switch ( error.code ) {
				case error.PERMISSION_DENIED: this.error = "PERMISSION_DENIED";
				break;
				case error.POSITION_UNAVAILABLE: this.error = "POSITION_UNAVAILABLE";
				break;
				case error.TIMEOUT: this.error = "TIMEOUT";
				break;
			}
		}
	}

	this.getLat = function() {
		return this.currentLat;
	}

	this.getLon = function() {
		return this.currentLon;
	}

	this.getError = function() {
		return this.error;
	}
}