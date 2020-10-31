let d = new Date();
let newDate = d.getDate() + "." + d.getMonth() + "." + d.getFullYear();

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
let zipCode = "Cairo, eg";

const key = "&units=metric&appid=768a9c47bdbec799a01f85c9a271f31b";
const skycons = new Skycons({ color: "white" });
let icon_code = '01';
//let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
//
const list = {
    "01": "clear-day",
    "02": "partly-cloudy-day",
    "03": "cloudy",
    "04": "cloudy",
    "09": "rain",
    "10": "rain",
    "13": "snow",
    "50": "fog",
};

//
//selector
const search_box = document.querySelector(".search-box");
const loc = document.querySelector(".location");
const date = document.querySelector(".date");
const temp = document.querySelector(".temp");
const weather = document.querySelector(".weather");
const icon1 = document.querySelector("#icon1");
//functions
const getData = async (baseUrl, zipCode, key) => {
    const res = await fetch(baseUrl + zipCode + key);
    try {
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error is ", error);
    }
};
const search = (e) => {
    if (e.key == "Enter") {
        if (search_box.value == "") {
            search_box.value = zipCode;
        } else {
            zipCode = search_box.value;
        }
        console.log(zipCode);
        getData(baseUrl, zipCode, key).then((data) => {
            updateUI(data);
        });
        search_box.value = '';
        search_box.setAttribute('placeholder', zipCode)
    }
};
const updateUI = async (data) => {
    try {
        weather.innerHTML = data.weather[0].main;
        temp.innerHTML = data.main.temp;

        loc.innerHTML = data.name + ', ' + data.sys.country;
        icon_code = data.weather[0].icon.slice(0, 2);
        skycons.set(icon1, list[icon_code]);
        skycons.play();
        let timezone = data.timezone;
        let newTime = d.getUTCHours() + (timezone / 3600) + ":" + d.getUTCMinutes();
        date.innerHTML = newDate + ',   ' + newTime;
    } catch (err) {
        console.log(err);
    }
};

//eventslistner
search_box.addEventListener("keypress", search);
date.innerHTML = newDate;
skycons.set(icon1, list[icon_code]);