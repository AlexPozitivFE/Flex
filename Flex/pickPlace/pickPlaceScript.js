let film = localStorage.getItem('filmId');
let date = localStorage.getItem('date');
let hall = localStorage.getItem('hall');
//let hall = 'IMAX';
let idSession = localStorage.getItem('idSession');
//alert(idSession);
//alert(film);
let total = 0;
let mainDiv = document.querySelector('.film-pick');
mainDiv.style = 'display: flex';

let ttooll = document.getElementById('totall');

let requestURL4 = 'https://restapicinema.herokuapp.com/cinema';
let request4 = new XMLHttpRequest();
request4.open('GET', requestURL4, true);
request4.responseType = 'json';
request4.send();
request4.onload = function() {
    var films4 = request4.response;
    populateCinemas(films4);
    //checkList();
  }


function populateCinemas(jsonObj) {
    for(let j = 0; j < jsonObj.length; j++) {
        let option = document.createElement('option');
        option.innerHTML = `${jsonObj[j]['name']}, ${jsonObj[j]['adress']}`;
        option.value = jsonObj[j]['idcinema'];
        option.classList.add('options');
        document.querySelector('.cinema-list').appendChild(option);
       // section1.addEventListener('change', deletFilms);
        if(j == 0) {
            address = option.value;
        }
    }
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
        for(let i = 0; i < jsonObj.length; i++) {
            if(film == jsonObj[i]['idfilm']) {
                let img = document.createElement('img');
                img.src = jsonObj[i]['image'];
                img.classList.add('image-film');
                img.style = 'max-width: 300px; width: auto; margin: 30px 30px; box-shadow: 0 0 20px rgba(0,0,0,0.5);';
                document.querySelector('.film-desc').appendChild(img);

                let h2_1 = document.createElement('h2');
                h2_1.innerHTML = `Title: ${jsonObj[i]['name']}`;
                h2_1.style = 'margin: 0px 30px;';
                document.querySelector('.film-desc').appendChild(h2_1);

                let h2_2 = document.createElement('h2');
                h2_2.innerHTML = `Date: ${date}`;
                h2_2.style = 'margin: 0px 30px;';
                document.querySelector('.film-desc').appendChild(h2_2);

                let h2_3 = document.createElement('h2');
                h2_3.innerHTML = `Hall: ${hall}`;
                h2_3.style = 'margin: 0px 30px;';
                document.querySelector('.film-desc').appendChild(h2_3);
            }
        }
  }
//////////////////////////////////////////
let price;
  let requestURL2 = `https://restapicinema.herokuapp.com/tickets/this?idsession=${idSession}`;
  let request2 = new XMLHttpRequest();
  request2.open('GET', requestURL2, true);
  request2.responseType = 'json';
  request2.send();
  request2.onload = function() {
      var films2 = request2.response;
      populatePlaces(films2);
    }



    function populatePlaces(jsonObj) {
        let places = document.getElementsByClassName('place-td');
        for(let i = 0; i < places.length; i++) {
            for(let j = 0; j < jsonObj.length; j++) {
                if(places[i].innerHTML == jsonObj[j]['place'] && places[i].id == jsonObj[j]['rownum']) {
                    places[i].classList.add('rownum');
                    places[i].style = 'background-color: #474441; text-align: center; align-items: center; color: white;';
                    places[i].addEventListener('click', function() {
                        for(let i = 0; i < placeArr2.length; i++) {
                            if(places.id == placeArr2[i][0] && places.innerHTML == placeArr2[i][1]) {
                                placeArr2.splice(i,1);
                            }
                    }
                    //alert(placeArr2);
                    places[i].style = 'background-color: #474441; text-align: center; align-items: center; color: white;';
                    });
                }
            }
        }
    }

let placeArr2 = [];

    let table = document.getElementById('placeTable');
    table.style = 'border-spacing: 10px 5px;';


    if(hall.substr(hall.length-2) == '3D' || hall.substr(hall.length-2) == '2D') {
        create_2D_3D_0();
        create_2D_3D_1();
        create_2D_3D_M();
    }
    function create_2D_3D_0() {
        for(let i = 0; i < 1; i++) {
            let tr = document.createElement('tr');
            tr.classList.add('place-tr');
            tr.style = 'width: 500px';

            if(i == 0) {
                for(let j = 0; j < 16; j++) {
                    if(j == 1 || j == 2) {
                        let td = document.createElement('td');
                        td.classList.add('place-td');
                        td.style = 'width: 25px; height: 25px;';
                        tr.appendChild(td);
                    } else if(j == 0) {
                        let td = document.createElement('td');
                        td.classList.add('place-td');
                        td.innerHTML = 'Row 1';
                        td.style = 'width: 50px; height: 25px;';
                        tr.appendChild(td);
                    } else {
                        let td = document.createElement('td');
                        td.classList.add('place-td');
                        td.classList.add('place-td2');
                        td.innerHTML = `${j - 2}`;
                        td.id = `${i + 1}`;
                        td.style = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                        let tdd = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                        td.addEventListener('click', function() {
                            if(tdd == 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;' && td.className != 'place-td place-td2 rownum') {
                                if(placeArr2.length == 0) {
                                    placeArr2[0] = new Array();
                                    placeArr2[0].push(td.id);
                                    placeArr2[0].push(td.innerHTML);
                                    //alert(placeArr2);
                                    total += price;
                                    ttooll.innerHTML = `Total: ${total}`;
                                } else {
                                    for(let i = placeArr2.length; i < placeArr2.length + 1; i+=2) {
                                        placeArr2[i] = new Array();
                                        placeArr2[i].push(td.id);
                                        placeArr2[i].push(td.innerHTML); 
                                        total += price;
                                        ttooll.innerHTML = `Total: ${total}`;
                                    }
                                    //alert(placeArr2);
                                }
                                td.style = 'width: 25px; height: 25px; background-color: #43AE32; text-align: center; align-items: center; color: white;';
                                tdd = 'width: 25px; height: 25px; background-color: #43AE32; text-align: center; align-items: center; color: white;';
                            } else {
                                for(let i = 0; i < placeArr2.length; i++) {
                                        if(td.id == placeArr2[i][0] && td.innerHTML == placeArr2[i][1]) {
                                            placeArr2.splice(i,1);
                                            total -= price;
                                            ttooll.innerHTML = `Total: ${total}`;
                                        }
                                }
                                //alert(placeArr2);
                                td.style = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                                tdd = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                            }
                            //alert(total);
                        });
                        tr.appendChild(td);
                    }
                }  
                document.querySelector('#placeTable').appendChild(tr); 
            }
        }
    }

    function create_2D_3D_1() {
        for(let i = 0; i < 1; i++) {
            let tr = document.createElement('tr');
            tr.classList.add('place-tr');
            tr.style = 'width: 500px';

            if(i == 0) {
                for(let j = 0; j < 16; j++) {
                    if(j == 1) {
                        let td = document.createElement('td');
                        td.classList.add('place-td');
                        td.style = 'width: 25px; height: 25px;';
                        tr.appendChild(td);
                    } else if(j == 0) {
                        let td = document.createElement('td');
                        td.classList.add('place-td');
                        td.innerHTML = 'Row 2';
                        td.style = 'width: 50px; height: 25px;';
                        tr.appendChild(td);
                    } else {
                        let td = document.createElement('td');
                        td.classList.add('place-td');
                        td.id = `${i + 2}`;
                        td.innerHTML = `${j - 1}`;
                        td.style = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                        let tdd = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                        td.addEventListener('click', function() {
                            if(tdd == 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;' && td.className != 'place-td rownum') {
                                if(placeArr2.length == 0) {
                                    placeArr2[0] = new Array();
                                    placeArr2[0].push(td.id);
                                    placeArr2[0].push(td.innerHTML);
                                    total += price;
                                    ttooll.innerHTML = `Total: ${total}`;
                                    //alert(placeArr2);
                                } else {
                                    for(let i = placeArr2.length; i < placeArr2.length + 1; i+=2) {
                                        placeArr2[i] = new Array();
                                        placeArr2[i].push(td.id);
                                        placeArr2[i].push(td.innerHTML); 
                                        total += price;
                                        ttooll.innerHTML = `Total: ${total}`;
                                    }
                                   // alert(placeArr2);
                                }
                                td.style = 'width: 25px; height: 25px; background-color: #43AE32; text-align: center; align-items: center; color: white;';
                                tdd = 'width: 25px; height: 25px; background-color: #43AE32; text-align: center; align-items: center; color: white;';
                            } else {
                                for(let i = 0; i < placeArr2.length; i++) {
                                        if(td.id == placeArr2[i][0] && td.innerHTML == placeArr2[i][1]) {
                                            placeArr2.splice(i,1);
                                            total -= price;
                                            ttooll.innerHTML = `Total: ${total}`;
                                        }
                                }
                                //alert(placeArr2);
                                td.style = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                                tdd = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                            }
                        //alert(total);
                        });
                        tr.appendChild(td);
                    }
                }  
                document.querySelector('#placeTable').appendChild(tr); 
            }
        }
    }

    function create_2D_3D_M() {
        for(let i = 0; i < 9; i++) {
            let tr = document.createElement('tr');
            tr.classList.add('place-tr');
            tr.style = 'width: 500px';

        for(let j = 0; j < 15; j++) {
            if(j == 0) {
                let td = document.createElement('td');
                td.classList.add('place-td');
                td.innerHTML = `Row ${i + 3}`;
                td.style = 'width: 70px; height: 25px;';
                tr.appendChild(td);
            }
            let td = document.createElement('td');
            td.classList.add('place-td');
            td.id = `${i + 3}`;
            td.innerHTML = `${j + 1}`;
            td.style = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
            let tdd = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
            td.addEventListener('click', function() {
                if(tdd == 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;' && td.className != 'place-td rownum') {
                    if(placeArr2.length == 0) {
                        placeArr2[0] = new Array();
                        placeArr2[0].push(td.id);
                        placeArr2[0].push(td.innerHTML);
                        total += price;
                        ttooll.innerHTML = `Total: ${total}`;
                        //alert(placeArr2);
                    } else {
                        for(let i = placeArr2.length; i < placeArr2.length + 1; i+=2) {
                            placeArr2[i] = new Array();
                            placeArr2[i].push(td.id);
                            placeArr2[i].push(td.innerHTML); 
                            total += price;
                            ttooll.innerHTML = `Total: ${total}`;
                        }
                        //alert(placeArr2);
                    }
                    td.style = 'width: 25px; height: 25px; background-color: #43AE32; text-align: center; align-items: center; color: white;';
                    tdd = 'width: 25px; height: 25px; background-color: #43AE32; text-align: center; align-items: center; color: white;';
                } else {
                    for(let i = 0; i < placeArr2.length; i++) {
                            if(td.id == placeArr2[i][0] && td.innerHTML == placeArr2[i][1]) {
                                placeArr2.splice(i,1);
                                total -= price;
                                ttooll.innerHTML = `Total: ${total}`;
                            }
                    }
                    //alert(placeArr2);
                    td.style = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                    tdd = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                }
                //alert(total);
            });
            tr.appendChild(td);
        }
        document.querySelector('#placeTable').appendChild(tr);
    }
}


if(hall.substr(hall.length-2) == '4D') {
    create_4D_0();
    create_4D_1();
    create_4D_M();
}
function create_4D_0() {
    for(let i = 0; i < 1; i++) {
        let tr = document.createElement('tr');
        tr.classList.add('place-tr');
        tr.style = 'width: 500px';

        if(i == 0) {
            for(let j = 0; j < 14; j++) {
                if(j == 1 || j == 2) {
                    let td = document.createElement('td');
                    td.classList.add('place-td');
                    td.style = 'width: 25px; height: 25px;';
                    tr.appendChild(td);
                } else if(j == 0) {
                    let td = document.createElement('td');
                    td.classList.add('place-td');
                    td.innerHTML = 'Row 1';
                    td.style = 'width: 50px; height: 25px;';
                    tr.appendChild(td);
                } else {
                    let td = document.createElement('td');
                    td.classList.add('place-td');
                    td.innerHTML = `${j - 2}`;
                    td.id = `${i + 1}`;
                    td.style = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                    let tdd = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                    td.addEventListener('click', function() {
                        if(tdd == 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;' && td.className != 'place-td rownum') {
                            if(placeArr2.length == 0) {
                                placeArr2[0] = new Array();
                                placeArr2[0].push(td.id);
                                placeArr2[0].push(td.innerHTML);
                                total += price;
                                ttooll.innerHTML = `Total: ${total}`;
                                //alert(placeArr2);
                            } else {
                                for(let i = placeArr2.length; i < placeArr2.length + 1; i+=2) {
                                    placeArr2[i] = new Array();
                                    placeArr2[i].push(td.id);
                                    placeArr2[i].push(td.innerHTML); 
                                    total += price;
                                    ttooll.innerHTML = `Total: ${total}`;
                                }
                                //alert(placeArr2);
                            }
                            td.style = 'width: 25px; height: 25px; background-color: #43AE32; text-align: center; align-items: center; color: white;';
                            tdd = 'width: 25px; height: 25px; background-color: #43AE32; text-align: center; align-items: center; color: white;';
                        } else {
                            for(let i = 0; i < placeArr2.length; i++) {
                                    if(td.id == placeArr2[i][0] && td.innerHTML == placeArr2[i][1]) {
                                        placeArr2.splice(i,1);
                                        total -= price;
                                        ttooll.innerHTML = `Total: ${total}`;
                                    }
                            }
                            //alert(placeArr2);
                            td.style = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                            tdd = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                        }
                       // alert(total);
                    });
                    tr.appendChild(td);
                }
            }  
            document.querySelector('#placeTable').appendChild(tr); 
        }
    }
}

function create_4D_1() {
    for(let i = 0; i < 1; i++) {
        let tr = document.createElement('tr');
        tr.classList.add('place-tr');
        tr.style = 'width: 500px';

        if(i == 0) {
            for(let j = 0; j < 14; j++) {
                if(j == 1) {
                    let td = document.createElement('td');
                    td.classList.add('place-td');
                    td.style = 'width: 25px; height: 25px;';
                    tr.appendChild(td);
                } else if(j == 0) {
                    let td = document.createElement('td');
                    td.classList.add('place-td');
                    td.innerHTML = 'Row 2';
                    td.style = 'width: 50px; height: 25px;';
                    tr.appendChild(td);
                }else {
                    let td = document.createElement('td');
                    td.classList.add('place-td');
                    td.innerHTML = `${j - 1}`;
                    td.id = `${i + 2}`;
                    td.style = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                    let tdd = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                    td.addEventListener('click', function() {
                        if(tdd == 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;' && td.className != 'place-td rownum') {
                            if(placeArr2.length == 0) {
                                placeArr2[0] = new Array();
                                placeArr2[0].push(td.id);
                                placeArr2[0].push(td.innerHTML);
                                total += price;
                                ttooll.innerHTML = `Total: ${total}`;
                                //alert(placeArr2);
                            } else {
                                for(let i = placeArr2.length; i < placeArr2.length + 1; i+=2) {
                                    placeArr2[i] = new Array();
                                    placeArr2[i].push(td.id);
                                    placeArr2[i].push(td.innerHTML); 
                                    total += price;
                                    ttooll.innerHTML = `Total: ${total}`;
                                }
                                //alert(placeArr2);
                            }
                            td.style = 'width: 25px; height: 25px; background-color: #43AE32; text-align: center; align-items: center; color: white;';
                            tdd = 'width: 25px; height: 25px; background-color: #43AE32; text-align: center; align-items: center; color: white;';
                        } else {
                            for(let i = 0; i < placeArr2.length; i++) {
                                    if(td.id == placeArr2[i][0] && td.innerHTML == placeArr2[i][1]) {
                                        placeArr2.splice(i,1);
                                        total -= price;
                                        ttooll.innerHTML = `Total: ${total}`;
                                    }
                            }
                            //alert(placeArr2);
                            td.style = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                            tdd = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                        }
                        //alert(total);
                    });
                    tr.appendChild(td);
                }
            }  
            document.querySelector('#placeTable').appendChild(tr); 
        }
    }
}

function create_4D_M() {
    for(let i = 0; i < 8; i++) {
        let tr = document.createElement('tr');
        tr.classList.add('place-tr');
        tr.style = 'width: 500px';

    for(let j = 0; j < 13; j++) {
        if(j == 0) {
            let td = document.createElement('td');
            td.classList.add('place-td');
            td.innerHTML = `Row ${i + 3}`;
            td.style = 'width: 70px; height: 25px;';
            tr.appendChild(td);
        }
        let td = document.createElement('td');
        td.classList.add('place-td');
        td.id = `${i + 3}`;
        td.innerHTML = `${j + 1}`;
        td.style = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
        let tdd = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
        td.addEventListener('click', function() {
            if(tdd == 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;' && td.className != 'place-td rownum') {
                if(placeArr2.length == 0) {
                    placeArr2[0] = new Array();
                    placeArr2[0].push(td.id);
                    placeArr2[0].push(td.innerHTML);
                    total += price;
                    ttooll.innerHTML = `Total: ${total}`;
                    //alert(placeArr2);
                } else {
                    for(let i = placeArr2.length; i < placeArr2.length + 1; i+=2) {
                        placeArr2[i] = new Array();
                        placeArr2[i].push(td.id);
                        placeArr2[i].push(td.innerHTML); 
                        total += price;
                        ttooll.innerHTML = `Total: ${total}`;
                    }
                    //alert(placeArr2);
                }
                td.style = 'width: 25px; height: 25px; background-color: #43AE32; text-align: center; align-items: center; color: white;';
                tdd = 'width: 25px; height: 25px; background-color: #43AE32; text-align: center; align-items: center; color: white;';
            } else {
                for(let i = 0; i < placeArr2.length; i++) {
                        if(td.id == placeArr2[i][0] && td.innerHTML == placeArr2[i][1]) {
                            placeArr2.splice(i,1);
                            total -= price;
                            ttooll.innerHTML = `Total: ${total}`;
                        }
                }
                //alert(placeArr2);
                td.style = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                tdd = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
            }
            //alert(total);
        });
        tr.appendChild(td);
    }
    document.querySelector('#placeTable').appendChild(tr);
}
}


if(hall.substr(hall.length-4) == 'IMAX') {
    create_IMAX_0();
    create_IMAX_1();
    create_IMAX_M();
}
function create_IMAX_0() {
    for(let i = 0; i < 1; i++) {
        let tr = document.createElement('tr');
        tr.classList.add('place-tr');
        tr.style = 'width: 500px';

        if(i == 0) {
            for(let j = 0; j < 21; j++) {
                if(j == 1 || j == 2) {
                    let td = document.createElement('td');
                    td.classList.add('place-td');
                    td.style = 'width: 25px; height: 25px;';
                    tr.appendChild(td);
                } else if(j == 0) {
                    let td = document.createElement('td');
                    td.classList.add('place-td');
                    td.innerHTML = 'Row 1';
                    td.style = 'width: 50px; height: 25px;';
                    tr.appendChild(td);
                } else {    
                    let td = document.createElement('td');
                    td.classList.add('place-td');
                    td.innerHTML = `${j - 2}`;
                    td.id = `${i + 1}`;
                    td.style = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                    let tdd = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                    td.addEventListener('click', function() {
                        if(tdd == 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;' && td.className != 'place-td rownum') {
                            if(placeArr2.length == 0) {
                                placeArr2[0] = new Array();
                                placeArr2[0].push(td.id);
                                placeArr2[0].push(td.innerHTML);
                                total += price;
                                ttooll.innerHTML = `Total: ${total}`;
                                //alert(placeArr2);
                            } else {
                                for(let i = placeArr2.length; i < placeArr2.length + 1; i+=2) {
                                    placeArr2[i] = new Array();
                                    placeArr2[i].push(td.id);
                                    placeArr2[i].push(td.innerHTML); 
                                    total += price;
                                    ttooll.innerHTML = `Total: ${total}`;
                                }
                                //alert(placeArr2);
                            }
                            td.style = 'width: 25px; height: 25px; background-color: #43AE32; text-align: center; align-items: center; color: white;';
                            tdd = 'width: 25px; height: 25px; background-color: #43AE32; text-align: center; align-items: center; color: white;';
                        } else {
                            for(let i = 0; i < placeArr2.length; i++) {
                                    if(td.id == placeArr2[i][0] && td.innerHTML == placeArr2[i][1]) {
                                        placeArr2.splice(i,1);
                                        total -= price;
                                        ttooll.innerHTML = `Total: ${total}`;
                                    }
                            }
                            //alert(placeArr2);
                            td.style = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                            tdd = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                        }
                       // alert(total);
                    });
                    tr.appendChild(td);
                }
            }  
            document.querySelector('#placeTable').appendChild(tr); 
        }
    }
}

function create_IMAX_1() {
    for(let i = 0; i < 1; i++) {
        let tr = document.createElement('tr');
        tr.classList.add('place-tr');
        tr.style = 'width: 500px';

        if(i == 0) {
            for(let j = 0; j < 21; j++) {
                if(j == 1) {
                    let td = document.createElement('td');
                    td.classList.add('place-td');
                    td.style = 'width: 25px; height: 25px;';
                    tr.appendChild(td);
                } else if(j == 0) {
                    let td = document.createElement('td');
                    td.classList.add('place-td');
                    td.innerHTML = 'Row 2';
                    td.style = 'width: 50px; height: 25px;';
                    tr.appendChild(td);
                } else {
                    let td = document.createElement('td');
                    td.classList.add('place-td');
                    td.innerHTML = `${j - 1}`;
                    td.id = `${i + 2}`;
                    td.style = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                    let tdd = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                    td.addEventListener('click', function() {
                        if(tdd == 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;' && td.className != 'place-td rownum') {
                            if(placeArr2.length == 0) {
                                placeArr2[0] = new Array();
                                placeArr2[0].push(td.id);
                                placeArr2[0].push(td.innerHTML);
                                total += price;
                                ttooll.innerHTML = `Total: ${total}`;
                                //alert(placeArr2);
                            } else {
                                for(let i = placeArr2.length; i < placeArr2.length + 1; i+=2) {
                                    placeArr2[i] = new Array();
                                    placeArr2[i].push(td.id);
                                    placeArr2[i].push(td.innerHTML); 
                                    total += price;
                                    ttooll.innerHTML = `Total: ${total}`;
                                }
                                //alert(placeArr2);
                            }
                            td.style = 'width: 25px; height: 25px; background-color: #43AE32; text-align: center; align-items: center; color: white;';
                            tdd = 'width: 25px; height: 25px; background-color: #43AE32; text-align: center; align-items: center; color: white;';
                        } else {
                            for(let i = 0; i < placeArr2.length; i++) {
                                    if(td.id == placeArr2[i][0] && td.innerHTML == placeArr2[i][1]) {
                                        placeArr2.splice(i,1);
                                        total -= price;
                                        ttooll.innerHTML = `Total: ${total}`;
                                    }
                            }
                            //alert(placeArr2);
                            td.style = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                            tdd = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                        }
                        //alert(total);
                    });
                    tr.appendChild(td);
                }
            }  
            document.querySelector('#placeTable').appendChild(tr); 
        }
    }
}

function create_IMAX_M() {
    for(let i = 0; i < 15; i++) {
        let tr = document.createElement('tr');
        tr.classList.add('place-tr');
        tr.style = 'width: 500px';

    for(let j = 0; j < 20; j++) {
        if(j == 0) {
            let td = document.createElement('td');
            td.classList.add('place-td');
            td.innerHTML = `Row ${i + 3}`;
            td.style = 'width: 70px; height: 25px;';
            tr.appendChild(td);
        }
        let td = document.createElement('td');
        td.classList.add('place-td');
        td.innerHTML = `${j + 1}`;
        td.id = `${i + 3}`;
        td.style = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
        let tdd = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
        td.addEventListener('click', function() {
            if(tdd == 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;' && td.className != 'place-td rownum') {
                if(placeArr2.length == 0) {
                    placeArr2[0] = new Array();
                    placeArr2[0].push(td.id);
                    placeArr2[0].push(td.innerHTML);
                    total += price;
                    ttooll.innerHTML = `Total: ${total}`;
                    //alert(placeArr2);
                } else {
                    for(let i = placeArr2.length; i < placeArr2.length + 1; i+=2) {
                        placeArr2[i] = new Array();
                        placeArr2[i].push(td.id);
                        placeArr2[i].push(td.innerHTML); 
                        total += price;
                        ttooll.innerHTML = `Total: ${total}`;
                    }
                    //alert(placeArr2);
                }
                td.style = 'width: 25px; height: 25px; background-color: #43AE32; text-align: center; align-items: center; color: white;';
                tdd = 'width: 25px; height: 25px; background-color: #43AE32; text-align: center; align-items: center; color: white;';
            } else {
                for(let i = 0; i < placeArr2.length; i++) {
                        if(td.id == placeArr2[i][0] && td.innerHTML == placeArr2[i][1]) {
                            placeArr2.splice(i,1);
                            total -= price;
                            ttooll.innerHTML = `Total: ${total}`;
                        }
                }
                //alert(placeArr2);
                td.style = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
                tdd = 'width: 25px; height: 25px; background-color: #330570; text-align: center; align-items: center; color: white;';
            }
            //alert(total);
        });
        tr.appendChild(td);
    }
    document.querySelector('#placeTable').appendChild(tr);
}
}

let requestURL3 = 'https://restapicinema.herokuapp.com/sessions';
let request3 = new XMLHttpRequest();
request3.open('GET', requestURL3, true);
request3.responseType = 'json';
request3.send();
request3.onload = function() {
    var films3 = request3.response;
    populatePrice(films3);
  }

  function populatePrice(jsonObj) {
        for(let i = 0; i < jsonObj.length; i++) {
            if(idSession == jsonObj[i]['idsession']) {
                price = jsonObj[i]['baseprice']
                //section1alert(price);
                break;
            }
        }
  }

   let basket = document.querySelector('.basket_button');
   basket.style = 'width:159px; height:35px; background-color: #6200EE; border:2px solid #6200EE; color:white; font-size:25px; box-shadow: 0 0 10px rgba(0,0,0,0.5); margin-top:135px; margin-left:30px';
   basket.addEventListener('click', function() {
        localStorage.setItem('placeArr', placeArr2);
        localStorage.setItem('total', total);
        location.href = '../basket/basket.html';
        
   });

   let divt = document.querySelector('.pick-place');
   divt.style = 'margin-top:30px;';