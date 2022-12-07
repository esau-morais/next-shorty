import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { Layout } from '../layouts'

export default function Home() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState<string | null>('')

  const handleUrlSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await fetch('/api/urlShortener', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    })
    const data = await response.json()
    setShortUrl(
      `${document.location.protocol}//${document.location.host}/${data.shortGenerated}`
    )
    setUrl('')
  }

  return (
    <>
      <Head>
        <title>Next Shorty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="mb-2">
          <h1 className="cursor-default text-2xl">
            the{' '}
            <em className="border-b-[#191919] transition-all hover:border-b hover:border-b-[#191919]">
              shorter
            </em>
            , the{' '}
            <em className="border-b-[#191919] transition-all hover:border-b hover:border-[#191919]">
              better
            </em>
            .
          </h1>
        </div>

        <div className="flex w-full flex-col items-center rounded-md bg-zinc-900 px-5 py-4 sm:w-auto sm:flex-row">
          <div className="mb-2 flex w-full items-center justify-between sm:mr-4 sm:mb-0 sm:w-auto sm:justify-start">
            <div className="flex-0 mr-4 flex items-center space-x-2 pt-2 pb-3 text-sm text-gray-400">
              <i className="inline-block h-3 w-3 rounded-full bg-red-400" />
              <i className="inline-block h-3 w-3 rounded-full bg-yellow-400" />
              <i className="inline-block h-3 w-3 rounded-full bg-green-400" />
            </div>
            <button
              className={`flex-0 flex items-center space-x-4 text-sm text-gray-400 outline-4 outline-offset-4 outline-purple-500 transition-all ${
                !shortUrl ? 'cursor-not-allowed' : ''
              }`}
              type="button"
              onClick={() => setShortUrl(null)}
              disabled={!shortUrl}
            >
              <svg
                className="inline-block h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {shortUrl ? (
            <Link href={shortUrl}>{shortUrl}</Link>
          ) : (
            <form
              className="whitespace-no-wrap flex-0 w-full text-gray-400 sm:w-auto"
              onSubmit={handleUrlSubmit}
            >
              <input
                type="url"
                className="whitespace-no-wrap my-auto w-full flex-1 overflow-hidden rounded-full border-none bg-[#f1f1f1] px-3 py-2 outline-4 outline-offset-4 outline-purple-500 transition-all"
                placeholder="https://any.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </form>
          )}
        </div>
      </Layout>
    </>
  )
}
