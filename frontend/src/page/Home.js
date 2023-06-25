import React, { useEffect, useRef, useState } from 'react'
import HomeCard from '../component/HomeCard'
import { useSelector } from 'react-redux'
import CardFeature from '../component/CardFeature'
import { GrPrevious, GrNext } from 'react-icons/gr'
import FilterProduct from '../component/FilterProduct'
import AllProduct from '../component/AllProduct'



const Home = () => {
    const productData = useSelector((state) => state.product.productList)
    console.log(productData)
    const homeProductCartList = productData.slice(0, 4)

    const homeProductCartListVegetable = productData.filter(el => el.category === "vagetable")
    console.log(homeProductCartListVegetable)

    const loadingArray = new Array(4).fill(null)
    const loadingArrayFeature = new Array(10).fill(null)

    const slideProductRef = useRef()
    const nexProduct = () => {
        slideProductRef.current.scrollLeft += 200
    }

    const preveProduct = () => {
        slideProductRef.current.scrollLeft -= 200
    }




    return (
        <div className='p-2 md:p-4 '>
            <div className='md:flex gap-2 py-2'>
                <div className='md:w-1/2'>
                    <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
                        <p className='text-sm font-medium text-slate-900'>Bike Dilivery</p>
                        <img className='h-7' src='https://cdn-icons-png.flaticon.com/512/2972/2972185.png' />
                    </div>
                    <h2 className='text-4xl md:text-7xl font-bold py-3'>The Fasted Dilivery in <span className='text-red-600'>your Home</span> </h2>
                    <p className='py-3 text-base'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
                    <button className='font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md hover:bg-red-600'>Order Now </button>
                </div>
                <div className='md:w-1/2 flex flex-wrap gap-5 p-3 justify-center'>
                    {
                        homeProductCartList[0] ?
                            homeProductCartList.map(el => {
                                return (

                                    <HomeCard
                                        key={el._id}
                                        id={el._id}
                                        image={el.image}
                                        name={el.name}
                                        price={el.price}
                                        category={el.category}
                                    />

                                )
                            })
                            :
                            loadingArray.map((el, index) => {
                                return (
                                    <HomeCard
                                        key={index + "loanding"}
                                        loading={<div className='animate-pulse font-medium'>loading...</div>}
                                    />
                                )
                            })
                    }
                </div>
            </div>

            <div className=''>
                <div className='flex w-full items-center'>
                    <h2 className='font-bold text-2xl text-slate-700 mb-4'>Fresh Vegetables</h2>
                    <div className='ml-auto flex gap-4'>
                        <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-2 rounded-full'><GrPrevious /></button>
                        <button onClick={nexProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-2 rounded-full'><GrNext /></button>
                    </div>
                </div>

                <div className='flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
                    {
                        homeProductCartListVegetable[0] ? homeProductCartListVegetable.map(el => {
                            return (
                                <CardFeature
                                    key={el._id}
                                    id={el._id}
                                    name={el.name}
                                    category={el.category}
                                    price={el.price}
                                    image={el.image}
                                />
                            )
                        })
                            :
                            loadingArrayFeature.map((el, index) => (<CardFeature loading='loading...' key={index + "allProduct"} />))

                    }

                </div>
            </div>

            <AllProduct heading={"Your Product"} />



        </div>
    )
}

export default Home