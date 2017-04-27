using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MovieWebAppAPI.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Runtime { get; set; }
        public string Genre { get; set; }
        public string Language { get; set; }
        public string imdbRating { get; set; }
        public string Title { get; set; }
        public string Year { get; set; }
    }
}