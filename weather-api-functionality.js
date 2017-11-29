var forcastAPI = 'https://api.darksky.net/forecast/';
var apiKey = "68814552a770cd67c3aa444c41c04bdc";
var tempUnit = "C";
var map = {"C":"celsius","F":"fahrenheit"};
var iconMap = { "clear-day":"wi-day-sunny","clear-night":"wi-night-clear","rain":"wi-day-rain-mix","snow":"wi-day-snow","sleet":"wi-day-sleet", "wind":"wi-day-windy",
				"fog":"wi-day-fog","cloudy":"wi-day-cloudy","partly-cloudy-day":"wi-day-cloudy","partly-cloudy-night":"wi-night-cloudy"}
var currentTemp;
$(document).ready(function(){
	//GEOLOCATION
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			urlLat = position.coords.latitude;
			urlLon = position.coords.longitude;
			getWeather(urlLat,urlLon);
			
		})
	}



	//OnClicks

	//Celsius button
	$("#celsius-button").click(function() {
		if($("#celsius-button").hasClass("activated") == false){ 
  			updateTemperature(currentTemp,"C"); 
  			tempUnit = "C";			
  		}	
	});

	//Fahrenheit button
	$("#fahrenheit-button").click(function() {
  		if($("#fahrenheit-button").hasClass("activated") == false){
  			updateTemperature(currentTemp,"F");	
  			tempUnit = "F";					
  		}	
		});
})

function getWeather(lat,lon){
	var urlString = forcastAPI+apiKey+ '/' + lat + ',' + lon;
	$("#city").text(urlString);
	 $.ajax({
    url: urlString, 
    dataType:"jsonp",
    success: function (result) {
    	//Temperature Box
      currentTemp = fahrenheitToCelsius(result.currently.temperature);
      updateHtmlTemperature(currentTemp,tempUnit);
    	//Icon Box
      setIcon(result.currently.icon);
      setSummary(result.currently.summary);
      showHtml();
    }
  });

}

function updateTemperature(temp,newUnit){
	var preButton = "#"+map[tempUnit]+"-button";
	var button ="#"+map[newUnit]+"-button"; 
	$(preButton).removeClass("activated");
	$(button).addClass("activated");	 
	currentTemp = temperatureConversor(temp,tempUnit,newUnit);
	updateHtmlTemperature(currentTemp,newUnit);
	}


function temperatureConversor(temp,currentUnit,desiredUnit){
	var newTemp;
	if(currentUnit == "C" && desiredUnit == "F"){
		newTemp = celsiusToFahrenheit(temp);
	}else{
		newTemp = fahrenheitToCelsius(temp);
	}
	return newTemp;
}

function celsiusToFahrenheit(temp){
	return Math.round((temp*(9/5))+32);
}

function fahrenheitToCelsius(temp){
	return Math.round((temp-32)*(5/9));
}

function updateHtmlTemperature(temp,unit){
	$("#temperature").text(temp+String.fromCharCode(176)+unit)
}

function setIcon(icon){
	$("#weather-icon").addClass(iconMap[icon]);
}

function setSummary(summary){
	$('#summary').text(summary);
}
function showHtml(){
	$(".loader").fadeOut();
	$('#weather-box').css('visibility','visible').hide().fadeIn('slow');
	$(".footer").fadeIn('slow');
}