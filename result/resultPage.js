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
const postcards = document.getElementsByClassName("post-cards")[0];
const input = document.getElementById('search');


let cookiedata=document.cookie.split("=")[1];
let objdata = JSON.parse(cookiedata);
//console.log(objdata);
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
        message.innerHTML=`Message: ${result[0].Message}`;
        addcardsToUi(result[0].PostOffice);
    }
    catch(error){
        window.alert("error occured while fetching postal details");
    }
}
let Nameobj =[];
let Postobj=[];
function addcardsToUi(result){
  //console.log(result);
  postcards.innerHTML="";
  let arr = result;
  arr.forEach(obj=>{
     data ={};
     data[obj.Name]=obj;
     Nameobj.push(data);
     data={};
     data[obj.BranchType]=obj;
     Nameobj.push(data);
     
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML =`<p id="name">${obj.Name}</p>
    <p id="branchtype">${obj.BranchType}</p>
    <p id="deliverystatus">${obj.DeliveryStatus}</p>
    <p id="district">${obj.District}</p>
    <p id="division">${obj.Division}</p>`;

    postcards.append(card);
  });
//   console.log(Nameobj);
}

fetchPincodes();

input.addEventListener("input",()=>{

    //console.log(1);
    const filterValue = input.value.toLowerCase();
    let arr= new Set();
    Nameobj.forEach(item => {
        let key = Object.keys(item)[0];
         if(key.toLowerCase().includes(filterValue)){
            arr.add(item[key]);
         }
});
let data = [...arr]
// console.log(data);
 if(data.length!=0){
    addcardsToUi(data);
}
});








{/* <div class="card">
<p id="name">name</p>
<p id="branchtype">Branch type</p>
<p id="deliverystatus">deliverystatus</p>
<p id="district">district</p>
<p id="division">divison</p>
</div> */}

