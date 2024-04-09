import {gsap} from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase)

CustomEase.create("cubic", ".83,0,.17,1")
let isAnimating = false;


const initCards = ()=>{
    let cards = [...document.querySelectorAll(".card")];
    gsap.to(cards, {
        y: (i)=> - 5 + 5 * i + "%",
        z: (i)=> 20 * i,
        duration: 1,
        ease: "cubic",
        stagger: -0.1,
        onComplete: ()=>{
            gsap.to(cards, {
                opacity: 1,
                duration: 0.1
            })
        }
    })
}


document.addEventListener("DOMContentLoaded", ()=>{
    initCards();
})

document.addEventListener("click", ()=>{
    if(isAnimating) return;
    isAnimating = true;
    let slider = document.querySelector(".slider");
    let cards = [...slider.querySelectorAll(".card")];
    let lastCard = cards.pop();
    let nextCard = cards[cards.length - 1];
    gsap.to(lastCard, {
        y: "+=150%",
        duration: 0.75,
        ease: "cubic",
        onComplete: ()=>{
            slider.prepend(lastCard);
            initCards();
            setTimeout(()=>{
                isAnimating = false;
            }, 200)
        }
    })
    gsap.set(lastCard, {
        opacity: 0,
        duration: 0.3,
        delay: 0.7
    })
})