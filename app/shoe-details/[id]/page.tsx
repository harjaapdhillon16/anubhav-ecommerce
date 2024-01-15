'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useCallback, useEffect } from 'react'
import { shoes } from 'utils/shoelistarray'
import { supabase } from 'utils/supabase'

export default function ShoeDetails({ params }: { params: { id: string } }) {
  const id = decodeURI(params.id)
  const { push } = useRouter()
  // Capitalize first letter and convert space to dash
  console.log(id)
  console.log(params)

  const [showCartModal, setShowCartModal] = useState(false)

  const addToCart = () => {
    // Add the shoe to the cart (logic depends on your cart management)
    setShowCartModal(true)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [shoe, setShoe] = useState<any>(null)

  const proceedToCheckout = () => {
    localStorage.setItem('cart_array', JSON.stringify([shoe]))
    push('/cart')
    alert('Proceeding to Checkout')
  }

  const fetchAllShoes = useCallback(async () => {
    const { data } = await supabase.from('shoes').select('*').match({ id })
    setShoe(data?.[0])
  }, [id])

  useEffect(() => {
    fetchAllShoes()
  }, [fetchAllShoes])

  if (!shoe) {
    return null
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row">
          <img src={shoe.imageUrl} alt={shoe.name} className="h-64 w-full object-cover md:w-1/2" />
          <div className="p-4">
            <h2 className="text-2xl font-bold">{shoe.name}</h2>
            <p className="mb-4 text-gray-700">{shoe.price}</p>
            <button
              onClick={addToCart}
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Recommended Products */}
        <h3 className="my-4 text-xl font-bold">Recommended Products</h3>
        <div className="grid grid-cols-3 gap-4">
          {shoes.map((shoe) => (
            <Link
              key={shoe.id}
              href={`/shoe-details/${shoe.id}`}
              className="flex overflow-hidden rounded-lg border shadow-lg transition-shadow hover:shadow-xl"
            >
              <img src={shoe.imageUrl} alt={shoe.name} className="h-40 w-[50%] object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{shoe.name}</h3>
                <p className="text-gray-700">{shoe.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Cart Modal */}
        {showCartModal && (
          <div className="fixed inset-0 h-full w-full overflow-y-auto bg-gray-600 bg-opacity-50">
            <div className="relative top-20 mx-auto w-96 rounded-md border bg-white p-5 shadow-lg">
              <h3 className="text-lg font-bold">Added to Cart!</h3>
              <p className="my-4 text-gray-700">Proceed to checkoutor continue shopping.</p>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowCartModal(false)}
                  className="rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={proceedToCheckout}
                  className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
