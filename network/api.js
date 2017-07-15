const HACKER_NEWS_API_V0 = 'https://hacker-news.firebaseio.com/v0/'
export const TOP = 'topstories'
export const NEW = 'newstories'
export const ASK = 'askstories'
export const SHOW = 'showstories'
export const JOB = 'jobstories'

export const fetchItem = async (id) => {
  return (await fetch(`${HACKER_NEWS_API_V0}item/${id}.json`)).json()
}

export const fetchIds = async (type) => {
  return (await fetch(`${HACKER_NEWS_API_V0 + type}.json`)).json()
}
