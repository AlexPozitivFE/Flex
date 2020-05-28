let address;
let hallsArr = [];
let filmsArr = [];
let section1 = document.querySelector('.container select');
//section1.addEventListener('change', checkList);

let requestURL2 = 'https://restapicinema.herokuapp.com/cinema';
let request2 = new XMLHttpRequest();
request2.open('GET', requestURL2, true);
request2.responseType = 'json';
request2.send();
request2.onload = function() {
    var films2 = request2.response;
    populateCinemas(films2);
    //checkList();
  }


function populateCinemas(jsonObj) {
    for(let j = 0; j < jsonObj.length; j++) {
        let option = document.createElement('option');
        option.innerHTML = `${jsonObj[j]['name']}, ${jsonObj[j]['adress']}`;
        option.value = jsonObj[j]['idcinema'];
        option.classList.add('options');
        document.querySelector('.cinema-list').appendChild(option);
        section1.addEventListener('change', checkList);
       // section1.addEventListener('change', deletFilms);
        if(j == 0) {
            address = option.value;
        }
    }
}

function checkList() {
    var select = document.getElementsByClassName('options');
        address = this.value;
        localStorage.getItem('address', address);
        //alert(address);
        //alert(currentCinema);
}

let requestURL = 'https://restapicinema.herokuapp.com/films/actual';
let request = new XMLHttpRequest();
request.open('GET', requestURL, true);
request.responseType = 'json';
request.send();
request.onload = function() {
    var films = request.response;
    populateFilms(films);
  }
    function populateFilms(jsonObj) {
        for(let i = 0; i<jsonObj.length; i++) {
            if(jsonObj[i]['image'] == '') {
                continue;
            } else {
            let row = document.createElement('tr');
            document.querySelector('.film-table').appendChild(row);
            row.classList.add('rows');
            if(i > 4) {
                document.querySelector('.film-table').appendChild(row);
                row.classList.add('rows');
            }
                let ar = document.createElement('a');
                let img = document.createElement('img');
                ar.href = '../chooseFilm/chooseFilm.html';
                ar.innerHTML = img.src;
                row.innerHTML = ar.innerHTML; 
                ar.classList.add('links');
   
                document.querySelector('.rows').appendChild(ar);
                document.querySelector('.links').appendChild(img);
                img.src = jsonObj[i]['image'];
                img.classList.add('images');
            }
        }
    }

    let requestURL3 = 'https://restapicinema.herokuapp.com/films/soon';
    let request3 = new XMLHttpRequest();
    request3.open('GET', requestURL3, true);
    request3.responseType = 'json';
    request3.send();
    request3.onload = function() {
        var films3 = request3.response;
        populateFilms2(films3);
      }
        function populateFilms2(jsonObj) {
            for(let i = 0; i<jsonObj.length; i++) {
                if(jsonObj[i]['image'] == '') {
                    continue;
                } else {
                let row = document.createElement('tr');
                document.querySelector('.film-table2').appendChild(row);
                row.classList.add('rows2');
                if(i > 4) {
                    document.querySelector('.film-table2').appendChild(row);
                    row.classList.add('rows2');
                }
                    let ar = document.createElement('a');
                    let img = document.createElement('img');
                    ar.href = '../chooseFilm/chooseFilm.html';
                    ar.innerHTML = img.src;
                    row.innerHTML = ar.innerHTML; 
                    ar.classList.add('links2');
       
                    document.querySelector('.rows2').appendChild(ar);
                    document.querySelector('.links2').appendChild(img);
                    img.src = jsonObj[i]['image'];
                    img.classList.add('images2');
                }
            }
        }

let button;
let imgSrc = '';
window.onload = function() {
    button = document.getElementsByClassName('images');
    for(let i = 0; i<button.length; i++) {
        button[i].addEventListener('click', function() {
            imgSrc = '';
            imgSrc = this.src;
            localStorage.setItem('imgSrc', imgSrc);
            //alert(imgSrc);
        }); 
    }
    button2 = document.getElementsByClassName('images2');
    for(let i = 0; i<button2.length; i++) {
        button2[i].addEventListener('click', function() {
            imgSrc = '';
            imgSrc = this.src;
            localStorage.setItem('imgSrc', imgSrc);
            //alert(imgSrc);
        }); 
    }
}