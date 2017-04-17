(function() {

    var app = angular.module('weatherManager', []);

    app.directive('searchTemplate', function () {
        return {
            restrict: 'E',
            templateUrl: 'tmpls/search.htm',
            replace: true
        }
    });

    app.directive('searchResult', function () {
        return {
            restrict: 'C',
            templateUrl: 'tmpls/srchres.htm',
            replace: false
        }
    });

    app.directive('filterInput', function () {
        return {
            restrict: 'C',
            templateUrl: 'tmpls/filter.htm',
            replace: false
        }
    });

    app.directive('cityList', function () {
        return {
            restrict: 'C',
            templateUrl: 'tmpls/citylist.htm',
            replace: false
        }
    });

    app.factory('weatherService', function ($http) {
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

    app.factory('localStorageService',  ['$window', function ($window) {
        return {
            loadJSON : function () {
                return JSON.parse($window.localStorage['cityList']);
            },
            saveJSON : function (list) {
                $window.localStorage['cityList'] = JSON.stringify(list || null);
            }
        };
    }]);

    app.controller('mainController', function (weatherService, localStorageService, $scope, $http, $interval) {

        var self = this;
        this.cities = [];
        this.searchByCityName = '';
        this.newCityWeather = {};
        this.newCity = {};
        this.reverse = false;

        this.searchCity = function () {

            weatherService.getWeatherByName(self.searchByCityName)
                .then(function (data) {
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

        this.addNewCity = function () {
            if (this.cities) {
                for (var i=0;  i<this.cities.length; i++) {
                    if (this.cities[i].name === this.newCity.name) {
                        alert ('Этот город уже есть в списке!');
                        return;
                    }
                }
            }
            this.roundWeather(this.newCity);
            this.newCity.cityIndex = this.cities.length;
            this.cities.push(this.newCity);
            this.newCity = {};
            localStorageService.saveJSON(this.cities);
            return this.cities;
        };

        this.removeCity = function (index) {
            this.cities.splice(index, 1);
            for (var i=0;  i<this.cities.length; i++){
                this.cities[i].cityIndex = i;
            }
            localStorageService.saveJSON(this.cities);
        };


        this.refreshCity = function (index) {

            var city = self.cities[index].id;

            weatherService.getWeatherByID(city)
                .then(function (data) {
                    if (!data) {
                        alert('Cannot load weather!');
                        return;
                    }
                    self.newCityWeather = data;
                    self.roundWeather(self.newCityWeather);
                    self.cities[index] = self.newCityWeather;
                    self.cities[index].index = index;
                    localStorageService.saveJSON(self.cities);
                });
        };

        // this.sortCity = function () {
        //     self.cities.sort(function (a, b) {
        //         return a.name - b.name;
        //     })
        // };

        // this.sortCity = function () {
        //     (this.reverse === true) ? this.reverse = false : this.reverse = true;
        //     // self.cities[index].name = '' + self.cities[index].name;
        // }
        this.refreshAll = function (list) {
            for (var i=0; i<list.length; i++) {
                this.refreshCity(i);
            }
            return list;
        };

        this.weatherManagerInit = function () {

            var cList = localStorageService.loadJSON();
            if (!cList) {
                cList = [];
            }
            self.cities = cList;
            this.refreshAll(self.cities);     //Обновление погоды всех городов при загрузке страницы
            $interval(function () {         //Обновление погоды всех городов каждые пол часа
                this.refreshAll(self.cities);
            }, 1800000);
         };
    });

})();