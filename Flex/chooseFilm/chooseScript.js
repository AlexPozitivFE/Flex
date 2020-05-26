let a1 = localStorage.getItem('imgSrc');
alert(a1);
let filmId;

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
            let img = document.createElement('img');
            img.src = jsonObj[i]['image'];
            img.classList.add('image-film');
            img.style = 'max-width: 300px; width: auto; margin: 30px 30px;';
            document.querySelector('.up').appendChild(img);

            let vdiv = document.createElement('div');
            vdiv.classList.add('video');
            document.querySelector('.up').appendChild(vdiv);
            let video1 = document.createElement('iframe');
            video1.src = 'https://www.youtube.com/embed/SlgMigqO_Kc';
            video1.style = 'width: 600px; height: 425px;';
            video1.frameBorder = '0';
            document.querySelector('.video').appendChild(video1);
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
