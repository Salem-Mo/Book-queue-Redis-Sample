'use client'

import { createBook } from '@/app/actions/create'
import { useState } from "react"
import Link from 'next/link'

export default function Create() {
  const [error, setError] = useState('')

  async function handleSubmit(formData) {
    const result = await createBook(formData)

    if (result?.error) { setError(result.error) }
  }

  return (
    <div className="py-20 animate-in fade-in duration-1000">
      <header className="mb-24 text-center">
        <div className="accent-glow mb-6">
          <h1 className="modern-title !text-5xl md:!text-7xl">New Registry</h1>
        </div>
        <p className="modern-subtitle">
          Index a new volume into the digital sanctuary.
        </p>

        <nav className="flex justify-center items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-full max-w-fit mx-auto backdrop-blur-md">
          <Link href="/" className="nav-link">Catalog</Link>
          <Link href="/create" className="nav-link !text-white bg-white/10">Add Volume</Link>
        </nav>
      </header>

      <main>
        <div className="modern-card max-w-2xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-50"></div>

          <form action={handleSubmit} className="relative z-10">
            <div className="grid grid-cols-1 gap-8">
              <div>
                <label htmlFor="title">Volume Title</label>
                <input type="text" name="title" id="title" placeholder="A Brief History of Time..." required />
              </div>

              <div>
                <label htmlFor="image">Book Cover URL</label>
                <input type="url" name="image" id="image" placeholder="https://example.com/cover.jpg" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="author">Author</label>
                  <input type="text" name="author" id="author" placeholder="Stephen Hawking" required />
                </div>
                <div>
                  <label htmlFor="rating">Rating (0-5)</label>
                  <input type="number" name="rating" id="rating" max={5} min={0} placeholder="5" required />
                </div>
              </div>

              <div>
                <label htmlFor="desc">Digital Digest</label>
                <textarea name="desc" id="desc" rows="5" placeholder="A concise reflection of the work..." required></textarea>
              </div>
            </div>

            <div className="pt-8">
              <button type="submit" className="modern-btn-primary w-full group">
                <span className="flex items-center justify-center gap-2">
                  Execute Registry
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </div>

            {error && <div className="error mt-6">{error}</div>}
          </form>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-sm font-semibold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest">
            ← Back to Catalog
          </Link>
        </div>
      </main>

      <footer className="mt-48 pt-12 border-t border-white/5 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-bold">
          Salem MO 2026 // Redis Practice
        </p>
      </footer>
    </div>
  )
}