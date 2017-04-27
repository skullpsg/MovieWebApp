'use strict';
MovieAppSPA.controller('editMovieTemplateController', ['$scope', '$location', 'data', 'bladeService', 'movieService', 'trim', function ($scope, $location, data, bladeService, movieService, trim) {
    $scope.enable = false;
    $scope.movie = data;

    $scope.movie.Languages = [{ Name: 'English' }, { Name: 'French' }];
    $scope.movie.Genres = [{ Name: 'Comedy' }, { Name: 'Drama' }, { Name: 'Adventure' }];
    $scope.movie.Runtimes = [{ Name: '90' }, { Name: '120' }];
    $scope.movie.Years = [{ value: '2000' }, { value: '2001' }, { value: '2002' }, { value: '2003' }, { value: '2004' }, { value: '2005' }, { value: '2006' }, { value: '2007' }, { value: '2008' }, { value: '2009' }, { value: '2010' }, { value: '2011' }, { value: '2012' }, { value: '2013' }];

    $scope.movie.SelectedLang = $.grep($scope.movie.Languages, function (element, index) {
        return element.Name == trim(data.Language);
    })[0];

    $scope.movie.SelectedGenre =
        $.grep($scope.movie.Genres, function (element, index) {
            return element.Name == trim(data.Genre);
        })[0];

    $scope.movie.SelectedRuntime =
        $.grep($scope.movie.Runtimes, function (element, index) {
            return element.Name == trim(data.Runtime);
        })[0];

    $scope.movie.SelectedYear =
        $.grep($scope.movie.Years, function (element, index) {
            return element.value == trim(data.Year);
        })[0];

    $scope.$watch('movie.SelectedGenre.Name', function () {      
        $scope.movie.Genre = $scope.movie.SelectedGenre.Name;
        if ($scope.form.AddOrEditmovie !== undefined)
            $scope.enable = $scope.form.AddOrEditmovie.$valid;
    });
    $scope.$watch('movie.SelectedYear.value', function () {     
        $scope.movie.Yesr = $scope.movie.SelectedYear.value;
        if ($scope.form.AddOrEditmovie !== undefined)
            $scope.enable = $scope.form.AddOrEditmovie.$valid;
    });
    $scope.$watch('movie.SelectedRuntime.Name', function () {      
        $scope.movie.Runtime = $scope.movie.SelectedRuntime.Name;
        if ($scope.form.AddOrEditmovie !== undefined)
            $scope.enable = $scope.form.AddOrEditmovie.$valid;
    });
    $scope.$watch('movie.SelectedLang.Name', function () {
        $scope.movie.Language = $scope.movie.SelectedLang.Name;
        if ($scope.form.AddOrEditmovie !== undefined)
            $scope.enable = $scope.form.AddOrEditmovie.$valid;
    });


    $scope.form = {};

    $scope.$watch('movie.Title', function () {
        if ($scope.form.AddOrEditmovie !== undefined)
            $scope.enable = $scope.form.AddOrEditmovie.$valid;
    });

    $scope.$watch('movie.imdbRating', function () {
        if ($scope.form.AddOrEditmovie !== undefined)
            $scope.enable = $scope.form.AddOrEditmovie.$valid;
    });


    $scope.BladeOperation = function () {
        bladeService.Close();

        //$scope.movie.Language = $scope.movie.SelectedLang.Name;
        //$scope.movie.Genre = $scope.movie.SelectedGenre.Name;
        //$scope.movie.Runtime = $scope.movie.SelectedRuntime.Name;
        //$scope.movie.Yesr = $scope.movie.SelectedYear.value;      

        movieService.UpdateMovie($scope.movie).then(function (successData) {
            bladeService.CallBack(data.CurrentValue);
        }, function (errorData) {
            alert(error.data.message);
        });

    };
}]);