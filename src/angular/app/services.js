var appServices = angular.module('appServices', []);

appServices.service('dataService', function($http) {
    this.getData = (path) => {
        return $http.get(path); // this will return a promise to controller
    }
    this.sendData = (path, data) => {
        return $http.post(path, data);
    }
});

appServices.service('reservationService', function() {
    this.data = {};

    return {
        getData: () => {
            return this.data;
        },
        setData: (data) => {
            this.data = data;
        },
        addElement: (element) => {
            if(this.data[element] == undefined || this.data[element] == 0){
                this.data[element] = 1;
            } else {
                this.data[element]++;
            }
        },
        removeElement: (element) => {
            this.data[element]--;
            if(this.data[element] <= 0){
                delete this.data[element];
            }
        }
    }
})

appServices.factory('socket', ['$rootScope', function ($rootScope) {
    var socket = io.connect('http://localhost');

    return {
        on: function (eventName, callback) {
            function wrapper() {
            var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            }

            socket.on(eventName, wrapper);

            return function () {
            socket.removeListener(eventName, wrapper);
            };
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
}]);
