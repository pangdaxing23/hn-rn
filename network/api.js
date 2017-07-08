const HACKER_NEWS_API_V0 = 'https://hacker-news.firebaseio.com/v0/'

export const fetchItem = async (id) => {
  return (await fetch(`${HACKER_NEWS_API_V0}item/${id}.json`)).json()
}
