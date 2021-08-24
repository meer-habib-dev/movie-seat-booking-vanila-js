const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const total = document.getElementById('total');
const count = document.getElementById('count');
const movieSelect = document.getElementById('movie');
let tricketPrice = +movieSelect.value;
populatedUi();
//set move data and price in local storage;
function setMoveData(movieIndex, MoviePrice) {
    localStorage.setItem('selectedMoveIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', MoviePrice);
}
//update the count and price of selected seats
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex))
    const selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    total.innerText = selectedSeatCount * tricketPrice;
}

function populatedUi() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMove = localStorage.getItem('selectedMoveIndex');
    if (selectedMove !== null) {
        movieSelect.selectedIndex = selectedMove;
    }
}
//movie select event 
movieSelect.addEventListener('change', (e) => {
    tricketPrice = +e.target.value;

    setMoveData(e.target.selectedIndex , e.target.value);

    updateSelectedCount();
})
//getting the bubble parent 
//seat select event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
    }

    updateSelectedCount();
})

// inital run on page load 
updateSelectedCount();