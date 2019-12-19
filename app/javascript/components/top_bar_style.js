const scrollFunction = () => {
  if (document.documentElement.scrollTop <= 500) {
    const ratio = document.documentElement.scrollTop / 300;
    document.getElementById("top-bar").style.backgroundColor = `rgba(26, 31, 36, ${ratio})`;
  } else {
    document.getElementById("top-bar").classList.remove('scrolled');
  }
}

const addWindowOnScroll = () => {
  window.onscroll = function() {scrollFunction()};
}

export { addWindowOnScroll };
