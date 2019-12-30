const convertToMin = (duration) => {
  const minutes = Math.trunc(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds}`;
}

const isNotIncluded = (song, songs) => {
  return !songs.map(song => song.id).includes(song.id);
}

const hasAccessToken = () => {
  const tokenBool = document.querySelector("div[data-uid]").dataset.userHasToken
  return tokenBool === "true"
}

export { isNotIncluded, convertToMin, hasAccessToken };
