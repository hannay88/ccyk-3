document.addEventListener("DOMContentLoaded", () => {

const registerForm = document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit",function(e){

e.preventDefault();

const user={

name:document.getElementById("registerName").value,

age:document.getElementById("registerAge").value,

phone:document.getElementById("registerPhone").value,

password:document.getElementById("registerPassword").value

};

localStorage.setItem("ccykUser",JSON.stringify(user));

alert("Account Created Successfully");

window.location.href="login.html";

});

}

const loginForm=document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit",function(e){

e.preventDefault();

const phone=document.getElementById("phone").value;

const password=document.getElementById("password").value;

const saved=JSON.parse(localStorage.getItem("ccykUser"));

if(saved && saved.phone===phone && saved.password===password){

alert("Welcome "+saved.name);

window.location.href="index.html";

}else{

alert("Wrong Phone or Password");

}

});

}

});
const likeBtn=document.getElementById("likeBtn");

if(likeBtn){

likeBtn.onclick=function(){

alert("❤️ You Liked Su Su");

}

}

const passBtn=document.getElementById("passBtn");

if(passBtn){

passBtn.onclick=function(){

alert("Next Profile");

}

}
const profiles = [
{
name:"Su Su",
age:23,
city:"Yangon",
hobby:"Coffee ☕ | Travel ✈️ | Music 🎵",
photo:"https://picsum.photos/500/600?1"
},
{
name:"Aye Aye",
age:25,
city:"Mandalay",
hobby:"Reading 📚 | Movies 🎬",
photo:"https://picsum.photos/500/600?2"
},
{
name:"May May",
age:22,
city:"Bago",
hobby:"Food 🍜 | Singing 🎤",
photo:"https://picsum.photos/500/600?3"
}
];

let currentProfile = 0;
