/*
  Public API Request
  scripts.js
*/

//fetch data

fetch('https://randomuser.me/api/?results=12&nat=au,gb,ca,us')

//extract JSON content from response

  .then(response => response.json())

  //use JSON data to create a card for each individual

  .then(data => {
    data.results.map(data => {
    generateCard(
      data.picture.large,
      data.name.title,
      data.name.first,
      data.name.last,
      data.email,
      data.location.city,
      data.location.state
    );
    
//use JSON data to create a modal window for each individual

    generateModalWindow(
      data.picture.large,
      data.name.title,
      data.name.first,
      data.name.last,
      data.email,
      data.phone,
      data.location.street,
      data.location.city,
      data.location.state,
      data.location.postcode,
      data.dob.date
    );
  });
})

//catch error and provide information in console

.catch(error => console.error('Error:', error));
 
//helper functions

  function generateCard(image, title, first, last, email, city, state) {

    $('#gallery').append($(
      `<div class="card" id=${first}-${last} onclick="showModalWindow(this.id)">
        <div class="card-img-container">
          <img src=${image} class="card-img" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 class="card-name cap">${title} ${first} ${last}</h3>
          <p class="card-text">${email}</p>
          <p class="card-text cap">${city}, ${state}</p>
        </div>
      </div>`
    )
    );
  }

  function generateModalWindow(image, title, first, last, email, phone, street, city, state, postcode, birthday) {
    //format date of birth correctly
    let dob = birthday.split('T')[0];

    //create and append modal window
    $('body').append($(
      `<div class="modal-container ${first}-${last}" style="display: none">
        <div class="modal">
          <button type="button" id="modal-close-btn" class="modal-close-btn" onclick="hideModalWindow(this.id)"><strong>X</strong></button>
          <div class="modal-info-container">
            <img class="modal-img" src=${image} alt="profile picture">
            <h3 id="name" class="modal-name cap">${title} ${first} ${last}</h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${city}</p>
            <hr>
            <p class="modal-text">${phone}</p>
            <p class="modal-text cap">${street}, ${city}, ${state}, ${postcode}</p>
            <p class="modal-text">Birthday: ${dob}</p>
          </div>
          <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn" onclick="prevModal()">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn" onclick="nextModal()">Next</button>
                </div>
            </div>
        </div>
      </div>`
    )
    );
  }

  //open modal window
function showModalWindow(id) {
  let personSelected = id;
  $(`.${personSelected}`).show();
}

//close modal window
function hideModalWindow(id) {
  $('.modal-container').hide();
}

//navigate modals
//previous person
function prevModal(){
  let currentModal = $('.modal-container:visible');
  let prevModal = currentModal.prev();
  if(prevModal.hasClass('modal-container')){
  $('.modal-container').hide();
  prevModal.show();
  } else {
    $('#modal-prev').attr('disabled', true);
  }
}

//next person
function nextModal() {
  let currentModal = $('.modal-container:visible');
  let nextModal = currentModal.next();
  if(nextModal.hasClass('modal-container')){
  $('.modal-container').hide();
  nextModal.show();
  } else {
    $('#modal-next').attr('disabled', true);
  }
}

//create and append search bar
$('.search-container').append(
$(`<form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`
)
);

//search bar functionality
$('#search-input').keyup(function() {
  let search = $('#search-input').val();
  let searchResults = $('.card > .card-info-container > h3');
  $('.card').hide();
  for(let i = 0; i < searchResults.length; i++) {
    if(searchResults[i].innerHTML.includes(`${search}`)) {
      searchResults[i].parentNode.parentNode.style.display = "";
    }
  }
});