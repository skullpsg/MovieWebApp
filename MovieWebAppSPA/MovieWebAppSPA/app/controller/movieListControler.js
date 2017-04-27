'use strict';
MovieAppSPA.controller('movieListControler', ['$scope', '$location', 'movieService', 'bladeService', 'BladeModel', 'Movie', "trim", function ($scope, $location, movieService, bladeService, BladeModel, Movie, trim) {
    $scope.movie = 'Testing';
    var _current = 0;
    $scope.movieList = new kendo.data.ObservableArray([]);
    $scope.currentMovieList = new kendo.data.ObservableArray([]);
    var temp = new kendo.data.ObservableArray([]);
    var tempTitle = new kendo.data.ObservableArray([]);
    $scope.isLoading = false;

    $scope.title = "";

    var dropDownObject = function (_name) {
        this.Name = _name;
    }

    $scope.Genres = [];

    $scope.$watch('SelectedGenre.Name + title', function () {
        temp.empty();
        //Genre filter
        if ($scope.SelectedGenre != null && $scope.SelectedGenre != undefined) {
            if ($scope.SelectedGenre.Name != "All") {
                $.each($scope.currentMovieList, function (index, value) {
                    if (trim(value.Genre) == $scope.SelectedGenre.Name)
                        temp.push(value);
                });
            }
            else {
                temp.push.apply(temp, $scope.currentMovieList);
            }
        }

        //Title filter followed by genre
        if ($scope.title != '' && $scope.title != null && $scope.title != undefined) {
            if (temp.length == 0) {
                $.each($scope.currentMovieList, function (index, value) {
                    if (trim(value.Genre) == $scope.SelectedGenre.Name)
                        temp.push(value);
                });
            }
            else {
                tempTitle.empty();
                $.each(temp, function (index, value) {
                    if (trim(value.Title).indexOf($scope.title) > -1)
                        tempTitle.push(value);
                });
                temp.empty();
                temp.push.apply(temp, tempTitle);
            }
        }

        $scope.movieList.empty();
        $scope.movieList.push.apply($scope.movieList, temp);
    });

    var getmoviesList = function (from) {
        $scope.isLoading = true;
        $scope.movieList.empty();
        $scope.Genres = [];
        $scope.currentMovieList.empty();
        movieService.GetMovies(from).then(function (data) {
            $.each(data, function (index, value) {
                $scope.movieList.push(value);
                $scope.currentMovieList.push(value);
                if ($scope.Genres.length == 0) {
                    $scope.Genres.push(new dropDownObject(trim("All")));
                    $scope.Genres.push(new dropDownObject(trim(value.Genre)));
                }
                else {
                    var isExist = false;
                    $.each($scope.Genres, function (index, genre) {
                        if (trim(value.Genre) == genre.Name) {
                            isExist = true;
                            return false;
                        }
                    });
                    if (!isExist) {
                        $scope.Genres.push(new dropDownObject(trim(value.Genre)));
                    }
                }
            });
            $scope.isLoading = false;
        }, function (error) {
            $scope.isLoading = false;
            //alert(error.data.message);
        });
    };

    $scope.Next = function () {
        _current += 20;
        getmoviesList(_current);
    }

    $scope.Prev = function () {
        if (_current - 20 >= 0)
            _current -= 20;
        getmoviesList(_current);
    }

    $scope.addMovie = function () {
        var bladeModel = new BladeModel();
        bladeModel.InstanceId = 'Add movie';
        bladeModel.Title = 'Add movie';
        bladeModel.ActionText = 'ADD';
        bladeModel.Templates = ['app/views/addmovieTemplate.html'];
        bladeModel.Controller = 'addMovieTemplateController';
        bladeModel.Width = 600;
        bladeModel.Data = new Movie();
        bladeModel.Data.CurrentValue = _current;
        bladeModel.Callback = getmoviesList;
        bladeModel.ExcludedFooterElements = [{ Element: [] }];
        bladeService.showBlade(bladeModel);
    }

    $scope.MovieGrid = {
        dataSource: new kendo.data.DataSource({
            data: $scope.movieList,
        }),
        sortable: {
            mode: "single",
            allowUnsort: false
        },
        noRecords: {
            template: "No data Found."
        },
        resizable: true,
        autoSync: true,
        columns: [
            { field: "Id", title: "Id", sortable: true },
            { field: "Runtime", title: "Runtime", sortable: true },
            { field: "Genre", title: "Genre", sortable: true },
            { field: "", title: "Language" },
             { field: "", title: "imdbRating" },
              { field: "", title: "Title" },
               { field: "", title: "Year" },
             { field: "", title: "" },
        ],

        rowTemplate: kendo.template($("#movieListDetailsTemplate").html()),
    };

    $scope.EditMovie = function (_movie) {
        var bladeModel = new BladeModel();
        bladeModel.InstanceId = 'Edit movie';
        bladeModel.Title = 'Edit movie';
        bladeModel.ActionText = 'Update';
        bladeModel.Templates = ['app/views/addmovieTemplate.html'];
        bladeModel.Controller = 'editMovieTemplateController';
        bladeModel.Width = 600;
        bladeModel.Data = _movie;
        bladeModel.Data.CurrentValue = _current;
        bladeModel.Callback = getmoviesList;
        bladeModel.ExcludedFooterElements = [{ Element: [] }];
        bladeService.showBlade(bladeModel);
    }

    $scope.DeleteMovie = function (_movie) {
        movieService.DeleteMoviesById(_movie.Id).then(function (data) {
            getmoviesList(_current);
        }, function (error) {
            alert(error.data.message);
        });
    }

    getmoviesList(_current);
}]);