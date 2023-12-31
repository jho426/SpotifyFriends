class You {
  constructor(played_at, track, name, photo, type, is_public, playlist_name) {
    this.track = track;
    this.date = played_at;
    this.timedifference = calculateTimeDifference(played_at);
    this.photo = photo;
    this.name = name;
    this.type = type;
    this.is_public = is_public;
    this.playlist_name = playlist_name;
  }
}

const calculateTimeDifference = played_at => {
  const minutes = Math.floor((new Date() - new Date(played_at)) / 1000 / 60);
  if (minutes < 10) {
    return 'Now';
  } else if (minutes > 59) {
    const hours = Math.floor(minutes / 60);
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} d`;
    } else {
      return `${hours} hr`;
    }
  } else {
    return `${minutes} min`;
  }
};

export default You;
