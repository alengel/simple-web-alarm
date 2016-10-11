document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        var timer;
        
        startTimers(timer);
        _.delay(setAlarm, 1000);
   }
}

function startTimers(timer) {
    if(timer) {
        clearInterval(timer);
    }

    timer = window.setInterval(setTime, 1000);

}

function getCurrentTime() {
    return moment();
}

function setTime(now) {
    var time = document.getElementById('timer');
    time.textContent = getCurrentTime().format('HH:mm:ss');
}

function setAlarm() {
    var randomNumber = pickRandomNumber(),
        alarm = document.getElementById('alarm'),
        newAlarm = moment().add(randomNumber, 'seconds');
    
    checkAlarm(randomNumber);
    alarm.textContent = newAlarm.format('HH:mm:ss');
}

function pickRandomNumber() {
    return _.random(2, 60);
}

function checkAlarm(randomNumber) {
    var alarmTimer = window.setInterval(function() {
            ringAlarm();
            resetTimer(alarmTimer);
        }, randomNumber * 1000);
}

function ringAlarm() {
    var audio = new Audio('./audio/bell.mp3');
    audio.play();

    updateAlarmText();
}

function resetTimer(alarmTimer) {
    clearInterval(alarmTimer);

    _.delay(resetAlarmText, 1000);
    _.delay(setAlarm, 1000);
}

function updateAlarmText() {
    document.getElementById('alarm').className = ('alarm red');
    document.getElementById('alarm-text').textContent = 'Alarm rang at ';
}

function resetAlarmText () {
    document.getElementById('alarm').className = ('alarm');
    document.getElementById('alarm-text').textContent = 'Alarm will ring at ';
}
