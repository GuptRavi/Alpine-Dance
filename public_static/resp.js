burger = document.querySelector('.burger');
navbar = document.querySelector('.navbar');
nav = document.querySelector('.nav');



burger.addEventListener('click', ()=>{
  nav.classList.toggle('v-class-resp')

  navbar.classList.toggle('h-nav-resp')
})