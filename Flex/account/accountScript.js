let idAccount;
let profileName;
let imgURL;
let userEmail;
let bonus;
let btd;

let sessionTicketArr = [];
let totalHours = 0;;

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    idAccount = profile.getId(); // Do not send to your backend! Use an ID token instead.
    profileName = profile.getName();
    imgURL = profile.getImageUrl();
    userEmail = profile.getEmail(); // This is null if the 'email' scope is not present.
  }
//alert('fwo');
//var id_token = googleUser.getAuthResponse().id_token;
//console.log("ID Token: " + id_token);
idAccount = '116652048116762182986';
let requestURL4 = 'https://restapicinema.herokuapp.com/accounts';
let request4 = new XMLHttpRequest();
request4.open('GET', requestURL4, true);
request4.responseType = 'json';
request4.send();
request4.onload = function() {
    var films4 = request4.response;
    appearAccount(films4);
}

let mainDiv = document.querySelector('.user');
mainDiv.style = 'display:flex';

function appearAccount(jsonObj) {
  let truth = false;
    for(let i = 0; i < jsonObj.length; i++) {
        if(jsonObj[i]['idaccount'] == idAccount) {
            alert('Ты уже есть в базе!');
            truth = true;
            
            idAccount = jsonObj[i]['idaccount'];
            profileName = jsonObj[i]['name'];
            imgURL = jsonObj[i]['picture'];
            userEmail = jsonObj[i]['email'];
            bonus = jsonObj[i]['bonus'];
            btd = jsonObj[i]['doB'];

            localStorage.setItem('idAccount', idAccount);
            localStorage.setItem('profileName', profileName);
            localStorage.setItem('userEmail', userEmail);
            localStorage.setItem('imgURL', imgURL);
            localStorage.setItem('bonus', bonus);
            localStorage.setItem('btd', btd);

            showUser();
        } 
    }
    if(truth == false) {
      alert('Тебя нет в базе!');
      /*
      localStorage.setItem('idAccount', idAccount);
      localStorage.setItem('profileName', profileName);
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('imgURL', imgURL);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://restapicinema.herokuapp.com/accounts/add?', true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.onload = function () {
          console.log(this.responseText);
      };
      xhr.send(`idaccount=${idAccount}&name=${profileName}&email=${userEmail}&picture=${imgURL}&date=''&bonus=''`);
      */
    }
}
function showUser() {
    let img = document.createElement('img');
    img.src = imgURL;
    document.querySelector('.userImg').appendChild(img);
    let h3_1 = document.createElement('h3');
    h3_1.innerHTML = `Name: ${profileName}`;
    document.querySelector('.userDesc').appendChild(h3_1);

    let h3_2 = document.createElement('h3');
    h3_2.innerHTML = `Email: ${userEmail}`;
    document.querySelector('.userDesc').appendChild(h3_2);

    let h3_3 = document.createElement('h3');
    h3_3.innerHTML = `Bonuses: ${bonus}`;
    document.querySelector('.userDesc').appendChild(h3_3);

    let h3_4 = document.createElement('h3');
    h3_4.classList.add('h3_4');
    h3_4.innerHTML = `Hours: 0`;
    document.querySelector('.userDesc').appendChild(h3_4);

    let h3_5 = document.createElement('h3');
    h3_5.innerHTML = `Date of birthday: ${btd}`;
    document.querySelector('.userDesc').appendChild(h3_5);

    let h3_6 = document.createElement('h3');
    h3_6.innerHTML = `Rang: Nowby`;
    h3_6.classList.add('h3_6');
    document.querySelector('.userDesc').appendChild(h3_6);
}


let requestURL2 = `https://restapicinema.herokuapp.com/accounts/hours?idaccount=${idAccount}`;
let request2 = new XMLHttpRequest();
request2.open('GET', requestURL2, true);
//request2.responseType = 'json';
request2.send();
request2.onload = function() {
    var films2 = request2.response;
    appearSession(films2);
}

function appearSession(jsonObj) {
  totalHours = 0;
    totalHours = this.responseText;
    let h3_6_2 = document.querySelector('.h3_6');
    if(totalHours == 0) {
      h3_6_2.innerHTML = `Rang: Nowby`;
    } else if(totalHours < 10) {
      h3_6_2.innerHTML = `Rang: Newby`;
    } else if(totalHours < 30) {
      h3_6_2.innerHTML = `Rang: Someone`;
    } else if(totalHours < 50) {
      h3_6_2.innerHTML = `Rang: HuMan`;
    } else if(totalHours < 100) {
      h3_6_2.innerHTML = `Rang: VIP`;
    } else if(totalHours < 150) {
      h3_6_2.innerHTML = `Rang: Legend`;
    } else {
      h3_6_2.innerHTML = `Rang: Flexer`;
    }

    let h3_4_2 = document.querySelector('.h3_4');
    h3_4_2.innerHTML = `Hours: ${totalHours}`;
}