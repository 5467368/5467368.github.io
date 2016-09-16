(function() {

// var cityList = [
//
//      {
//         "coord": {
//             "lon": 145.77,
//             "lat": -16.92
//         },
//         "weather":[{
//             "id":803,
//             "main":"Clouds",
//             "description":"broken clouds",
//             "icon":"04n"
//         }],
//         "base":"cmc stations",
//         "main":{
//             "temp":293.25,
//             "pressure":1019,
//             "humidity":83,
//             "temp_min":289.82,
//             "temp_max":295.37
//         },
//         "wind":{
//             "speed":5.1,
//             "deg":150
//         },
//         "clouds":{"all":75},
//         "rain":{"3h":3},
//         "dt":1435658272,
//         "sys":{
//             "type":1,
//             "id":8166,
//             "message":0.0166,
//             "country":"AU",
//             "sunrise":1435610796,
//             "sunset":1435650870
//         },
//         "id":2172797,
//         "name":"Cairns",
//         "cod":200
//     }
//
// ];





// function loadJSON() {
//     cList = JSON.parse(localStorage.getItem('cityList'));
// };

// var cList = cityList;

var app = angular.module('weatherManager', []);

    app.factory('getNewWeather', function ($http) {
        return {
            getWeatherByName: function (name) {
                return (
                    $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + name + '&units=metric&lang=ru&APPID=e0eaea3ec4d3f4f6451cc6bd3e2102de')
                        .then(
                            function (response) {
                                return response.data;
                            },
                            function (data, status) {
                                return null;
                            })
                );
            },
            getWeatherByID: function (id) {
                return (
                    $http.get('http://api.openweathermap.org/data/2.5/weather?id=' + id + '&units=metric&lang=ru&APPID=e0eaea3ec4d3f4f6451cc6bd3e2102de')
                        .then(
                            function (response) {
                                return response.data;
                            },
                            function (data, status) {
                                return null;
                            })
                );
            }
        };
    });

app.controller('mainController', function (getNewWeather, $scope, $http, $interval) {

    var self = this;
    var cList = [];
    this.list = [];
    this.searchByCityName = '';
    this.newCityWeather = {};
    this.newCity = {};
    this.reverse = false;

    this.saveJSON = function () {
        localStorage.setItem('cityList', JSON.stringify(this.list));
    };

    this.loadJSON = function () {
        cList = JSON.parse(localStorage.getItem('cityList'));
    };

    this.searchCity = function () {

        getNewWeather.getWeatherByName(self.searchByCityName).then(function (data) {
            if (!data) {
                alert('Can not load weather!');
                return;
            }
            self.newCity = data;
        });
    };

    this.roundWeather = function (city) {
        city.main.temp = Math.round(city.main.temp);
        city.main.temp_min = Math.round(city.main.temp_min);
        city.main.temp_max = Math.round(city.main.temp_max);
        city.wind.speed = Math.round(city.wind.speed);
        return city;
    };

    this.addNewCity = function (city) {
        if (this.list) {
            for (var i in this.list) {
                if (this.list[i].name == this.newCity.name) {
                    alert ('Этот город уже есть в списке!');
                    return;
                }
            }
        }
        this.roundWeather(this.newCity);
        this.newCity.cityIndex = this.list.length;
        this.list.push(this.newCity);
        this.newCity = {};
        this.saveJSON();
        return this.list;
    };

    this.removeCity = function (index) {
        this.list.splice(index, 1);
        for (var i in this.list){
            this.list[i].cityIndex = i;
        }
        this.saveJSON();
    };


    this.refreshCity = function (index) {
        var city = self.list[index].id;
        getNewWeather.getWeatherByID(city)
            .then(function (data) {
                if (!data) {
                    alert('Cannot load weather!');
                    return;
                }
                self.newCityWeather = data;
                self.roundWeather(self.newCityWeather);
                self.list[index] = self.newCityWeather;
                self.saveJSON();
            });
    };
    
    // this.sortCity = function () {
    //     this.list.sort(function (a, b) {
    //         return a.name - b.name;
    //     })
    // };

    // this.sortCity = function () {
    //     (this.reverse === true) ? this.reverse = false : this.reverse = true;
    //     // this.list[index].name = '' + this.list[index].name;
    // }
    this.refreshAll = function (list) {
        for (var i in list) {
            this.refreshCity(i);
        };
        return list;
    };

    this.weatherManagerInit = function () {

        this.loadJSON();
        if (!cList) {
            cList = [];
        }
        this.list = cList;
        this.refreshAll(this.list);     //Обновление погоды всех городов при загрузке страницы
        $interval(function () {         //Обновление погоды всех городов каждые пол часа
            this.refreshAll(this.list);
        }, 1800000);

        // for(var i in this.list){
        //     this.refreshCity(i);    //Обновление погоды всех городов при загрузке страницы
        //     $interval(function () { //Обновление погоды всех городов каждые пол часа
        //         self.refreshCity(i);
        //     }, 1800000);
        // };
    };

});

})();