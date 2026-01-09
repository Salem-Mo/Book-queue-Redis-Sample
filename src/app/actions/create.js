'use server'

import {client} from '@/app/lib/db'
import { redirect } from 'next/navigation'

export async function createBook(formData) {
  const {title, rating, author, desc} = Object.fromEntries(formData)

  const id = Math.floor(Math.random()*100000)



  await client.hSet(`books:${id}`,{
      title,
      author,
      rating,
      desc
    })
  redirect('/')
}