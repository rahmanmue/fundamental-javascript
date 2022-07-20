function tampilkanFilm(){
    $('#movie-list').html('');

    $.ajax({
        url:'http://www.omdbapi.com',
        type: 'get',
        dataType:'json',
        data:{
            'apikey':'8859ea20',
            's': $('#search-input').val()
        },

        success:function(hasil){
            if(hasil.Response == "True"){
                let film = hasil.Search;
                console.log(film);
                $.each(film, function(i, row){
                    $('#movie-list').append(
                    `<div class="col-md-4 mb-2">
                        <div class="card">
                            <img class="card-img-top" src="${row.Poster}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${row.Title}</h5>
                                <h6>Tahun : ${row.Year}</h6>
                                <p class="card-text"> Tipe : ${row.Type}</p>
                                <a href="#" class="btn btn-info" id="detail" data-id=${row.imdbID} data-toggle="modal" data-target="#exampleModal">Lihat Detail</a>
                            </div>
                            </div>
                        </div>
                    </div>`
                    );
                });

                $('#search-input').val('');

            }else{
                $('#movie-list').html(`
                <div class="col-12">
                    <h2 class="text-center">${hasil.Error}</h2>
                </div>
                `)
            }
        }
    })
}


$('#search-button').on('click',function(){
    tampilkanFilm();
});

$('#search-input').on('keyup', function(e){
    if(e.which === 13){
        tampilkanFilm();
    }
});

$('#movie-list').on('click','#detail', function(){
    console.log($(this).data('id'));
    $.ajax({
        url:'http://www.omdbapi.com',
        type: 'get',
        dataType:'json',
        data:{
            'apikey':'8859ea20',
            'i': $(this).data('id')
        },

        success: function(hasil){
            if(hasil.Response === "True"){
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-6">
                            <img class="img-fluid" src="${hasil.Poster}">
                            </div>
                        
                            <div class="col-md-6">
                                <ul class="list-group">
                                    <li class="list-group-item">${hasil.Title}</li>
                                    <li class="list-group-item">${hasil.Year}</li>
                                    <li class="list-group-item">${hasil.Rated}</li>
                                    <li class="list-group-item">${hasil.Genre}</li>
                                    <li class="list-group-item">${hasil.Runtime}</li>
                                    <li class="list-group-item">${hasil.Writer}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    })

})


