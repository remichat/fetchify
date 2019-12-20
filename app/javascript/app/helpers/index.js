const convertToMin = (duration) => {
  const minutes = Math.trunc(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds}`;
}

const isNotIncluded = (song, songs) => {
  return !songs.map(song => song.id).includes(song.id);
}

export { isNotIncluded, convertToMin };
