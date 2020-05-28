let a1 = localStorage.getItem('imgSrc');
alert(a1);
let filmId;
let section1 = document.querySelector('.container select');

let requestURL3 = 'https://restapicinema.herokuapp.com/cinema';
let request3 = new XMLHttpRequest();
request3.open('GET', requestURL3, true);
request3.responseType = 'json';
request3.send();
request3.onload = function() {
    var films3 = request3.response;
    populateCinemas(films3);
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

    function checkList() {
        var select = document.getElementsByClassName('options');
            address = this.value;
            alert(address);
            //alert(currentCinema);
    }

let requestURL4 = 'https://restapicinema.herokuapp.com/films';
    let request4 = new XMLHttpRequest();
    request4.open('GET', requestURL4, true);
    request4.responseType = 'json';
    request4.send();
    request4.onload = function() {
        var films4 = request4.response;
        chooseFilm(films4);
}

function chooseFilm(jsonObj) {
    for(let i = 0; i<jsonObj.length; i++) {
        if(a1 == jsonObj[i]['image'] || a1 == jsonObj[i]['name']) {
            filmId = jsonObj[i]['idfilm'];
            localStorage.setItem('filmId', filmId);
            alert(filmId);
            let img = document.createElement('img');
            img.src = jsonObj[i]['image'];
            img.classList.add('image-film');
            img.style = 'max-width: 300px; width: auto; margin: 30px 30px;';
            document.querySelector('.up').appendChild(img);

            let vdiv = document.createElement('div');
            vdiv.classList.add('video');
            document.querySelector('.up').appendChild(vdiv);
            if(jsonObj[i]['trailer'] === null) {
                let imgv = document.createElement('img');
                imgv.src = 'https://pmcvariety.files.wordpress.com/2013/10/film-placeholder.jpg?w=600';
                imgv.style = 'width: 600px;';
                document.querySelector('.video').appendChild(imgv);
            } else {
            let video1 = document.createElement('iframe');
            video1.src = jsonObj[i]['trailer'];
            video1.style = 'width: 600px; height: 425px;';
            video1.frameBorder = '0';
            document.querySelector('.video').appendChild(video1);
            }
            let div = document.querySelector('.up');
            div.style = 'display: flex; align-items: center;';
           /* let video = document.createElement('video');
            video.src = jsonObj[i]['trailer'];
            video.type = 'video/mp4';
            video.controls = true;
            video.classList.add('video-film');
            document.querySelector('.img-video').appendChild(video);*/

            let h1 = document.createElement('h1');
            h1.innerHTML = jsonObj[i]['name'];
            document.querySelector('.description').appendChild(h1);

            let p1 = document.createElement('h3');
            p1.innerHTML = jsonObj[i]['genre'];
            document.querySelector('.description').appendChild(p1);

            let p2 = document.createElement('h3');
            p2.innerHTML = jsonObj[i]['ageLimit'];
            document.querySelector('.description').appendChild(p2);

            let p3 = document.createElement('h3');
            p3.innerHTML = jsonObj[i]['description'];
            document.querySelector('.description').appendChild(p3);

            let desc = document.querySelector('.description');
            desc.style = 'width: 550px';
        }
    }
}

let input;
let filmDate;
let getFilmData;
let getFilmDataDB;
let hourStart = [];
let minuteStart = [];
let hourEnd = [];
let minuteEnd = [];
let filmDateArr = [];
let hallsArr = [];
let hallsInfo = [];
let idSession = [];


document.getElementById('date-input').addEventListener('change', function() {
    input = this.value;
    filmDate = new Date(input);
    //alert(filmDate);
});


document.getElementById('input-button').addEventListener('click', getFilmDate);
document.getElementById('input-button').addEventListener('click', getFilmDateDB);
document.getElementById('input-button').addEventListener('click', infoHalls);


function getFilmDate() {
    let month = String(filmDate.getMonth() + 1);
    let day = String(filmDate.getDate());
    const year = String(filmDate.getFullYear());
    getFilmData = `${day}/${month}/${year}`;
    //alert(getFilmData);
}

function getFilmDateDB() {
    let requestURL2 = 'https://restapicinema.herokuapp.com/sessions';
    let request2 = new XMLHttpRequest();
    request2.open('GET', requestURL2, true);
    request2.responseType = 'json';
    request2.send();
    request2.onload = function() {
        var films2 = request2.response;
        chooseDate(films2);
    }

    function chooseDate(jsonObj) {
        hourStart = [];
        minuteStart = [];
        hourEnd = [];
        minuteEnd = [];
        filmDateArr = [];
        hallsArr = [];
        hallsInfo = [];
        for(let i = 0; i<jsonObj.length; i++) {
            let month = String(jsonObj[i]['start'].substring(5, 7));
            if(month[0] == '0') {
                month = month.substring(1);
            }
            let day = String(jsonObj[i]['start'].substring(8, 10));
            if(day[0] == '0') {
                day = day.substring(1);
            }
            const year = String(jsonObj[i]['start'].substring(0, 4));
            getFilmDataDB = `${day}/${month}/${year}`;
            if(getFilmData == getFilmDataDB && filmId == jsonObj[i]['idfilm']) {
                idSession.push(jsonObj[i]['idsession']);
                hallsArr.push(jsonObj[i]['idhall']);
                hourStart.push(String(jsonObj[i]['start'].substring(11, 13)));
                minuteStart.push(String(jsonObj[i]['start'].substring(14, 16)));
                hourEnd.push(String(jsonObj[i]['end'].substring(11, 13)));
                minuteEnd.push(String(jsonObj[i]['end'].substring(14, 16)));
                filmDateArr.push(getFilmDataDB);
                alert(hourStart);
                alert(minuteStart);
                alert(filmDateArr);
            }
        }
    }
}


function infoHalls() {
    let requestURL = 'https://restapicinema.herokuapp.com/halls';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL, true);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        var films = request.response;
        chooseHall(films);
    }
    
    function chooseHall(jsonObj) {
        for(let i = 0; i<jsonObj.length; i++) {
            for(let j = 0; j<hallsArr.length; j++) {
                if(hallsArr[j] == jsonObj[i]['idhall']) {
                    hallsInfo.push(`${jsonObj[i]['name']}, ${jsonObj[i]['type']}`);
                    alert(hallsInfo);
                }
            }
        }
        showHalls();
        function showHalls() {
            let d = document.getElementById('halls-info');
            let d_n = document.getElementsByClassName('div1');
            if(d.childNodes) {
                while(d.firstChild) {
                    d.removeChild(d.firstChild);
                }
            }
            for(let i = 0; i < hallsArr.length; i++) {
                    let div1 = document.createElement('div');
                    div1.classList.add('div1');
                    document.querySelector('.halls-info').appendChild(div1);

                    let div2 = document.createElement('div');
                    div2.classList.add('div2');
                    document.querySelector('.div1').appendChild(div2);
                    
                    let button = document.createElement('button');
                    button.classList.add('div1-button');
                    button.innerHTML = 'OK';
                    button.value = `${hallsInfo[i]}`;
                    button.id = `${idSession[i]}`;
                    document.querySelector('.div1').appendChild(button);
                    button.addEventListener('click', function() {
                        localStorage.setItem('hall', button.value);
                        localStorage.setItem('idSession', button.id);
                        localStorage.setItem('date', getFilmData);
                        window.location.href = '../pickPlace/pickPlace.html';
                    });

                    let p1 = document.createElement('p');
                    p1.classList.add('div2-p2');
                    p1.innerHTML = `${hallsInfo[i]}`;
                    document.querySelector('.div2').appendChild(p1);

                    let p2 = document.createElement('p');
                    p2.classList.add('div2-p2');
                    p2.innerHTML = `${hourStart[i]}:${minuteStart[i]} - ${hourEnd[i]}:${minuteEnd[i]}`;
                    document.querySelector('.div2').appendChild(p2);
                }
            }
        }   
    }
}

let userArrName = [];


//function getReviews(jsonObj) {
window.onload = function() {
    let requestURL6 = 'https://restapicinema.herokuapp.com/accounts';
    let request6 = new XMLHttpRequest();
    request6.open('GET', requestURL6, true);
    request6.responseType = 'json';
    request6.send();
    request6.onload = function() {
        var films6 = request6.response;
        getUsers(films6);
    }
let stars = 0;
let comment = 0;
let result;
    function getUsers(jsonObj) {
        for(let i = 0; i < jsonObj.length; i++) {
            // placeArr2[i] = new Array();
            //                 placeArr2[i].push(td.id);
            //                 placeArr2[i].push(td.innerHTML); 
            userArrName[i] = new Array();
            userArrName[i].push(jsonObj[i]['idaccount']);
            userArrName[i].push(jsonObj[i]['name']);
        }
        alert(userArrName);

        let requestURL5 = 'https://restapicinema.herokuapp.com/reviews';
        let request5 = new XMLHttpRequest();
        request5.open('GET', requestURL5, true);
        request5.responseType = 'json';
        request5.send();
        request5.onload = function() {
            var films5 = request5.response;
            getReviews(films5);
        }

        function getReviews(jsonObj) {
            stars = 0;
            comment = 0;
            for(let i = 0; i < jsonObj.length; i++) {
                if(filmId == jsonObj[i]['idfilm']) {
                    let divRev = document.createElement('div');
                    divRev.classList.add(`divRev${i}`);
                    divRev.style = 'width: 650px; border: 2px solid #474441; margin: 30px 30px;';
                    document.querySelector('.reviews').appendChild(divRev);
                    for(let j = 0; j < userArrName.length; j++) {
                        if(userArrName[j][0] == jsonObj[i]['idaccount']) {
                            comment++;
                            let name = document.createElement('h3');
                            name.innerHTML = userArrName[j][1];
                            document.querySelector(`.divRev${i}`).appendChild(name);

                            let text = document.createElement('p');
                            text.innerHTML = jsonObj[i]['text'];
                            document.querySelector(`.divRev${i}`).appendChild(text);
                            for(let k = 0; k < jsonObj[i]['mark']; k++) {
                                let star = document.createElement('i');
                                star.classList.add('fa-star');
                                star.classList.add('fas');
                                star.style = 'width:30px; color: #6200EE;';
                                document.querySelector(`.divRev${i}`).appendChild(star);
                                stars++;
                            }
                        }
                    }
                }
            }
            result = Math.floor(stars / comment);
            alert(result);
            let fb = document.createElement('h2');
            fb.innerHTML = 'Leave feedback';
            fb.style = 'margin: 10px 30px';
            document.querySelector('.reviews').appendChild(fb);

            let feedback = document.createElement('input');
            feedback.type = 'text';
            feedback.placeholder = 'Feedback...';
            feedback.style = 'width: 650px; margin: 30px 30px; height:50px';
            document.querySelector('.reviews').appendChild(feedback);

            let subm = document.createElement('button');
            subm.innerHTML = 'Leave';
            subm.style = 'width:100px; height:35px; background-color:#6200EE;font-size:18px; color:white;';
            document.querySelector('.reviews').appendChild(subm);

            let mark = document.createElement('h3');
            mark.innerHTML = 'Mark';
            document.querySelector('.description').appendChild(mark);
            for(let i = 0; i < result; i++) {
                let star = document.createElement('i');
                star.classList.add('fa-star');
                star.classList.add('fas');
                star.style = 'width:30px; color: #6200EE;';
                document.querySelector(`.description`).appendChild(star);
            }
        }
    }
}
