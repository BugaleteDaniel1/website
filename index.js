let controller;
let slideScene;
let pageScene

function animatedSlide(){
    //init controller
    controller = new ScrollMagic.Controller();
    //Select some things
    const sliders = document.querySelectorAll('.slide');
    const nav = document.querySelector('.nav-header');
    // loop over each slide
    sliders.forEach((slide, index, slides) => {
        const revealImg = slide.querySelectorAll('.reveal-img');
        const img = slide.querySelector('img') ;
        const revealText = slide.querySelector('.reveal-text');
        //GSAP
        const slideTl = gsap.timeline({
            defaults: {duration:1, ease: "power2.inOut" }
    });
    slideTl.fromTo(revealImg, {x:'0%'}, {x:'100%'});
    slideTl.fromTo(img, {scale: 2}, {scale: 1},'-=1');
    slideTl.fromTo(revealText, {x:'0%'}, {x:'100%'}, '-=0.75');
    slideTl.fromTo(nav, {y:'-100%'}, {y:'0%'}, '-=0.5');

    //create a scene make sure thats inside the forEach loop
    slideScene = new ScrollMagic.Scene({
        triggerElement: slide,
        triggerHook: 0.3,
        reverse:false

    })
    .setTween(slideTl)
    // .addIndicators({
    //     colorStart:'white', 
    //     colorTrigger:'white', 
    //     name:'slide'
    // })
    .addTo(controller);
    //new Animation
    const pageTl = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? 'end' : slides[index + 1];
    pageTl.fromTo(nextSlide, {y: '0%'}, {y: '50%'})
    pageTl.fromTo(slide, { opacity: 1, scale:1 }, { opacity: 0, scale: 0 })
    pageTl.fromTo(nextSlide, {y: '50%'}, {y: '0%'}, '-=0.5')
    // create page scene
    pageScene = new ScrollMagic.Scene({
        triggerElement: slide,
        duration: '100%',
        triggerHook: 0
    })
    // .addIndicators({
    //     colorStart:'white', 
    //     colorTrigger:'white', 
    //     name:'page',
    //     indent: 200
    // })
    .setPin(slide, { pushFollowers:false })
    .setTween(pageTl)
    .addTo(controller)
});
};
const mouse = document.querySelector('.cursor');
const mouseTxt = mouse.querySelector('span');
const burger = document.querySelector('.burger');

function cursor(e) {
    mouse.style.top = e.pageY + 'px';
    mouse.style.left = e.pageX + 'px'
}
function activeCursor(e) {
    const item = e.target;
    if(item.id === 'logo' || item.classList.contains('burger')){
        mouse.classList.add('nav-active')
    }else{
        mouse.classList.remove('nav-active')
    }
    if(item.classList.contains('explore')){
        mouse.classList.add('explore-active');
        gsap.to('.title-swipe', 1, { y: '0%'})
        mouseTxt.innerText = 'Tap';
    }else{
        mouse.classList.remove('explore-active');
        gsap.to('.title-swipe', 1, { y: '100%'})
        mouseTxt.innerText = '';
    }
}


function navToggle(e) {
    if (!e.target.classList.contains('active')){
        e.target.classList.add('active')
        gsap.to('.line1', 0.5, { rotate:'45', y:  5, background: 'black', zIndex: '100' } )
        gsap.to('.line2', 0.5, { rotate:'-45', y:-5, background: 'black', zIndex: '100' } )
        gsap.to('.nav-bar', 2, { clipPath: 'circle(2500px at 100% -10%)' } )
        gsap.to('#logo',1, {color:'black'})
        document.body.classList.add('hide')
    }else{
        e.target.classList.remove('active')
        gsap.to('.line1', 0.5, { rotate:'0', y: 0, background: 'white', } )
        gsap.to('.line2', 0.5, { rotate:'0', y: 0, background: 'white', } )
        gsap.to('.nav-bar', 2, { clipPath: 'circle(25px at 100% -10%)' } )
        gsap.to('#logo',1, {color:'white'})
        document.body.classList.remove('hide')
    }
}

// event listeners
burger.addEventListener('click', navToggle)
window.addEventListener('mousemove', cursor);
window.addEventListener('mouseover', activeCursor)
animatedSlide();