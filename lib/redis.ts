import { Redis } from '@upstash/redis'

const NEXT_PUBLIC_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://tiny.emots.dev'
  : 'http://localhost:300' 

const redis = new Redis({
  url: `${process.env.UPSTASH_REDIS_REST_URL}`,
  token: `${process.env.UPSTASH_REDIS_REST_TOKEN}`,
})

const getShort = (): string => {
  const alpha = `abcdfghlmnopqrstuvwxyz`.split('')
  return [...new Array(6)]
    .map((_) => alpha[Math.floor(Math.random() * alpha.length)])
    .join('')
}

export async function setUrl(url: string) {
  const generatedShortCode = getShort()
  await redis.set(`${NEXT_PUBLIC_BASE_URL}/urlShortener/${generatedShortCode}`, url)
  return generatedShortCode
}

export async function getUrl(generatedShortCode: string): Promise<string> {
  try {
    const data: any = await redis.get(`${NEXT_PUBLIC_BASE_URL}/urlShortener/${generatedShortCode}`)
    return data
  } catch (error) {
    throw error
  }
}
