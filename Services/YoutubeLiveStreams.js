// import axios from '@nuxtjs/axios'
let baseURl = 'https://www.googleapis.com/youtube/v3/search?part=snippet'
class YoutubeLiveStreams {
  constructor() {
    this.initialize()
  }

  initialize() {
    baseURl += `&channelId=${process.env.YOUTUBE_CHANNEL_ID}&type=video&key=${process.env.YOUTUBE_API_KEY}`
  }

  async getCompletedStreams() {
    baseURl += `&eventType=completed`
    try {
      const res = await fetch(baseURl)
      const data = await res.json()
      return data
    } catch (error) {}
  }

  async getUpcomingStreams() {
    //scheduledStartTime
    baseURl += `&eventType=upcoming`
    try {
      const res = await fetch(baseURl)
      const data = await res.json()
      // console.log(data)
      return data
    } catch (error) {}
  }
}
export default YoutubeLiveStreams
