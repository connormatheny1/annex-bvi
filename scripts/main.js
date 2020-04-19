function openDropdown(ele){
    let dropdown = document.querySelector('.about-dropdown');
    let caret = document.querySelector('.fas');
    if (dropdown.style.display === 'flex'){
        dropdown.style.display = 'none';
        caret.className = 'fas fa-caret-up'
    }
    else{
        dropdown.style.display = 'flex';
        caret.className = 'fas fa-caret-down'
    }
}

const scrollToTopButton = document.getElementById('to-top');
const scrollFunc = () => {
    // Get the current scroll value
    let y = window.scrollY;

    // If the scroll value is greater than the window height, let's add a class to the scroll-to-top button to show it!
    if (y > 0) {
        scrollToTopButton.className = "top-link show";
    } else {
        scrollToTopButton.className = "top-link hide";
    }
};

//to top functionality
window.addEventListener("scroll", scrollFunc);
const scrollToTop = () => {
    //number of pixels from the top
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};

scrollToTopButton.onclick = function (e) {
    e.preventDefault();
    scrollToTop();
}

const ele = document.querySelector('.fas.fa-long-arrow-alt-up');
let pos;
let currentPos;
const animateArrowUp = () => {
    pos = 0;
    const id = setInterval(frame, 2);
    function frame(){
        if(pos == 300){
            clearInterval(id);
        }
        else{
            pos++;
            ele.style.bottom = pos + "px";
        }
    }
}

const animateArrowDown = () => {
    pos = 250;
    const id = setInterval(frame, 2);
    function frame(){
        if(pos == 0){
            clearInterval(id);
        }
        else{
            pos--;
            ele.style.bottom = pos + "px"
        }
    }
}

scrollToTopButton.onmouseenter = function(e) {
    e.preventDefault();
    animateArrowUp();
}

scrollToTopButton.onmouseleave = function(e) {
    e.preventDefault();
    animateArrowDown();
}

const mobileToggle = () => {
    const toggle = document.querySelector('.mobile-toggle');
    const imgs = toggle.childNodes;
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.getElementsByTagName("body")[0];
    for(let i = 1; i < imgs.length; i+=2){
        if(imgs[i].style.paddingRight == "0px"){
            if(i == 3 || i == 5){
                if(i == 3){
                    imgs[i].style.paddingRight = "25px"
                }
                if(i == 5){
                    imgs[i].style.paddingRight = "50px"
                }
            }
        }
        else{
            imgs[i].style.paddingRight = "0px"
        }
    }

    if(window.getComputedStyle(mobileNav, null).getPropertyValue("display") == "none"){
        mobileNav.style.display = "flex"
        mobileNav.style.transition = ".3s";
    }  
    else{
        mobileNav.style.display = "none";
        mobileNav.style.transition = ".3s";
    }
}

function openDropdownMobile(){
    let dropdown = document.querySelector('.mobile-about-dropdown');
    let caret = document.querySelector('.fas');
    if (dropdown.style.display === 'flex'){
        dropdown.style.display = 'none';
        caret.className = 'fas fa-caret-up'
    }
    else{
        dropdown.style.display = 'flex';
        caret.className = 'fas fa-caret-down'
    }
}