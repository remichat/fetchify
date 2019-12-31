const displayNotice = (message) => {
  const notice = `<div class="alert alert-info alert-dismissible fade show m-1" role="alert">${message}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`;
  const body = document.querySelector('body');
  body.insertAdjacentHTML('beforeend', notice);
}

export default displayNotice;
