let cities=[
    'user city',
    'Shanghai',
    'Moscow',
    'Toronto',
    'Melbourne',
    'Madrid',
    'Berlin',
    'Seoul',
    'Brussels',
    'New York',
    'London',
    'Tokyo'
]


let utc_offsets=[
    'user city',
    8, // shanghai UNCHANGED
    3, // moscow UNCHANGED
    -5, // toronto CHANGED
    +9, // melbourne CHANGED
    +1, // madrid CHANGED
    +1, // berlin CHANGED
    +9, // seoul CHANGED
    +1, // brussels CHANGED
    -5, // new_york CHANGED
    0, // london CHANGED
    +9 // tokyo UNCHANGED
]
let timeZoneLink = 'https://worldtimeapi.org/api/ip';


let times = [];
let parsedResult="";
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://worldtimeapi.org/api/ip", requestOptions)
    .then(response => response.text())
    .then(result => {
        parsedResult = JSON.parse(result);
        let indOfSlash = parsedResult["timezone"].indexOf('/')+1;
        let localRegion = parsedResult["timezone"].substring(indOfSlash);
        updateLocalRegion(localRegion);
        let localUTCOffset = parseInt(parsedResult["utc_offset"]);
        utc_offsets[0]=localUTCOffset;
        
        let localUTCTime = new Date (parsedResult["utc_datetime"]);
        for (let i=0; i<12; i++){
            let tzDifference = utc_offsets[i] * 60 + localUTCTime.getTimezoneOffset();
            let currentDate = new Date(localUTCTime.getTime() + tzDifference * 60 * 1000);
            times[i] = currentDate;
            currentDate.getTime();
            var date = currentDate.getDate();
            var hr = currentDate.getHours();
            var min = currentDate.getMinutes();
            var sec = currentDate.getSeconds();
            document.getElementById("c"+i).innerHTML+= "<br>"+ hr + ":" + min  + ":" + sec;
        }
    })
    .catch(error => console.log('error', error));

    // Time Animations
    setInterval(function(){ 
        for (let i=0; i<12; i++){
            times[i].setSeconds(times[i].getSeconds()+1);
            var hr = times[i].getHours();
            var min = times[i].getMinutes();
            var sec = times[i].getSeconds();
            document.getElementById("c"+i).innerHTML=cities[i]+ "<br>"+ hr + ":" + min  + ":" + sec;
        }
    }, 1000);

function updateLocalRegion(region){
    document.getElementById("c0").innerHTML=region;
    cities[0] = region;
}
function updateTime(time, country_index){
    document.getElementById("c"+country_index).innerHTML+=time;
}
function getTime (dateTimeString){
    return (dateTimeString.substring(11,19));
}




  


document.addEventListener("DOMContentLoaded", function() {
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.nav-link');
    const menuLength = menuItems.length;
  
    for (let i = 0; i < menuLength; i++) {
        if (menuItems[i].href === currentLocation) {
            menuItems[i].className += " active";
        }
    }
  });
  