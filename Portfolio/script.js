/**
 * Hero Section mouse interaction
*/

const heroSection = document.querySelector("#hero")
const heroGradient = document.querySelector("#hero .hero-gradient");

heroSection.addEventListener('mousemove', e => {
  const { clientX, clientY } = e;
  const x = ((clientX / heroSection.offsetWidth) - 0.5 ) * 2.0;
  const y = ((clientY / window.innerHeight) - 0.5 ) * 2.0;

  // heroGradient.style.transform = `translateX(${x * 100}px)`
  // heroGradient.style.left = `${x * 100}px`
  // heroGradient.style.top = `${y * 100}px`
  gsap.to(heroGradient, {
    left : x * 200,
    top : y * 100,
  })
})

/** 
 * Helper Functions Start
 */
const splitText = (item) => {
  // const letters = item.split("")

  const letters = item.split("")
  let parentDiv = document.createElement('div')


  letters.forEach((el,index) => {
    const span = document.createElement('span');
    span.innerText = el;
    parentDiv.append(span)
  })
  return parentDiv
}

const SplitLetters = (text, targetElement) =>
{
  const lettersArr = text.split(" ");
  
  let words = []
  
  //adding space after each word
  for(let i = 0; i< lettersArr.length; i ++) {
  words.push(lettersArr[i])
  words.push(" ")
  }

  targetElement.innerHTML = "";
  words.forEach(word => {
    if(word === ' ') {
        // targetElement.innerText += ` `

    } else {

        targetElement.innerHTML += `<span class='word-wrapper'>${(splitText(word)).innerHTML}</span> `;
    }
  })
}


/** Helper Functions End */

const heroHeading = document.querySelector("#hero h1")
const projectHeading = document.querySelector("#projects h2")
const projectTitles = document.querySelectorAll('#projects h3')
const skillsHeading = document.querySelector("#skills h2")
const contactHeading = document.querySelector("#contact h2")

const convertHeadingsToSpan = () =>
  {
    SplitLetters(heroHeading.innerText, heroHeading)

    SplitLetters(projectHeading.innerText, projectHeading)


    projectTitles.forEach(projectTitle => SplitLetters(projectTitle.innerText, projectTitle))


    SplitLetters(skillsHeading.innerText, skillsHeading)


    SplitLetters(contactHeading.innerText, contactHeading)
      
  }


const initAnimation = () =>
{
  /**
   *  SPLIT TEXT 
  */

  gsap.registerPlugin(ScrollTrigger);
 

  /**
   *  Animation Logic 
  */

  [heroHeading, projectHeading, skillsHeading, contactHeading].forEach(heading => {
      
    gsap.to(heading.querySelectorAll('.word-wrapper span'), {
      y : 0,
      stagger : 0.01,
      scrollTrigger : {
          trigger : heading,
          start : 'top 60%'
      }
    })
  })

  /** Projects Cards */

  let projects = gsap.utils.toArray('.project')

  projects.forEach(project => {
    gsap.from(project, {
      opacity : 0,
      y : 50,
      scrollTrigger : {
          trigger : project,
          start : "top center"
      }
    })
  })




  /** Skills Section */

  gsap.from('.skill', {
    opacity : 0,
    stagger : 0.05,
    y : 20,
    scrollTrigger : {
        trigger : '.skills-container',
        start : "top center"
    }
  })


  /** Form */

  gsap.from('form>div', {
    y : 20,
    opacity : 0,
    stagger : 0.06,
    scrollTrigger : {
        trigger : "form",
        start : "top center"
    }
  })

}

/**
 * Load the GSAP SCRIPTS
*/

const loadScript = (src, callback) =>
{
  var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onload = callback;
    document.head.appendChild(script);
}

const init = () => {
  convertHeadingsToSpan();
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.3/gsap.min.js', function() {
    /**
     * Hide all headings
    */

    [heroHeading, projectHeading, skillsHeading, contactHeading].forEach(heading => {
        
      gsap.set(heading.querySelectorAll('.word-wrapper span'), {
        y : "120%"
      })
    });

  loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.3/ScrollTrigger.min.js', function() {

    document.querySelector('main').style.display = 'block'
    const loaderWrapper = document.querySelector('.loader-wrapper')
    gsap.to(loaderWrapper, {
      opacity : 0,
      duration : 0.4,
      onComplete : () => {
        loaderWrapper.style.visibility = 'hidden'
        initAnimation()
        
      }
    })
  })
})

}
init()

/**
 * Scroll listener for Navbar
*/

const addScrollListener = () =>
{
  const navbar = document.querySelector("nav");
    
  let prevScrollPos = window.pageYOffset || document.documentElement.scrollTop;
  let downScrollValue = 0;
  document.addEventListener("scroll", (e) => {
    const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollPos <= 100) {
      navbar.classList.remove('scrolled')
      return;
    }
    if (currentScrollPos > prevScrollPos) {
      //scrolling down
      downScrollValue++;
      
      if (downScrollValue > 40) {
          navbar.classList.add('scrolled')
        }
    } else {
        
      downScrollValue = 0;
    }
    prevScrollPos = currentScrollPos;
  });
}

addScrollListener()


var tablinks=document.getElementsByClassName("tab-links");
var tabcontents=document.getElementsByClassName("tab-contents");
function opentab(tabname){
    for(let tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(let tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link")
    document.getElementById(tabname).classList.add("active-tab");
    
}

var sidemenu=document.getElementById("sidemenu");
function openmenu(){
    sidemenu.style.right = "0";
}
function closemenu(){
    sidemenu.style.right = "-200px";
}

const scriptURL = 'https://script.google.com/macros/s/AKfycbxBtfC0Zh71_-ws-cqS2_2xJookwO41qN23rrn8XKBjUH1PGXG2Fvu4Gefv5Nr8UHL7/exec'
const form = document.forms['submit-to-google-sheet']
const msg=document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        msg.innerHTML="Message sent successfully"
        setTimeout(function(){
            msg.innerHTML=""
        },5000)
        form.reset()
    })
    .catch(error => console.error('Error!', error.message))
})



