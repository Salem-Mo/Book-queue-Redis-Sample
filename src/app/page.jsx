import Link from 'next/link'
import { client } from './lib/db'

const getBooks = async () => {
  const result = await client.zRangeWithScores('books', 0, -1)
  const books = await Promise.all(result.map((b) => {
    return client.hGetAll(`books:${b.score}`)
  }))
  return books
}

export default async function Page() {
  const books = await getBooks()

  return (
    <div className="py-20">
      <header className="mb-32 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="accent-glow mb-6">
          <h1 className="modern-title">The Digital Library</h1>
        </div>
        <p className="modern-subtitle">
          A high-performance sanctuary for literature, curated with precision and powered by lightning-fast data structures.
        </p>

        <nav className="flex justify-center items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-full max-w-fit mx-auto backdrop-blur-md">
          <Link href="/" className="nav-link !text-white bg-white/10">Catalog</Link>
          <Link href="/create" className="nav-link">Add Volume</Link>
        </nav>
      </header>

      <main className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Live Collection</h2>
            <p className="text-zinc-500 text-sm">{books.length} volumes currently indexed</p>
          </div>
          <Link href="/create" className="modern-btn">
            New Registry
          </Link>
        </div>

        <div className="grid-books">
          {books.map((b) => (
            <div key={b.title} className="modern-card group flex flex-col overflow-hidden !p-0">
              {b.image && (
                <div className="w-full h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img
                    src={b.image}
                    alt={b.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              )}
              <div className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white group-hover:text-rose-400 transition-colors duration-300">
                      {b.title}
                    </h3>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
                      {b.author}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
                    <span className="text-xs font-black text-rose-500">{Number(b.rating)}/5</span>
                  </div>
                </div>

                <p className="text-zinc-400 leading-relaxed mb-8 line-clamp-3">
                  {b.desc}
                </p>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                  <Link href="#" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                    Explore Volume
                  </Link>
                  <div className="h-px flex-1 mx-4 bg-gradient-to-r from-white/10 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {books.length === 0 && (
          <div className="text-center py-32 modern-card border-dashed">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10">
              <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-zinc-400 font-medium mb-8">The archives are currently empty.</p>
            <Link href="/create" className="modern-btn-primary">
              Initialize Registry
            </Link>
          </div>
        )}
      </main>

      <footer className="mt-48 pt-12 border-t border-white/5 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-bold">
          Salem MO 2026 // Redis Practice
        </p>
      </footer>
    </div>
  )
}
