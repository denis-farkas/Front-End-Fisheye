
 let idPhotographer = getIdPhotographer();
 let idPortfolio = "portfolio"+idPhotographer;

 function getIdPhotographer () {
    const parameterURL = new URLSearchParams(window.location.search);
    const idPhotographer = parseInt(parameterURL.get('id'), 10);
    return idPhotographer;
    }
 
 async function getPhotographers() {
        
    const response = await fetch('./data/photographers.json', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
        });
    const photographers = await response.json()
    return photographers;
    }



async function displayPhotographer(onePhotographer){
    const photographerMain = document.querySelector("main");
    const headerModel = headerFactory(onePhotographer);
    const userHeaderDOM = headerModel.getUserHeaderDOM();
    const userBodyDOM = headerModel.getUserBodyDOM();
    const portfolioSection = headerModel.getPortfolioSectionDOM();
    photographerMain.appendChild(userHeaderDOM);
    photographerMain.appendChild(userBodyDOM);
    userBodyDOM.appendChild(portfolioSection);
    }

async function displayModalContact(onePhotographer){
        const photographerBody =document.querySelector("body");
        const contactModel = modalContactFactory(onePhotographer);
        const userContactModalDOM = contactModel.getModalContactDOM();
        photographerBody.appendChild(userContactModalDOM);
    }


async function displayPortfolio(collection){
    const portfolioBody = document.querySelector(".portfolio_body");
    collection.forEach((item) =>{
        const portfolioModel = portfolioItemFactory(item);
        const userPortfolioDOM = portfolioModel.getPortfolioCardDOM();
        portfolioBody.appendChild(userPortfolioDOM);
    });
   
}

async function getOnePhotographer(photographers, idPhotographer){
    const onePhotographer = photographers.photographers.find(item=>item.id===idPhotographer);
    return onePhotographer;
}


async function getPortfolio(photographers, idPhotographer, idPortfolio){
    
    if(!localStorage.getItem(idPortfolio)){
        const portfolio = photographers.media.filter(item=>item.photographerId===idPhotographer);
    //Ajout d'un index pour faciliter l'affichage en slide
        const indexedPortfolio = portfolio.map((item, index)=>({index, ...item}));
        
        localStorage.setItem(idPortfolio, JSON.stringify(indexedPortfolio));
    }
    const portfolio = JSON.parse(localStorage.getItem(idPortfolio));
    
    return portfolio;
}

async function displayModalSection(){
    const modal = document.querySelector(".lightbox_modal");
    const modalModel = modalMediaFactory();
    const modalSection = modalModel.getModalMediaDOM();
    modal.appendChild(modalSection);
}



function displayLightbox(portfolio) {
    const modalSection = document.querySelector(".body_center");
    portfolio.forEach((item) => {
        const modalMediaModel = modalMediaItemFactory(item);
        const mediaCardDOM = modalMediaModel.getMediaItemDOM();
        modalSection.appendChild(mediaCardDOM);
    });
};




async function init(idPhotographer, idPortfolio){
    
    const photographers = await getPhotographers();
    const onePhotographer = await getOnePhotographer(photographers, idPhotographer);
    localStorage.setItem('onePhotographer', JSON.stringify(onePhotographer));
    const portfolio = await getPortfolio(photographers, idPhotographer, idPortfolio);
   
    displayPhotographer(onePhotographer);
    displayModalContact(onePhotographer);
    displayPortfolio(portfolio);
    displayModalSection();
    displayLightbox(portfolio);
    totalLiked(portfolio);
};

init(idPhotographer, idPortfolio);


//badge Likes
function totalLiked(portfolio){
    let count=0;
    portfolio.forEach((item) =>{
        count = count + item.likes;
    });
    const Total = document.getElementById("total");
    Total.textContent = count;
}



const contact = document.querySelector(".contact_modal");
const lightbox = document.querySelector(".lightbox_modal");
const photographerBody = document.querySelector(".photograph_body");

function displayContactModal(){
contact.style.display = "block";
}

function closeModal(){
contact.style.display = "none";
}

function closeLightbox(){
    lightbox.style.display ="none";
}


//lightbox show slides

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slides");
    if (n > slides.length-1) {slideIndex = 0}
    if (n < 0) {slideIndex = slides.length-1}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
    lightbox.style.display="block";
}

//likes
function liked(id) {
    const like = document.getElementById(id);
    let likes = Number(like.textContent);
    incrementLikes= likes + 1;
    like.textContent = incrementLikes.toString();
}

//fonction menu filtre
function sortPopular( a, b ) {
    if(a.likes > b.likes){
        return -1;
    }
    if(a.likes < b.likes){
        return 1;
    }
    return 0 
}

function sortRecent( a, b ) {
    if(a.date > b.date){
        return -1;
    }
    if(a.date < b.date){
        return 1;
    }
    return 0 
}

function sortTitle( a, b ) {
    if(a.title > b.title){
        return 1;
    }
    if(a.title < b.title){
        return -1;
    }
    return 0 
}

function sortFilter(value, portfolio){

    if(value === "1"){
        let filter = portfolio.sort(sortPopular);
        return filter;
    }else if(value === "2"){
        let filter = portfolio.sort(sortRecent);
        return filter;
    }else if(value === "3"){
        let filter = portfolio.sort(sortTitle);
        return filter;
    }else{
        let filter = portfolio;
        return filter;
    }
    
}



function  changeFilter(value){
console.log(value);
const portfolio = JSON.parse(localStorage.getItem(idPortfolio));
const portfolioBody = document.querySelector(".portfolio_body");
const filter = sortFilter(value, portfolio);
console.log(filter);
portfolioBody.innerHTML=""
displayPortfolio(filter);
displayLightbox(filter);
}




