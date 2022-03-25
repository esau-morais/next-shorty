import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: `${process.env.UPSTASH_REDIS_REST_URL}`,
  token: `${process.env.UPSTASH_REDIS_REST_TOKEN}`,
})

const getShort = (): string => {
  const alpha = `abcdfghlmnopqrstuvwxyz`.split('')
  return [...new Array(8)]
    .map((_) => alpha[Math.floor(Math.random() * alpha.length)])
    .join('')
}

export async function setUrl(url: string) {
  const generatedShortCode = getShort()
  await redis.set(`/urlShortener/${generatedShortCode}`, url)
  return generatedShortCode
}

export async function getUrl(generatedShortCode: string): Promise<string> {
  try {
    const data: any = await redis.get(`/urlShortener/${generatedShortCode}`)
    return data
  } catch (error) {
    throw error
  }
}
