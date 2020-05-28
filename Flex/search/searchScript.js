let requestURL = 'https://restapicinema.herokuapp.com/films';
let request = new XMLHttpRequest();
request.open('GET', requestURL, true);
request.responseType = 'json';
request.send();
request.onload = function() {
    var films = request.response;
   filmList(films);
   //genreList();
    }


function filmList(jsonObj) {
    let row2 = document.createElement('option');
            document.querySelector('.genre-list').appendChild(row2);
            row2.classList.add('list-list');
            row2.innerHTML = '--select a genre--';
    for(let i = 0; i<jsonObj.length; i++) {
        let row = document.createElement('option');
            document.querySelector('.genre-list').appendChild(row);
            row.classList.add('list-list');
            row.innerHTML = jsonObj[i]['genre'];
            row.value = jsonObj[i]['genre'];
    }
}

/////////////////////////////////////////////////////////////////////

let requestURL2 = 'https://restapicinema.herokuapp.com/halls';
let request2 = new XMLHttpRequest();
request2.open('GET', requestURL2, true);
request2.responseType = 'json';
request2.send();
request2.onload = function() {
    var films2= request2.response;
    formatFilm(films2);
}

function formatFilm(jsonObj) {
    for(let i = 0; i<jsonObj.length; i++) {
        let par = document.createElement('p');
        par.classList.add(`format-p${i}`);
        par.innerHTML = jsonObj[i]['type'];
        document.querySelector('.format').appendChild(par);
        for(let j = 0; j<1; j++) {
            let row = document.createElement('input');
            row.type = 'checkbox';
            row.classList.add('checkb2');
            row.value = jsonObj[i]['type'];
            document.querySelector(`.format-p${i}`).appendChild(row);
        }
    }
}

/////////////////////////////////////////////////////////////////////

let data;
let genre;
let ratingArr = [];
let formatArr = [];
let filmsArrResult = [];
let genreArrResult = [];
let ratingArrResult = [];
let formatArrResult = [];
let formatArrResult2 = [];
let finalFinal = [];

function checkRadio() {
    let arr = document.getElementsByName('period');
    for(let i = 0; i<arr.length; i++) {
        if(arr[i].checked) {
            data = arr[i].value;
            //alert(data);
            break;
        }
    }
}

function checkList() {
    var select = document.getElementById('genre-list');
        genre = select.value;
        //alert(genre);
}

function getCheckedCheckBoxes() {
    ratingArr = [];
    var checkboxes = document.getElementsByClassName('checkb');
    for (var i = 0; i < checkboxes.length; i++) {
       if (checkboxes[i].checked) {
        ratingArr.push(checkboxes[i].value); // положим в массив выбранный
       }
    }
    //alert(ratingArr);
  }

  function getCheckedCheckBoxes2() {
      formatArr = [];
    var checkboxes = document.getElementsByClassName('checkb2');
    for (var i = 0; i < checkboxes.length; i++) {
       if (checkboxes[i].checked) {
        formatArr.push(checkboxes[i].value); // положим в массив выбранный
       }
    }
    //alert(formatArr); // для использования в нужном месте
  }

///////////////////////////////////////////////////////////
let button = document.getElementById('search');
button.addEventListener('click', checkRadio);
button.addEventListener('click', checkList);
button.addEventListener('click', getCheckedCheckBoxes);
button.addEventListener('click', getCheckedCheckBoxes2);
button.addEventListener('click', getFilmDate);
button.addEventListener('click', getFilmGenre);
button.addEventListener('click', getFilmRating);
button.addEventListener('click', getFimlFormat);
//button.addEventListener('click', ShowSearch);
//button.addEventListener('click', removeFilm);


function getFilmDate() {
    let d = document.getElementById('films_list');
    if(d.childNodes) {
        while(d.firstChild) {
            d.removeChild(d.firstChild);
        }
    }
    date2Now = new Date();
    if(data == 'today') {
        date2Now = new Date();
    } else if(data == 'tomorrow') {
        date2Now.setDate(date2Now.getDate() + 1);
    } else if(data == 'thisWeek') {
        date2Now.setDate(date2Now.getDate() + 7);
    } else if(data == 'thisMonth') {
        date2Now.setDate(date2Now.getDate() + 300);
    }
    //alert(date2Now);

    let requestURL4 = 'https://restapicinema.herokuapp.com/sessions';
    let request4 = new XMLHttpRequest();
    request4.open('GET', requestURL4, true);
    request4.responseType = 'json';
    request4.send();
    request4.onload = function() {
        var films4 = request4.response;
        filmAppearDate(films4);
    }
    function filmAppearDate(jsonObj) {
        filmsArrResult = [];
        for(let i = 0; i < jsonObj.length; i++) {
            let current = new Date(jsonObj[i]['start']);
            if(current > dateNow && current < date2Now) {
                if(filmsArrResult.length == 0) {
                    filmsArrResult.push(jsonObj[i]['idfilm']);
                } else {
                      if(filmsArrResult.indexOf(jsonObj[i]['idfilm']) == -1) {
                            filmsArrResult.push(jsonObj[i]['idfilm']);
                      } 
                  }
                }
            }
        //alert(filmsArrResult);
    }
    
}

function getFilmGenre() {
    let requestURL5 = 'https://restapicinema.herokuapp.com/films';
    let request5 = new XMLHttpRequest();
    request5.open('GET', requestURL5, true);
    request5.responseType = 'json';
    request5.send();
    request5.onload = function() {
        var films5 = request5.response;
        filmAppearGenre(films5);
    }

    function filmAppearGenre(jsonObj) {
        genreArrResult = [];
        for(let i = 0; i < jsonObj.length; i++) {
            if(genre == jsonObj[i]['genre']) {
                genreArrResult.push(jsonObj[i]['idfilm']);
                }
            }
            //alert(genreArrResult);
        }
}

function getFilmRating() {
    let requestURL6 = 'https://restapicinema.herokuapp.com/films';
    let request6 = new XMLHttpRequest();
    request6.open('GET', requestURL6, true);
    request6.responseType = 'json';
    request6.send();
    request6.onload = function() {
        var films6 = request6.response;
        filmAppearRating(films6);
    }

    function filmAppearRating(jsonObj) {
        ratingArrResult = [];
        for(let i = 0; i < jsonObj.length; i++) {
            let template;
            if(jsonObj[i]['ageLimit'].length == 1) {
                template = jsonObj[i]['ageLimit'];
            } else if(jsonObj[i]['ageLimit'].length == 2) {
                template = jsonObj[i]['ageLimit'];
            } else if(jsonObj[i]['ageLimit'].length == 3) {
                template = jsonObj[i]['ageLimit'].slice(0, 2);
            }
            for(let j = 0; j < ratingArr.length; j++) {
                if(ratingArr[j] >= template) {
                    ratingArrResult.push(jsonObj[i]['idfilm']);
                }
            }
        }
        //alert(ratingArrResult);
    }
}

function getFimlFormat() {
    let requestURL7 = 'https://restapicinema.herokuapp.com/halls';
    let request7 = new XMLHttpRequest();
    request7.open('GET', requestURL7, true);
    request7.responseType = 'json';
    request7.send();
    request7.onload = function() {
        var films7 = request7.response;
        filmAppearFormat(films7);
    }

    function filmAppearFormat(jsonObj) {
        formatArrResult = [];
        for(let i = 0; i < jsonObj.length; i++) {
            for(let j = 0; j < formatArr.length; j++) {
                if(jsonObj[i]['type'] == formatArr[j]) {
                    formatArrResult.push(jsonObj[i]['idhall']);
                }
            }
        }

        let requestURL8 = 'https://restapicinema.herokuapp.com/sessions';
        let request8 = new XMLHttpRequest();
        request8.open('GET', requestURL8, true);
        request8.responseType = 'json';
        request8.send();
        request8.onload = function() {
            var films8 = request8.response;
            filmAppearFormat2(films8);
        }

        function filmAppearFormat2(jsonObj) {
            formatArrResult2 = [];
            for(let i = 0; i < jsonObj.length; i++) {
                for(let j = 0; j < formatArrResult.length; j++) {
                    if(jsonObj[i]['idhall'] == formatArrResult[j]) {
                        formatArrResult2.push(jsonObj[i]['idfilm']);
                    }
                }
            }
            //alert(formatArrResult2);
            searchFilm();
        }
        
function searchFilm() {
    let templateArr = [filmsArrResult, genreArrResult, ratingArrResult, formatArrResult2];
    for(let i = 0; i < templateArr.length; i++) {
        if(templateArr[i].length == 0) {
            templateArr.splice(i, 1);
            i = -1;
        }
    }
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    let arr4 = [];
    for(let i = 0; i < templateArr.length; i++) {
        if(templateArr.length == 2) {
            arr1 = templateArr[i];
            arr2 = templateArr[i + 1];
            finalFinal = [];
            for(let j = 0; j < arr1.length; j++) {
                if(arr2.indexOf(arr1[j]) != -1) {
                    finalFinal.push(arr1[j]);
                }
            }
            break;
        } else if(templateArr.length == 3) {
            arr1 = templateArr[i];
            arr2 = templateArr[i + 1];
            arr3 = templateArr[i + 2];

            arr1_2 = [];
            for(let j = 0; j < arr1.length; j++) {
                if(arr2.indexOf(arr1[j]) != -1) {
                    arr1_2.push(arr1[j]);
                }
            }
            finalFinal = [];
            for(let k = 0; k < arr1_2.length; k++) {
                if(arr3.indexOf(arr1_2[k]) != -1) {
                    finalFinal.push(arr1_2[k]);
                }
            }
            break;

        } else if(templateArr.length == 4) {
            arr1 = templateArr[i];
            arr2 = templateArr[i + 1];
            arr3 = templateArr[i + 2];
            arr4 = templateArr[i + 3];

            arr1_2 = [];
            for(let l = 0; l < arr1.length; l++) {
                if(arr2.indexOf(arr1[l]) != -1) {
                    arr1_2.push(arr1[l]);
                }
            }   
            arr3_4 = [];
            for(let m = 0; m < arr3.length; m++) {
                if(arr4.indexOf(arr3[m]) != -1) {
                    arr3_4.push(arr3[m]);
                }
            }     
            finalFinal = [];
            for(let z = 0; z < arr1_2.length; z++) {
                if(arr3_4.indexOf(arr1_2[z]) != -1) {
                    finalFinal.push(arr1_2[z]);
                }
            }
            break;
        } else if(templateArr.length == 1) {
            arr1.push(templateArr[0][0]); 
            if(templateArr[0].length > 1) {                                 
                for(let h = 1; h < templateArr[0].length; h++) {
                    arr2.push(templateArr[0][h]);
                }
            }
            finalFinal = [];
            for(let b = 0; b < arr1.length; b++) {
                if(arr1.indexOf(arr2[b]) != -1) {
                    finalFinal.push(arr2[b]);
                }
            }
            break;
        }
    }

    /*finalFinal = [];
    for(let i = 1; i < templateArr.length; i++){
        for(let j = 0; j < templateArr[i].length; j++) {
            if(templateArr[i][j].indexOf(templateArr[i - 1][j]) != -1) {
                finalFinal.push(templateArr[i][j]);
            }   
        }
    }*/
    //alert(`${finalFinal} end`);

    let requestURL9 = 'https://restapicinema.herokuapp.com/films';
        let request9 = new XMLHttpRequest();
        request9.open('GET', requestURL9, true);
        request9.responseType = 'json';
        request9.send();
        request9.onload = function() {
            var films9 = request9.response;
            filmAppearFinal(films9);
        }
        function filmAppearFinal(jsonObj) {
            for(let i = 0; i < jsonObj.length; i++) {
                for(let j = 0; j < finalFinal.length; j++) {
                    if(finalFinal[j] == jsonObj[i]['idfilm']) {

                        let div = document.createElement('div');
                        div.id = `ex-film${i}`;
                        div.classList.add('ex-film');
                        div.style = 'display: flex; align-items: center; margin: 20px 20px';
                        document.querySelector('.films_list').appendChild(div);

                        let img = document.createElement('img');
                        img.classList.add('film-img');
                        if(jsonObj[i]['image'] == '') {
                            img.src = 'https://pmcvariety.files.wordpress.com/2013/10/film-placeholder.jpg?w=600';
                        } else {
                            img.src = `${jsonObj[i]['image']}`;
                        }
                        document.getElementById(`ex-film${i}`).appendChild(img);

                        let div2 = document.createElement('div');
                        div2.classList.add(`div2${i}`);
                        div2.style = 'width:300px; margin:0 30px';
                        document.querySelector(`#ex-film${i}`).appendChild(div2);

                        let a = document.createElement('button');
                        a.style = 'text-decoration: none; width:150px; height:40px; font-zize:40px; background-color: #6200EE; text-align: center; color: white; font-weight: 600; align-items:center';
                        a.innerHTML = 'Order';
                        a.value = jsonObj[i]['name'];
                        a.addEventListener('click', function() {
                            location.href = '../chooseFilm/chooseFilm.html';
                            imgSrc = a.value;
                            localStorage.setItem('imgSrc', imgSrc);
                        });
                        document.querySelector(`#ex-film${i}`).appendChild(a);

                        let h3_1 = document.createElement('h3');
                        h3_1.innerHTML = `Name: ${jsonObj[i]['name']}`;
                        document.querySelector(`.div2${i}`).appendChild(h3_1);

                        let h3_2 = document.createElement('h3');
                        h3_2.innerHTML = `Genre: ${jsonObj[i]['genre']}`;
                        document.querySelector(`.div2${i}`).appendChild(h3_2);
                        
                        let h3_3 = document.createElement('h3');
                        h3_3.innerHTML = `Rating: ${jsonObj[i]['ageLimit']}`;
                        document.querySelector(`.div2${i}`).appendChild(h3_3);
                    }
                }
            }
        }

    }
}
}

let imgSrc;
let dateNow = new Date();
let date2Now = new Date();

