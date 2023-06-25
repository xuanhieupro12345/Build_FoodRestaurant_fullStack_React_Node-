import React from 'react'
import { HiPlus } from 'react-icons/hi'
import { BiMinus } from 'react-icons/bi'
import { MdDeleteForever } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { deleteCartItems, increaseQty, decreaseQty } from '../redux/productSlice'


const CartProduct = ({ id, name, image, category, qty, total, price }) => {
    const dispatch = useDispatch()

    return (
        <div className='bg-slate-200 p-2 flex gap-4 rounded border border-slate-400'>
            <div className='p-3 bg-white rounded '>
                <img src={image} className='h-28 w-40 object-cover' />
            </div>
            <div className='flex flex-col gap-1 w-full'>
                <div className='flex justify-between'>
                    <h3 className='font-semibold text-slate-600  capitalize text-lg md:text-xl'>{name}</h3>
                    <div className='cursor-pointer text-slate-700 hover:text-red-500 text-2xl' onClick={() => dispatch(deleteCartItems(id))}>
                        <MdDeleteForever />
                    </div>
                </div>
                <p className=' text-slate-500 font-medium '>{category}</p>
                <p className='font-bold text-base'><span className='text-red-500'>$</span><span>{price}</span></p>
                <div className=' flex justify-between '>
                    <div className='flex gap-3 items-center'>

                        <button onClick={() => dispatch(decreaseQty(id))} className='bg-slate-300 py-1 my-2 mt-2 rounded hover:bg-slate-400 p-1'><BiMinus /></button>
                        <p className='font-semibold p-1'>{qty}</p>
                        <button onClick={() => dispatch(increaseQty(id))} className='bg-slate-300 py-1 my-2 mt-2 rounded hover:bg-slate-400 p-1'><HiPlus /></button>
                    </div>

                    <div className='flex items-center gap-2 font-bold text-slate-700'>
                        <p>Total :</p>
                        <p><span className='text-red-500'>$</span>{total}</p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CartProduct