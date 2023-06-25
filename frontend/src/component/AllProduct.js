import React, { useEffect, useState } from 'react'
import FilterProduct from './FilterProduct'
import CardFeature from './CardFeature'
import { useSelector } from 'react-redux'


const AllProduct = ({ heading }) => {
    const productData = useSelector((state) => state.product.productList)
    const categoryList = [...new Set(productData.map(el => el.category))]
    console.log(categoryList)

    //filter data display
    const [filterBy, setFilterBy] = useState("")
    const [dataFilter, setDataFilter] = useState([])

    useEffect(() => {
        setDataFilter(productData)
    }, [productData])

    const handleFilterProduct = (category) => {
        setFilterBy(category)
        const filter = productData.filter(el => el.category.toLowerCase() === category.toLowerCase())
        setDataFilter(() => {
            return [
                ...filter
            ]
        })
    }
    const loadingArrayFeature = new Array(10).fill(null)

    return (
        <div className='my-5'>
            <h2 className='font-bold text-2xl text-slate-700 mb-4'>{heading}</h2>

            <div className='flex gap-4 justify-center overflow-scroll scrollbar-none'>
                {
                    categoryList[0] ?
                        categoryList.map(el => {
                            return (
                                <FilterProduct
                                    category={el}
                                    key={el}
                                    isActive={el.toLowerCase() === filterBy.toLowerCase()}
                                    onClickProduct={() => handleFilterProduct(el)}
                                />
                            )
                        })
                        :
                        <div className='min-h-[200px]  flex justify-center items-center animate-pulse '>
                            <p>loading...</p>
                        </div>

                }
            </div>


            <div className='flex flex-wrap justify-center gap-5'>
                {
                    dataFilter[0] ?
                        dataFilter.map(el => {
                            return (
                                <CardFeature
                                    key={el._id}
                                    id={el._id}
                                    image={el.image}
                                    name={el.name}
                                    category={el.category}
                                    price={el.price}
                                />
                            )
                        })

                        :
                        loadingArrayFeature.map((el) => (<CardFeature loading={'loading...'} />))
                }
            </div>
        </div>
    )
}

export default AllProduct