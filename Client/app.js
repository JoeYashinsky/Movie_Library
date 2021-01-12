$(function () {
    $.get("https://localhost:44325/api/movie", function (data) {

        data.map(element => {
            $('#response pre').append(`<div><div>Title: ${element.title} Director: ${element.director} Genre: ${element.genre}</div></div`)
        });
        data.map(element => {
            $('#currentMovies').append(`<li><a onClick="generateUpdateForm(${element.movieId})">${element.title}</a></li> `)
        });
        data.map(element => {
            $('#currentMoviesDelete').append(`<li><a onClick="confirmDelete(${element.movieId})">${element.title}</a></li> `)
        });
    })

})

function generateUpdateForm(currentMovieID) {
    $.get("https://localhost:44325/api/movie/" + currentMovieID, function (data) {

        $('#updateMovie').html(`
            <div class="form-group">
                <input type="hidden" class="form-control" id="movieID" name="movieId" value="${data.movieId}">
                <input type="text" class="form-control" id="title" name="title" value="${data.title}">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="director" name="director" value="${data.director}">
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="genre" name="genre" value="${data.genre}">
            </div>
            <button type="submit" class="btn btn-purple-light">Update</button>`)
    })
}

(function () {
    function update_Movie(currentMovie) {
        var dict = {
            MovieId: parseInt(this["movieId"].value),
            Title: this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function (data, textStatus, jQxhr) {
                $('#updateMovie').html(`<br>
                <div class="alert alert-purple" role="alert">
                    Thanks for updating ${data.title} to the best list of movies on this side of the Mississippi!
                </div>`);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }

    $('#updateMovie').on('submit', function (e) {
        e.preventDefault();
    });
    $('#updateMovie').submit(update_Movie);
})(jQuery);

function confirmDelete(currentMovieID) {
    $.get("https://localhost:44325/api/movie/" + currentMovieID, function (data) {

        $('#deleteMovie').append(`
        <h4>Do you want to permanetly delete: <strong>${data.title}</strong></h4>
        <input type="hidden" class="form-control" id="movieID" name="movieId" value="${data.movieId}">
        <input type="hidden" class="form-control" id="title" name="title" value="${data.title}">
        <input type="hidden" class="form-control" id="director" name="director" value="${data.director}">
        <input type="hidden" class="form-control" id="genre" name="genre" value="${data.genre}">
        <button type="submit" class="btn btn-purple-light">Confirm</button>`)
    })
}

(function ($) {
    function delete_Movie(deletedMovieId) {
        $.ajax({
            url: 'https://localhost:44325/api/movie/' + parseInt(this["movieId"].value),
            dataType: 'json',
            type: 'delete',
            contentType: 'application/json',
            success: function (data, textStatus, jQxhr) {
                $('#deleteMovie').html(`<br>
                    <div class="alert alert-purple" role="alert">
                        Thanks for deleting ${data.title} movie!
                    </div>`);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    }

    $('#deleteMovie').on('submit', function (e) {
        e.preventDefault();
    });
    $('#deleteMovie').submit(delete_Movie);
})(jQuery);


(function ($) {
    function processForm(e) {
        var dict = {
            Title: this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function (data, textStatus, jQxhr) {
                $('#successAdd').html(`<br>
                    <div class="alert alert-purple" role="alert">
                        Thanks for adding ${data.title} to the best list of movies on this side of the Mississippi!
                    </div>`);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    }

    $('#addMovie').submit(processForm);

})(jQuery);

function searchByMovieDetails(movies) {
    let movieSearch = prompt("Which movie detail would you like to search by? You can select title, director, or genre", chars);
  
    let searchResults;
    switch (movieSearch) {
      case "title":
        searchResults = searchByTitle(movies);
        break;
      case "director":
        searchResults = searchByDirector(movies);
        break;
      case "genre":
        searchResults = searchByGenre(movies);
        break;
      default:
        alert("Not a valid input");
        searchByMovieDetails(movies);
        break;
    }
    
    return searchResults;
  }

  function searchByTitle(movies) {
    let title = prompt("What is the name of the film?", chars).toLowerCase();
  
    let foundMovie = movies.filter(function (movie) {
      if (movie.Title == title.toLowerCase()) {
        return true;
      }
      else {
        return false;
      }
    });
  
    return foundMovie;
  }

  function searchByDirector(movie) {
    let director = prompt("What is the director's name?", chars).toLowerCase();
  
    let foundDirector = movies.filter(function (movie) {
      if (movie.Director === director.toLowerCase()) {
        return true;
      }
      else {
        return false;
      }
    });
  
    return foundDirector;
  }

  function searchByGenre(movie) {
    let genre = prompt("What is the film's genre?", chars).toLowerCase();
  
    let foundGenre = movies.filter(function (movie) {
      if (movie.Genre === genre.toLowerCase()) {
        return true;
      }
      else {
        return false;
      }
    });
  
    return foundGenre;
  }
