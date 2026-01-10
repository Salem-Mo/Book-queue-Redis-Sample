import Link from 'next/link'
import { client } from './lib/db'

const getBooks = async () => {
  const result = await client.zRangeWithScores('books', 0, -1)
  const books = await Promise.all(result.map((b) => {
    return client.hGetAll(`books:${b.score}`)
  }))
  return books
}
export default async function Home() {
  const books = await getBooks()

  return (
    <main>
      <nav className="flex justify-between">
        <h1 className='font-bold'>Books on Redis!</h1>
        <Link href="/create" className="btn">Add a new book</Link>
      </nav>

      {books.map((b) => (
          <div key={b.title} className='card'>
            <h2>{b.title}</h2>
            <p>By: {b.author}</p>
            <p>Rating: {b.rating}</p>
            <p>{b.desc}</p>
          </div>
      ))}
    </main>
  )
}
