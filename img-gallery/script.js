// BUTTONS
const buttons = document.querySelectorAll(".btn");

buttons.forEach(function (b) {
  b.addEventListener("click", function () {
    
    buttons.forEach(function (b) {
      b.classList.remove("active");
    });
    this.classList.add("active");
  });
});

// LIGHTBOX:

const allImages = document.querySelectorAll(".all-imgs img");
const lightBox = document.getElementById("lightbox");
const lightBoxImg = document.getElementById("lightbox-img");

const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");
const closeButton = document.getElementById("closeBtn");

let currentIndex = 0;
const imgArray = Array.from(allImages);

imgArray.forEach(function (img, index) {
  img.addEventListener("click", function () {
     lightBox.classList.add("show");
     lightBox.style.display='flex'
    lightBoxImg.style.transform = "scale(0.85)";
    lightBoxImg.style.transition = 'all 0.3s'
    lightBoxImg.src = this.src;
    currentIndex = index;
  });
});

nextButton.addEventListener("click", function (event) {
  event.stopPropagation();

  currentIndex++;
  if (currentIndex >= imgArray.length) {
    currentIndex = 0;
  }
  lightBoxImg.src = imgArray[currentIndex].src;
});

prevButton.addEventListener("click", function (event) {
  event.stopPropagation();

  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = imgArray.length - 1;
  }
  lightBoxImg.src = imgArray[currentIndex].src;
});

closeButton.addEventListener("click", function (event) {
  lightBox.style.display = "none";
});

document.addEventListener('keydown',function(event){
   if (!lightBox.classList.contains("show")) return;
   if(event.key==='ArrowRight')
    nextButton.click();

   else if(event.key==='ArrowLeft')
    prevButton.click();

   else if(event.key==='Escape')
    closeButton.click();
})

// FILTER
buttons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    buttons.forEach(function (b) { b.classList.remove("active"); });
    this.classList.add("active");

    const category = this.textContent.trim().toLowerCase();

    imgArray.forEach(function (img) {
      const shouldShow = category === "all" || img.classList.contains(category);

      if (shouldShow) {
        img.classList.remove("hidden");
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            img.classList.remove("hide");
          });
        });
      } else {
        img.classList.add("hide");
        setTimeout(function () {
          
          if (img.classList.contains("hide")) {
            img.classList.add("hidden");
          }
        }, 100); 
      }
    });
  });
});