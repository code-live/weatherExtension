function fetch_feed() {
  if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    } else {
        alert('geolocation not supported by this browser');
    }
}
function setPosition(position){
  var x = position.coords.latitude;
  var y = position.coords.longitude;
  chrome.extension.sendRequest({'action' : 'fetch_feed', 'url' : 'http://api.openweathermap.org/data/2.5/weather?lat='+x+'&lon='+y+'&appid=802d294ec0d726756500b259f847a2bc'}, 
    function(response) {
      var responseData;
      if(response){
          responseData = JSON.parse(response);
      }
      display_stories(responseData);
    }
  );
}
function changeTime(time){
  var value = new Date(0); // The 0 there is the key, which sets the date to the epoch
  value.setUTCSeconds(time);
  value = value.toLocaleTimeString();
  return value;
}
function changeDate(date){
  var value = new Date(0); // The 0 there is the key, which sets the date to the epoch
  value.setUTCSeconds(date);
  value = value.toDateString();
  return value;
}
function display_stories(feed_data) {
  var item = null;
  var icon = 'http://openweathermap.org/img/w/' + feed_data.weather[0].icon + '.png'; 
  item = '<div style="width:200px;text-align: center;">\
          <h1 style="margin-bottom:0px;text-align:center;color:blue">Daily Weather</h1>\
          <h2>City:<span style="color:forestgreen;">' + feed_data.name + '</span></h2>\
          <h2>Date:<span style="color:forestgreen;">' + changeDate(feed_data.dt) + '</span></h2>\
          <h2><p>\
      <span style="color:forestgreen;">' + feed_data.weather[0].description + '</span>\
      <img src="'+ icon +'" style="height:35px;width: 35px;vertical-align: top;"></p>\
    </h2>\
    <p>\
      <b>Min</b>:<span style="color:forestgreen;">' + (feed_data.main.temp_max - 273.15).toFixed(2) + 'C' + '</span>\
      <b>Max</b>:<span style="color:forestgreen;">' + (feed_data.main.temp_min - 273.15).toFixed(2) + 'C' + '</span>\
    </p>\
    <p>\
      <b>Humidity:</b><span style="color:forestgreen;">' + feed_data.main.humidity + '%</span>\
    </p>\
    <p>\
      <b>Sun Rise:</b><span style="color:forestgreen;">' + changeTime(feed_data.sys.sunrise) + ' AM</span>\
    </p>\
    <p>\
      <b>Sun Set:</b><span style="color:forestgreen;">' + changeTime(feed_data.sys.sunset) + ' PM</span>\
    </p>';

    $('#data').append(item);
}

$(document).ready(function() {
  fetch_feed();
});
