const iptext = document.querySelector(".ip-container>p>span");
const button = document.getElementById('strt');
let ip;


let apiKey = 'bdc_ac4311bae900437498da128c1b58717f';
$.getJSON('https://api.bigdatacloud.net/data/ip-geolocation?key=' + apiKey, function(data) {
  iptext.innerText = data.ip;
  ip=data.ip;
  fetchIpdetails();
  button.addEventListener('click',(e)=>{
    window.location.href = "./result/resultPage.html";
 });
});



 async function fetchIpdetails(){
  let url = `https://ipapi.co/${ip}/json/`;
try{
  let response = await fetch(url);
  let result = await response.json();
   addToCookie(result);
}
catch(error){
  window.alert(" error is occured while fetching ")
}
 }


 function addToCookie(result){
  console.log(result);
  let data = {
    Ip:result.ip,
    City:result.city,
    Region: result.region,
    Postal:result.postal,
    Latitude:result.latitude,
    Longitude:result.longitude,
    Timezone:result.timezone,
    Organization:result.org
  }

  let stringdata = JSON.stringify(data);
  document.cookie =`datas=${stringdata}; path = /`;
 }