class Friend {
  constructor(timestamp, user, track) {
    this.timestamp = timestamp;
    this.user = user;
    this.track = track;
    this.date = new Date(timestamp);
    this.timedifference = calculateTimeDifference(new Date(timestamp));
  }
}

const calculateTimeDifference = date => {
  const minutes = Math.floor((new Date() - date) / 1000 / 60);
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
export default Friend;
