using MovieWebAppAPI.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace MovieWebAppAPI
{
    public class MovieService
    {
        public string connectionString = string.Empty;
        public SqlConnection conn = null;
        public MovieService()
        {
            connectionString = ConfigurationManager.ConnectionStrings["MovieDBConnectionString"].ConnectionString.ToString();
            conn = new SqlConnection(connectionString);
        }
        public List<Movie> GetMovieList(int fromRowNum)
        {

            List<Movie> movieList = new List<Movie>();
            try
            {
                string cmdStr = "SELECT  * FROM(SELECT ROW_NUMBER() OVER(ORDER BY _MoviesToProcess.[Id]) AS RowNum, _MoviesToProcess.[Id], _MoviesToProcess.[Title] as Title, _MoviesToProcess.[Year] as _Year,[Runtime],[Genre],[Language],[imdbRating]FROM[Movies].[dbo].[MoviesToProcess] as _MoviesToProcess join[Movies].[dbo].[MoviesInfo] on _MoviesToProcess.[Id] =[Movies].[dbo].[MoviesInfo].Id ) AS RowConstrainedResult WHERE RowNum >= @fromRowNum AND RowNum <= @toRowNum ORDER BY RowNum";

                using (SqlCommand command = new SqlCommand(cmdStr, conn))
                {
                    conn.Open();
                    command.Parameters.Add(new SqlParameter("@fromRowNum", fromRowNum));
                    command.Parameters.Add(new SqlParameter("@toRowNum", fromRowNum+20));

                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            Movie Movie = new Movie();
                            Movie.Id = Convert.ToInt32(reader["Id"].ToString());
                            Movie.Runtime = reader["Runtime"].ToString();
                            Movie.Genre = reader["Genre"].ToString();
                            Movie.Language = reader["Language"].ToString();
                            Movie.imdbRating = reader["imdbRating"].ToString();
                            Movie.Title = reader["Title"].ToString();
                            Movie.Year = reader["_Year"].ToString();
                            movieList.Add(Movie);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                movieList = new List<Movie>();
            }
            finally
            {
                conn.Close();
            }
            return movieList;
        }

        public Movie AddMovie(Movie movie)
        {
            movie.Id = GetIDMoviesToProcess();
            insertIntoMoviesToProcess(movie);
            insertIntoMoviesInfo(movie);
            // movie.Id = GetIDMoviesToProcess(movie.Title);
            return movie;
        }

        public Movie UpdateMovie(Movie movie)
        {
            UpdateIntoMoviesToProcess(movie);
            UpdateIntoMoviesInfo(movie);
            return movie;
        }

        public bool DeleteMovieById(int id)
        {

            return DeletefromMoviesInfo(id) &&
               DeletefromMoviesToProcess(id);
        }

        private bool insertIntoMoviesToProcess(Movie Movie)
        {
            bool result = false;
            try
            {
                string cmdStr = "Insert into [MoviesToProcess] values(@title,@year)";

                using (SqlCommand command = new SqlCommand(cmdStr, conn))
                {
                    conn.Open();
                    // command.Parameters.Add(new SqlParameter("@id", Movie.Id));
                    command.Parameters.Add(new SqlParameter("@title", Movie.Title));
                    command.Parameters.Add(new SqlParameter("@year", Movie.Year));

                    result = command.ExecuteNonQuery() > 0;
                }
            }
            catch (Exception ex)
            {

            }
            finally
            {
                conn.Close();
            }
            return result;
        }
        private bool insertIntoMoviesInfo(Movie Movie)
        {
            bool result = false;
            try
            {
                string cmdStr = " Insert into [Movies].[dbo].[MoviesInfo](id,runtime,genre,[language],imdbRating) values(@id,@runtime,@genre,@language,@imdbRating)";

                using (SqlCommand command = new SqlCommand(cmdStr, conn))
                {
                    conn.Open();
                    command.Parameters.Add(new SqlParameter("@id", Movie.Id));
                    command.Parameters.Add(new SqlParameter("@runtime", Movie.Runtime));
                    command.Parameters.Add(new SqlParameter("@genre", Movie.Genre));
                    command.Parameters.Add(new SqlParameter("@language", Movie.Language));
                    command.Parameters.Add(new SqlParameter("@imdbRating", Movie.imdbRating));
                    result = command.ExecuteNonQuery() > 0;
                }
            }
            catch (Exception ex)
            {

            }
            finally
            {
                conn.Close();
            }
            return result;
        }
        private bool UpdateIntoMoviesToProcess(Movie Movie)
        {
            bool result = false;
            try
            {
                string cmdStr = "Update [MoviesToProcess] set Title=@title,Year=@year where Id=@id";

                using (SqlCommand command = new SqlCommand(cmdStr, conn))
                {
                    conn.Open();
                    command.Parameters.Add(new SqlParameter("@id", Movie.Id));
                    command.Parameters.Add(new SqlParameter("@title", Movie.Title));
                    command.Parameters.Add(new SqlParameter("@year", Movie.Year));

                    result = command.ExecuteNonQuery() > 0;
                }
            }
            catch (Exception ex)
            {

            }
            finally
            {
                conn.Close();
            }
            return result;
        }
        private bool UpdateIntoMoviesInfo(Movie Movie)
        {
            bool result = false;
            try
            {
                string cmdStr = "Update [MoviesInfo] SEt Runtime=@runtime,Genre=@genre,Language=@language,imdbRating=@imdbRating where Id=@id";

                using (SqlCommand command = new SqlCommand(cmdStr, conn))
                {
                    conn.Open();
                    command.Parameters.Add(new SqlParameter("@id", Movie.Id));
                    command.Parameters.Add(new SqlParameter("@runtime", Movie.Runtime));
                    command.Parameters.Add(new SqlParameter("@genre", Movie.Genre));
                    command.Parameters.Add(new SqlParameter("@language", Movie.Language));
                    command.Parameters.Add(new SqlParameter("@imdbRating", Movie.imdbRating));
                    result = command.ExecuteNonQuery() > 0;
                }
            }
            catch (Exception ex)
            {

            }
            finally
            {
                conn.Close();
            }
            return result;
        }
        private bool DeletefromMoviesInfo(int id)
        {
            bool result = false;
            try
            {
                string cmdStr = "delete from [MoviesInfo] where Id=@id";

                using (SqlCommand command = new SqlCommand(cmdStr, conn))
                {
                    conn.Open();
                    command.Parameters.Add(new SqlParameter("@id", id));

                    result = command.ExecuteNonQuery() > 0;
                }
            }
            catch (Exception ex)
            {

            }
            finally
            {
                conn.Close();
            }
            return result;
        }
        private bool DeletefromMoviesToProcess(int id)
        {
            bool result = false;
            try
            {
                string cmdStr = "delete from [MoviesToProcess] where Id=@id";

                using (SqlCommand command = new SqlCommand(cmdStr, conn))
                {
                    conn.Open();
                    command.Parameters.Add(new SqlParameter("@id", id));

                    result = command.ExecuteNonQuery() > 0;
                }
            }
            catch (Exception ex)
            {

            }
            finally
            {
                conn.Close();
            }
            return result;
        }
        private int GetIDMoviesToProcess()
        {
            bool result = false;
            var count = 0;
            try
            {
                string cmdStr = "select Max(ID) as MoviesToProcessCount from [MoviesToProcess]";

                using (SqlCommand command = new SqlCommand(cmdStr, conn))
                {
                    conn.Open();
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        reader.Read();
                        count = Convert.ToInt32(reader["MoviesToProcessCount"].ToString());
                    }
                }
            }
            catch (Exception ex)
            {

            }
            finally
            {
                conn.Close();
            }
            return count + 1;
        }

    }
}