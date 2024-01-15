/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Link from 'next/link'
import { supabase } from '../utils/supabase'
import { useCallback, useEffect, useState } from 'react'

export default function Home({ posts }) {
  const [allShoes, setAllShoes] = useState([])

  const fetchAllShoes = useCallback(async () => {
    const { data } = await supabase.from('shoes').select('*')
    setAllShoes(data as any)
  }, [])

  useEffect(() => {
    fetchAllShoes()
  }, [fetchAllShoes])
  return (
    <>
      <div className="container mx-auto p-4">
        <h2 className="mb-4 text-2xl font-bold">Our Shoes Collection</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allShoes.map((shoe: any) => (
            <Link
              key={shoe.id}
              href={`/shoe-details/${shoe.id}`}
              className="overflow-hidden rounded-lg border shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <img src={shoe.imageUrl} alt={shoe.name} className="h-64 w-full object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{shoe.name}</h3>
                <p className="text-gray-300">{shoe.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
