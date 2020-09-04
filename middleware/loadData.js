// import LogRocketPosts from '~/Services/LogRocketPosts'

export default async function ({ from, store }) {
  const isInitialPageLoad = !from
  if (isInitialPageLoad) {
    try {
      await store.dispatch('post/getPosts')
      await store.dispatch('post/getWorldPosts')
      await store.dispatch('stream/getCompletedStreams')
      await store.dispatch('stream/getUpcomingStreams')
    } catch (error) {}
  }
}
