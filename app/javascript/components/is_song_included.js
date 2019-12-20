const isNotIncluded = (song, songs) => {
  return !songs.map(song => song.id).includes(song.id);
}

export default isNotIncluded;
