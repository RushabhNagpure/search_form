// function getCurrentImageOfTheDay() {
//     const apiKey = 'xoo6catUct7beEazBfw10hYHdFwDeUsysWRDR4qf'
//     const currentDate = new Date().toISOString().split('T')[0];

//     fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`)
//        .then((response) => {
//         if(!response.ok){
//             throw new Error('failed to fetch image of the day.')
//         }
//         return response.json();
//        })
//        .then((data) => {
//         const currentImageContainer = document.getElementById('current-image-container');
//         currentImageContainer.innerHTML = `img src="${data.url}" alt="${date.title}">`;
//        })
//        .catch((error) => {
//         console.error('failed to fatch image of day');
//        });
// }

// // function to fatch and display the image of the day for a selected date
// function getImageOfTheDay(selectedDate){
//     const apiKey = 'xoo6catUct7beEazBfw10hYHdFwDeUsysWRDR4qf'
//     fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${selectedDate}`)
//     .then((response) => {
//         if(!response.ok){
//             throw new Error('failed to fatch image of the day.');
//         }
//         return response.json();
//     })
//     .then((data) => {
//         const currentImageContainer = document.getElementById('current-immage-container');
//         currentImageContainer.innerHTML = `<img src="${data.url}" alt="${data.title}">`;

//         // Save the selected data to local storage
//         saveSearch(selectedDate);
//         // Add the selected date to 
//         addSearchToHistory(selectedDate);
//     })
//     .catch((error) => {
//         console.log(error.message);
//         // Display an error message to the user
//         // you can create a separate function to handle error messages
//     });
// }

// // function to save the selected date to local storage
// function saveSearch(selectedDate){
//     localStorage.setItem('selectedDate',selectedDate);
// }

// // function to retrieve and display search history from local storage
// function addSearchToHistory(selectedDate){
//     const searchHistoryList = document.getElementById('search-history');
//     const saveSearchDates = JSON.parse(localStorage.getItem('savedSearchDates'))|| [];

//     //add the Selected date to the search history list
//     saveSearchDates.push(selectedDate);
//     localStorage.setItem('searchDates',JSON.stringify(saveSearchDates));

//     // Display the updated search history 
//     searchHistoryList.innerHTML = saveSearchDates.map((date) => {
//         return `<li>${date}</li>`;
//     }).join('');

//      // Add click event listeners to the search history items
//      searchHistoryList.querySelectorAll('li').forEach((item) => {
//         item.addEventListener('click',() => {
//             getImageOfTheDay(item.textContent);
//         });
//      });
// }

// window.addEventListener('load' , getCurrentImageOfTheDay);

const apiKey = 'xoo6catUct7beEazBfw10hYHdFwDeUsysWRDR4qf';

const searchForm = document.getElementById('search-form');

const searchInput = document.getElementById('search-input');

const currentImageContainer = document.getElementById('current-image-container');

const searchHistory = document.getElementById('search-history');

// Get the current date in the format YYYY-MM-DD

const currentDate = new Date().toISOString().split('T')[0];

// Function to fetch and display the image of the day for the current date

function getCurrentImageOfTheDay() {

  getImageOfTheDay(currentDate);

}

// Function to fetch and display the image of the day for the selected date

function getImageOfTheDay(date) {

    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    fetch(url)

    .then(response => response.json())

    .then(data => {

      console.log(data)

      const h2 = document.createElement('h2');

      h2.innerHTML = `Picture On ${date}`;

      const p = document.createElement('p');

      p.innerHTML = data.explanation;

      const h4 = document.createElement('h4');

      h4.innerHTML = data.title;

      const image = document.createElement('img');

      image.src = data.url;

      image.alt = data.title;

      currentImageContainer.innerHTML = '';

      currentImageContainer.appendChild(h2);

      currentImageContainer.appendChild(image);

      currentImageContainer.appendChild(h4);

      currentImageContainer.appendChild(p);

        saveSearch(date);

        addSearchToHistory();

      

    })

    .catch(error => {

      console.error('Error:', error);

    });

}

const mes = (date) => {

    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    fetch(url)

    .then(response => response.json())

    .then(data => {

      console.log(data)

      const h2 = document.createElement('h2');

      h2.innerHTML = `Picture On ${date}`;

      const p = document.createElement('p');

      p.innerHTML = data.explanation;

      const h4 = document.createElement('h4');

      h4.innerHTML = data.title;

      const image = document.createElement('img');

      image.src = data.url;

      image.alt = data.title;

      currentImageContainer.innerHTML = '';

      currentImageContainer.appendChild(h2);

      currentImageContainer.appendChild(image);

      currentImageContainer.appendChild(h4);

      currentImageContainer.appendChild(p);

    })

}

// Function to save the date to local storage

function saveSearch(date) {

 

   const currentDateNow = new Date().toISOString().split('T')[0];

  if(date !== currentDateNow){

  const searches = JSON.parse(localStorage.getItem('searches')) || [];

  searches.push(date);

  localStorage.setItem('searches', JSON.stringify(searches));

    }

}

// Function to add the date to the search history list in the UI

function addSearchToHistory() {

  searchHistory.innerHTML = '';

  const searches = JSON.parse(localStorage.getItem('searches')) || [];

  searches.forEach(date => {

    const listItem = document.createElement('li');

    listItem.textContent = date;

    listItem.addEventListener('click', () => {

      mes(date);

    });

    searchHistory.appendChild(listItem);

  });

}

// Event listener for form submission

searchForm.addEventListener('submit', event => {

  event.preventDefault();

  const selectedDate = searchInput.value;

  getImageOfTheDay(selectedDate);

});

// Call the function to get the image of the day for the current date on page load

getCurrentImageOfTheDay();