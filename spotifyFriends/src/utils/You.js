class You {
    constructor(played_at, track) {
      this.track = track;
      this.date = played_at;
      this.timedifference = calculateTimeDifference(played_at);
    }
}

const calculateTimeDifference = (played_at) => {
    const minutes = Math.floor((new Date() - played_at)/1000/60)
    if (minutes < 10) {
      return "Now"
    }
    else if (minutes > 59) {
      const hours = Math.floor(minutes/60);
      if (hours > 24) {
        const days = Math.floor(hours/24);
        return `${days} days`
      }
      else {
        return `${hours} hours`
      }
    } 
    else {
      return `${minutes} minutes`
    }
  
  }

export default You