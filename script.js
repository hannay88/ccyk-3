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
