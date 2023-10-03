const ipadress = document.querySelector("#ipaddress>span");
const latitude = document.querySelector("#lat>span");
const longitude = document.querySelector("#long>span");
const city = document.querySelector("#city>span");
const region = document.querySelector("#region>span");
const organisation = document.querySelector("#organisation>span");
const hostname = document.querySelector("#hostname>span");
const iframe = document.getElementById("iframe");
const timezone = document.getElementById("timezone");
const date = document.getElementById("date");
const pincode = document.getElementById("pincode");
const message = document.getElementById('message');


let cookiedata=document.cookie.split("=")[1];
let objdata = JSON.parse(cookiedata);
console.log(objdata);
ipadress.innerText = " "+objdata.Ip;
latitude.innerText= " "+objdata.Latitude;
longitude.innerText =" "+objdata.Longitude;
city.innerHTML = " "+objdata.City;
region.innerText =" "+objdata.Region;
organisation.innerText =" "+objdata.Organization;
iframe.src = `https://maps.google.com/maps?q=${objdata.Latitude},${objdata.Longitude}&z=15&output=embed`;

timezone.innerText=`Time Zone: ${objdata.Timezone}`;
pincode.innerText = `Pincode: ${objdata.Postal}`;
date.innerText = `Date And Time: ${findTime()}`;

function findTime(){
    let date = new Date().toLocaleString("en-US", { timeZone: objdata.Timezone });
    return date;
}

async function fetchPincodes(){
    let url = `https://api.postalpincode.in/pincode/${objdata.Postal}`;
    try{
        let response = await fetch(url);
        let result = await response.json();
        addcardsToUi(result);
    }
    catch(error){
        window.alert("error occured while fetching postal details");
    }
}
function addcardsToUi(result){
  console.log(result);
}

fetchPincodes();




//message.innerHTML=`Message: <span>Number of pincode(s) found: ${findlength()}<span>`






