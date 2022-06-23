var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

document.querySelector('.btns-pages').addEventListener('click', e => {
  const { target } = e;
  const targetClassList = target.classList;
  const allNumPages = [ ...document.querySelectorAll('.num-page')];
  const activePageNumber = allNumPages.findIndex(i => i.classList.contains('num-active'));
  
  switch(true) {
    case targetClassList.contains('btn-left'): return activePageNumber && setNum(-1, true);
    case targetClassList.contains('btn-right'): return  (activePageNumber - allNumPages.length + 1) && setNum(1, true); 
    case targetClassList.contains('num-page'): return setNum(target.innerHTML); 
  }
  
  function setNum(num, direction = null) { 
    allNumPages[activePageNumber].classList.remove('num-active');
    (allNumPages[direction === null ? target.innerHTML - 1 : activePageNumber + num]).classList.add('num-active') ;
  }
}); 
