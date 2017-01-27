var appServices = angular.module('appServices', []);

appServices.service('dataService', function($http) {
    this.getData = (path) => {
        return $http.get(path); // this will return a promise to controller
    }
    this.sendData = (path, data) => {
        return $http.post(path, data);
    }
});
