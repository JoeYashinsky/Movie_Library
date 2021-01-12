$(function(){
    $.get("https://localhost:44325/api/movie", function(data){
        
        //$('#response pre').html( JSON.stringify(data) );
    data.map(element => {
        $('#response pre').append(`<div><div>Title: ${element.title} Director: ${element.director} Genre: ${element.genre}</div></div`)
    });
    })
})

$(function(){
    $.get("https://localhost:44325/api/movie", function(data){
        
        //$('#response pre').html( JSON.stringify(data) );
    data.map(element => {
        $('#currentMovies').append(`<li><a onClick="generateUpdateForm(${element.movieId})">${element.title}</a></li> `)
    });
    })
})

$(function(){
    $.get("https://localhost:44325/api/movie", function(data){
        
        //$('#response pre').html( JSON.stringify(data) );
    data.map(element => {
        $('#currentMoviesDelete').append(`<li><a onClick="confirmDelete(${element.movieId})">${element.title}</a></li> `)
    });
    })
})
//<li><a href="#">HTML</a></li>

function generateUpdateForm(currentMovieID){
    
    $.get("https://localhost:44325/api/movie/" + currentMovieID, function(data){

    $('#updateMovie').append(`<div class="form-group">
    <input type="text" class="form-control" id="title" name="title" value="${data.title}">
</div>
<div class="form-group">
    <input type="text" class="form-control" id="director" name="director"
        value="${data.director}">
</div>
<div class="form-group">
    <input type="text" class="form-control" id="genre" name="genre" value="${data.genre}">
</div>
<button type="submit" class="btn btn-purple-light">Update</button>`)
    })
}

function updateMovie(currentMovie){
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'put',
        contentType: 'application/json',
        data: JSON.stringify(dict),
        success: function( data, textStatus, jQxhr ){
            $('#response pre').html( data );
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

function confirmDelete(currentMovieID){
    $.get("https://localhost:44325/api/movie/" + currentMovieID, function(data){

        $('#updateMovieDelete').append(`
        <h4>Do you want to perminatly delete: <strong>${data.title}</strong></h4>
        <button onClick="DeleteMovie(${data.movieId})" class="btn btn-purple-light">Confirm</button>`)
    })
}

function DeleteMovie(deletedMovieId) {
    $.ajax({
        url: 'https://localhost:44325/api/movie',
        dataType: 'json',
        type: 'delete',
        contentType: 'application/json',
        data: JSON.stringify(dict),
        success: function( data, textStatus, jQxhr ){
            $('#response pre').html( data );
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
            Director: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#successAdd').html(`<br>
                    <div class="alert alert-purple" role="alert">
                        Thanks for adding ${data.title} to the best list of movies on this side of the Mississippi!
                    </div>`);
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    } 

    $('#addMovie').submit(processForm);

})(jQuery);

