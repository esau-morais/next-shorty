import Head from 'next/head'
import Link from 'next/link'
import { FormEvent, useState } from 'react'
import { Layout } from '../layouts'

export default function Home() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState<string>(null! || "")

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
  }

  return (
    <>
      <Head>
        <title>Next Shorty</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="mb-2">
          <h1 className="text-2xl cursor-default">
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

        <div className="flex items-center justify-between p-2 rounded-md bg-zinc-900">
          <div className="flex items-center">
            <div className="flex items-center px-4 pt-4 pb-3 space-x-2 text-sm text-gray-400 flex-0">
              <i className="inline-block w-3 h-3 bg-red-400 rounded-full"></i>
              <i className="inline-block w-3 h-3 bg-yellow-400 rounded-full"></i>
              <i className="inline-block w-3 h-3 bg-green-400 rounded-full"></i>

              <div className="flex items-center space-x-4 text-sm text-gray-400 flex-0">
                <div className="flex items-center space-x-[0.5px]">
                  <Link href="/">
                    <svg
                      className="inline-block w-6 h-6 cursor-pointer"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Link>

                  <svg
                    className="inline-block w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>

                <svg
                  className="inline-block w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          {shortUrl ? (
            <Link href={shortUrl}>{shortUrl}</Link>
          ) : (
            <form
              className="text-gray-400 whitespace-no-wrap flex-0"
              onSubmit={handleUrlSubmit}
            >
              <input
                className="whitespace-no-wrap my-auto flex-1 overflow-hidden rounded-full border-none bg-[#f1f1f1] px-2 py-1 outline-4 outline-offset-1 outline-purple-500 transition-all"
                placeholder="https://website.com"
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
