import React, { useState } from 'react'
import { BsCloudUpload } from "react-icons/bs"
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import { toast } from 'react-hot-toast'

const NewpProduct = () => {
    const [data, setData] = useState({
        name: "",
        category: "",
        image: "",
        price: "",
        description: "",
    })

    //lấy dữ liệu người dùng 
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    //uploald image 
    const uploadImage = async (e) => {
        const data = await ImagetoBase64(e.target.files[0])
        console.log(data)

        setData((preve) => {
            return {
                ...preve,
                image: data
            }
        })
    }

    //in data use
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data)

        const { name, image, category, price, description } = data

        if (name && image && category && price && description) {
            // connect from frondend to backend 
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const dataReq = await fetchData.json()
            console.log(dataReq)
            toast(dataReq.message)
            /* if (dataReq.alert) {
            } */
            // sau khi nhấn save và lưa vào database thì xóa hết tất cả những input cũ
            setData(() => {
                return {
                    name: "",
                    category: "",
                    image: "",
                    price: "",
                    description: "",
                }
            })

        } else {
            toast("please enter required fields")
        }


    }
    return (
        <div className='p-4'>
            <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
                <label htmlFor='newProduct' className='font-bold m-auto text-3xl shadow-md text-blue-500 hover:text-blue-700 '>New Product  </label>

                <label htmlFor='name' className='font-bold'>Name   </label>
                <input
                    type='text'
                    name='name'
                    className='bg-slate-200 p-1 my-1 '
                    value={data.name}
                    onChange={handleOnChange}
                />

                <label htmlFor='category' className='font-bold'>Category</label>
                <select className='bg-slate-200 p-1 my-1  text-blue-600' id='category' name='category' value={data.category} onChange={handleOnChange}>
                    <option value={"other"}>select category</option>
                    <option value={"fruits"}>Fruits</option>
                    <option value={"vagetable"}>Vegetable</option>
                    <option value={"icream"}>Icream</option>
                    <option value={"dosa"}>Dosa</option>
                    <option value={"pizza"}>Pizza</option>
                    <option value={"rice"}>rice</option>
                    <option value={"cake"}>Cake</option>
                    <option value={"burger"}>Burger</option>
                    <option value={"chicken"}>Chicken</option>
                    <option value={"panner"}>panner</option>
                    <option value={"sandwich"}>Sandwich</option>
                </select>

                <label htmlFor='image' className='mt-2 font-bold'> UpLoad Image
                    <div className='h-40 w-full bg-slate-200 mt-1 rounded flex items-center justify-center cursor-pointer'>
                        {
                            data.image ? <img src={data.image} className='h-full' /> : <span className='text-5xl cursor-pointer'><BsCloudUpload /></span>
                        }


                        <input
                            type='file'
                            id='image'
                            name='image'
                            accept='image/*'
                            onChange={uploadImage}
                            className='hidden'
                        // value={data.image}

                        />
                    </div>
                </label>

                <label htmlFor='price' className='mt-2 font-bold'>Price</label>
                <input
                    type='text'
                    id='price'
                    name='price'
                    className='bg-slate-200 p-1 my-1 '
                    onChange={handleOnChange}
                    value={data.price}
                />

                <label htmlFor='description' className='font-bold'>Descpription</label>
                <textarea
                    rows={2}
                    id='descpription'
                    name='description'
                    className='bg-slate-200 p-1 my-1 resize-none '
                    onChange={handleOnChange}
                    value={data.description}
                >

                </textarea>

                <button className='bg-blue-600 hover:bg-blue-700 font-bold my-2'>Save</button>
            </form>


        </div>
    )
}

export default NewpProduct