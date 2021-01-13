$(function () {
    $.get("https://localhost:44325/api/movie", function (data) {

        data.map(element => {
            $('#currentMovies').append(`<li><a onClick="generateUpdateForm(${element.movieId})">${element.title}</a></li> `)
        });
        data.map(element => {
            $('#currentMoviesDelete').append(`<li><a onClick="confirmDelete(${element.movieId})">${element.title}</a></li> `)
        });
        data.map(element => {
            $('#libraryTable').append(`
            <tr>
                <td><strong>${element.title}</strong></td>
                <td>${element.director}</td>
                <td>${element.genre}</td>
            </tr>`)
        });
    })
})

//Sets up the user input for a movie update
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

//Put request to update a movie
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
                </div>`).delay(3000).fadeOut();
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

//Sets up the delete confirmation message
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

//Delete request to remove a movie
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
                    </div>`).delay(3000).fadeOut();
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
                $('#deleteMovie').html(`<br>
                <div class="alert alert-purple" role="alert">
                <strong>Movie Deleted!</strong> However, it didn't go down without a fight. Check the console.log for a message.
                </div>`).delay(5000).fadeOut();
            }
        });
    }

    $('#deleteMovie').on('submit', function (e) {
        e.preventDefault();
    });
    $('#deleteMovie').submit(delete_Movie);
})(jQuery);

//Post request to add a new movie
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
                    </div>`).delay(3000).fadeOut();
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
        e.preventDefault();
    }

    $('#addMovie').submit(processForm);

})(jQuery);

//Finds the results for a title search
(function ($) {
    function searchByTitle(movies) {

        let doc = this["title"].value;

        $.get("https://localhost:44325/api/movie", function (data) {

            let foundMovies = data.filter(m => m.title.toLowerCase().includes(doc.toLowerCase()));

            $('#searchResults').html(`<br>
      <table class="table table-striped table-hover text-justify">
          <thead class="thead-purple">
              <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Director</th>
                  <th scope="col">Genre</th>
              </tr>
          </thead>
          <tbody id="libraryTable">
          </tbody>
          </table>`)

            foundMovies.map(element => {
                $('#libraryTable').append(`
            <tr>
                <td><strong>${element.title}</strong></td>
                <td>${element.director}</td>
                <td>${element.genre}</td>
            </tr>`)
            });
        })
    }

    $('#ByTitle').on('submit', function (e) {
    e.preventDefault();
    });

    $('#ByTitle').submit(searchByTitle);

})(jQuery);

//Finds the results for a dirctor search
(function ($) {
    function searchByDirector(movies) {

        let doc = this["director"].value;

        $.get("https://localhost:44325/api/movie", function (data) {

            let foundMovies = data.filter(m => m.director.toLowerCase().includes(doc.toLowerCase()));

            $('#searchResults').html(`<br>
      <table class="table table-striped table-hover text-justify">
          <thead class="thead-purple">
              <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Director</th>
                  <th scope="col">Genre</th>
              </tr>
          </thead>
          <tbody id="libraryTable">
          </tbody>
          </table>`)

            foundMovies.map(element => {
                $('#libraryTable').append(`
            <tr>
                <td><strong>${element.title}</strong></td>
                <td>${element.director}</td>
                <td>${element.genre}</td>
            </tr>`)
            });
        })
    }

    $('#ByDire').on('submit', function (e) {
    e.preventDefault();
    });

    $('#ByDire').submit(searchByDirector);

})(jQuery);


//Finds the results for a genre search
(function ($) {
    function searchByGenre(movies) {

        let doc = this["genre"].value;

        $.get("https://localhost:44325/api/movie", function (data) {

            let foundMovies = data.filter(m => m.genre.toLowerCase().includes(doc.toLowerCase()));

            $('#searchResults').html(`
            <br>
      <table class="table table-striped table-hover text-justify">
          <thead class="thead-purple">
              <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Director</th>
                  <th scope="col">Genre</th>
              </tr>
          </thead>
          <tbody id="libraryTable">
          </tbody>
          </table>`)

            foundMovies.map(element => {
                $('#libraryTable').append(`
            <tr>
                <td><strong>${element.title}</strong></td>
                <td>${element.director}</td>
                <td>${element.genre}</td>
            </tr>`)
            });
        })
    }

    $('#ByGenre').on('submit', function (e) {
    e.preventDefault();
    });

    $('#ByGenre').submit(searchByGenre);

})(jQuery);

