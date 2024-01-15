/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Link from 'next/link'
import { useState, useCallback, useEffect } from 'react'
import { shoes } from 'utils/shoelistarray'
import { supabase } from 'utils/supabase'

export default function ShoeDetails({ params }: { params: { id: string } }) {
  // This should ideally come from your application's state (e.g., Redux, Context API)
  const cartItems = JSON.parse(localStorage.getItem('cart_array') ?? '[]')

  const handleRemoveItem = (itemId) => {
    localStorage.removeItem('cart_array' ?? '')
    window.location.reload()
    // Logic to remove an item from the cart
  }

  const handleChangeQuantity = (itemId, newQuantity) => {
    // Logic to change the quantity of an item in the cart
  }

  const handleCheckout = () => {
    // Logic to proceed to checkout
  }

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + parseInt(item.price.replace('$', '')) * (item.quantity ?? 1),
      0
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-2xl font-bold">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item: any) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <img src={item.imageUrl} alt={item.name} className="mr-4 h-20 w-20 object-cover" />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>{item.price}</p>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  className="form-input mx-2 w-16 bg-black text-white"
                  value={item.quantity}
                  onChange={(e) => handleChangeQuantity(item.id, parseInt(e.target.value))}
                />
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-right font-bold">
            <p>Total: ${calculateTotal().toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="mt-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
