'use strict';
MovieAppSPA.factory('movieService', ['$rootScope', '$q', '$http', 'apiServiceBaseUri', function ($rootScope, $q, $http, apiServiceBaseUri) {
    var serviceBaseUrl = apiServiceBaseUri;
    var MovieserviceFactory = {};

    var _getMovies = function (fromCount) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: serviceBaseUrl + 'api/Movies/' + fromCount,
        }).
        success(function (data, status, headers, config) {
            return deferred.resolve(data);
        }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });
        return deferred.promise;
    };

    var _addMovie = function (movie) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            data: movie,
            url: serviceBaseUrl + 'api/Movies/Add',
        }).
        success(function (data, status, headers, config) {
            return deferred.resolve(data);
        }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });
        return deferred.promise;
    };

    var _updateMovie = function (movie) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            data: movie,
            contentType: "application/json; charset=utf-8",
            url: serviceBaseUrl + 'api/Movies/Update',
        }).
        success(function (data, status, headers, config) {
            return deferred.resolve(data);
        }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });
        return deferred.promise;
    };


    var _deleteMoviesById = function (movieId) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: serviceBaseUrl + 'api/Movies/Delete/' + movieId,
        }).
        success(function (data, status, headers, config) {
            return deferred.resolve(data);
        }).
         error(function (data, status, headers, config) {
             deferred.reject(data);
         });
        return deferred.promise;
    };

    MovieserviceFactory.GetMovies = _getMovies;
    MovieserviceFactory.AddMovie = _addMovie;
    MovieserviceFactory.UpdateMovie = _updateMovie;
    MovieserviceFactory.DeleteMoviesById = _deleteMoviesById;

    return MovieserviceFactory;
}]);