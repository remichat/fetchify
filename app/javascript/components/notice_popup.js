const displayNotice = (message) => {
  const noticeElement = document.getElementById('notice-popup');
  noticeElement.classList.remove('hidden');
  const textElement = document.querySelector('#notice-popup > span');
  textElement.innerText = message;
}

export default displayNotice;
