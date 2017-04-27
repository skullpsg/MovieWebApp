using MovieWebAppAPI.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace MovieWebAppAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MovieListController : ApiController
    {
        MovieService MovieService = new MovieService();

        [HttpGet]
        [Route("api/Movies/{from}")]
        public List<Movie> GetMovieList(string from)
        {
            List<Movie> movieList = new List<Movie>();
            int fromCount = Convert.ToInt32(from);
            movieList = MovieService.GetMovieList(fromCount);

            return movieList;
        }

        [HttpPost]
        [Route("api/Movies/Add")]
        public Movie AddMovie(Movie movie)
        {
            return MovieService.AddMovie(movie);
        }

        [HttpPost]
        [Route("api/Movies/Update")]
        public Movie UpdateMovie(Movie movie)
        {
            return MovieService.UpdateMovie(movie);
        }

        [HttpGet]
        [Route("api/Movies/Delete/{id}")]
        public bool DeleteMovieById(string id)
        {
            int _id = Convert.ToInt32(id);
            return MovieService.DeleteMovieById(_id);
        }


    }
}