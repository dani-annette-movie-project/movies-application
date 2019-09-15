

    /**
     * es6 modules and imports
     */

    const {greeting} = require(`./hello.js`);
    greeting('Ceres');
    /**
     * require style imports
     */
    const {getMovies} = require('./api.js');

    // $('#spinner').css('display', 'none');
    // console.log('Here are all the movies:');


    const updateHTML = () => {
        $('#spinner').css('display', 'none');
        // console.log('Here are all the movies:');
        getMovies()
            .then((movies) => {

                let page = "";

                movies.forEach(({title, rating, id}, i) => {
                    page += '<tr>';
                    page += `<td id="title-${id}">${title}</td>  <td id="rating-${id}">${rating}</td>  <td>${id}</td> <td><button id="edit-${id}" class ="editBtn btn btn-info" data-toggle="modal" data-target="#exampleModal">Edit</button></td> <td><button id="delete-${id}" class ="deleteBtn btn btn-danger">Delete</button></td>`;
                    page += '</tr>';

                });

                $('#contents').html(page);
            });
    };
    updateHTML();
//////////////////adds movies and makes post request/////////////////


                let title;
                let rating;
                let movieObject = {};

                $('.add-movie').click(function () {
                    console.log('movie button clicked');
                    title = $('.title-input').val();
                    console.log(title);
                    rating = $('.rating[type=radio][name=rating]:checked').val();
                    console.log(rating);

                    movieObject.title = title;
                    movieObject.rating = rating;
                    console.log(movieObject);
                    fetch("/api/movies", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(movieObject)
                    }).then(response => response.json())
                        .then(data => {
                            console.log(data);
                            updateHTML()
                        });
                });


//////////////////EDIT BUTTON //////////////////////

                $(document).on('click', `.editBtn`, function (event) {

////////////this editClick variable targets the id attributed to the edit button/////////////
                    const editClick = event.target.id;
                    // console.log(editClick);

                    //the editId variable console logs as edit-[the dynamic id]
                    // //and needs to be split at the dash to isolate the number
                    //upon being split, an array of two elements is created
                    //at index zero, is the dash, we want the element at index 1
                    //which is the unique ID corresponding to the particular film's
                    //title and rating
                    let editId = editClick.split('-')[1];
                    // console.log(editId);

                    let titleToEdit = $(`#title-${editId}`).html();
                    // console.log(titleToEdit);

/////PREPOPULATE RATING TO EDIT////////////////////////////////////

                    let ratingToEdit = $(`#rating-${editId}`).html();
                    console.log(ratingToEdit);

                    $("#editModalTitle").val(titleToEdit);
                    $("#editModalRating" + ratingToEdit).prop('checked', true);

                    ///SAVE CHANGES BUTTON IN MODAL///////
                    $(document).on('click', ".saveChanges", function () {
                        let updatedTitle = $("#editModalTitle").val();
                        let updateRating = $('.rating[type=radio][name=rating]:checked').val();
                        let updatedMovie = {};
                        console.log(updateRating);
                        console.log(updatedTitle);
                        console.log(editId);
                        updatedMovie.title = updatedTitle;
                        updatedMovie.rating = updateRating;
                        console.log(updatedMovie);
                        let url = "/api/movies/" + editId;
                        let options = {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updatedMovie)
                        };
                        fetch(url, options)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                updateHTML();
                            })
                    });


                            });
//////////////// this will delete selected movie////////////////////

                $(document).on('click', ".deleteBtn", function (event) {

                    const deleteClick = event.target.id;
                    let deletedId = deleteClick.split('-')[1];
                    console.log(deletedId);
                   return (fetch("/api/movies/" + deletedId, {
                        method: 'delete'

                    }).then(response => response.json()))
                       .then(updateHTML())
                });













