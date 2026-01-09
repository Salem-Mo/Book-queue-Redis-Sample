'use server'

import {client} from '@/app/lib/db'
import { redirect } from 'next/navigation'

export async function createBook(formData) {
  const {title, rating, author, desc} = Object.fromEntries(formData)

  const id = Math.floor(Math.random()*100000)


  const unique =await client.zAdd('books',
    {
      value:title,
      score:id
    },{NX:true}
  )
if(!unique){
  return {error: "The Book is already added"}
}

  await client.hSet(`books:${id}`,{
      title,
      author,
      rating,
      desc
    })
  redirect('/')
}