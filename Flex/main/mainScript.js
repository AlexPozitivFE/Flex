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
    }/*
    let requestURL3 = 'https://restapicinema.herokuapp.com/halls';
    let request3 = new XMLHttpRequest();
    request3.open('GET', requestURL3, true);
    request3.responseType = 'json';
    request3.send();
    request3.onload = function() {
    var films3 = request3.response;
        hallsFilms(films3);
    }
    function hallsFilms(jsonObj) {
        for(let i = 0; i < jsonObj.length; i++) {
            if(jsonObj[i]['idcinema'] == address) {
                hallsArr.push(jsonObj[i]['idhall']);
            }
        }
        //alert(hallsArr);
    }
    //alert(address);
    let requestURL4 = 'https://restapicinema.herokuapp.com/sessions';
    let request4 = new XMLHttpRequest();
    request4.open('GET', requestURL4, true);
    request4.responseType = 'json';
    request4.send();
    request4.onload = function() {
    var films4 = request4.response;
        sessionFilms(films4);
    }
    function sessionFilms(jsonObj) {
        for(let i = 0; i < jsonObj.length; i++) {
            for(let j = 0; j < hallsArr.length; j++) {
                if(hallsArr[j] == jsonObj[i]['idhall']) {
                    if(filmsArr.length == 0) {
                        filmsArr.push(jsonObj[i]['idfilm']);
                    } else {
                        for(let k = 0; k < filmsArr.length; k++) {
                            if(filmsArr[k] != jsonObj[i]['idfilm']) {
                                filmsArr.push(jsonObj[i]['idfilm']);
                                break;
                            } else {
                                continue;
                            }
                        }
                    }
                }
            }
        }

        //alert(filmsArr);
    }

    let requestURL = 'https://restapicinema.herokuapp.com/films';
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
            for(let j = 0; j < filmsArr.length; j++) {
                if(filmsArr[j] == jsonObj[i]['idfilm']) {  
                    let row = document.createElement('tr');
                    document.querySelector('.film-table').appendChild(row);
                    row.classList.add('rows');
                    document.querySelector('.film-table').appendChild(row);
                    row.classList.add('rows');
                    let ar = document.createElement('a');
                    let img = document.createElement('img');
                    ar.href = '../chooseFilm/chooseFilm.html';
                    ar.innerHTML = img.src;
                    row.innerHTML = ar.innerHTML; 
                    ar.classList.add('links');
    
                    document.querySelector('.rows').appendChild(ar);
                    document.querySelector('.links').appendChild(img);
                    if(jsonObj[i]['image'] == '') {
                        img.src = 'https://pmcvariety.files.wordpress.com/2013/10/film-placeholder.jpg?w=600';
                    } else {
                            img.src = jsonObj[i]['image'];
                        }
                    img.classList.add('images');

                }
            }
        }
    }*/
}

function checkList() {
    var select = document.getElementsByClassName('options');
        address = this.value;
        localStorage.getItem('address', address);
        alert(address);
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
            alert(imgSrc);
        }); 
    }
    button2 = document.getElementsByClassName('images2');
    for(let i = 0; i<button2.length; i++) {
        button2[i].addEventListener('click', function() {
            imgSrc = '';
            imgSrc = this.src;
            localStorage.setItem('imgSrc', imgSrc);
            alert(imgSrc);
        }); 
    }
}