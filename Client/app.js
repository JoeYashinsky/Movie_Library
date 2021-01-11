$(function(){
    $.get("https://localhost:44325/api/movie", function(data){
        
        //$('#response pre').html( JSON.stringify(data) );
    data.map(element => {
        $('#response pre').append(`<div><div>Title: ${element.title} Director: ${element.director} Genre: ${element.genre}</div></div`)
    });
    })
})




(function($){
    function processForm( e ){
        var dict = {
        	Title : this["title"].value,
        	Director: this["director"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'get',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#my-form').submit( processForm );
})(jQuery);