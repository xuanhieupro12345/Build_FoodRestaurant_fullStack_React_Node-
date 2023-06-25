import React, { useState } from 'react'
import loginSignupImage from '../assest/login-animation.gif'
import { BiShow } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { ImagetoBase64 } from '../utility/ImagetoBase64'
import { toast } from "react-hot-toast";

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: "",

    })

    console.log(data)
    // hiển thị password
    const handleShowPassword = () => {
        setShowPassword(preve => !preve)
    }

    // hiển thị password
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(preve => !preve)
    }

    // lấy dữ liệu người dùng (name password email ,....)
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    //upload Image 
    const handleUploadProfileImage = async (e) => {
        const data = await ImagetoBase64(e.target.files[0])
        console.log(data)

        setData((preve) => {
            return {
                ...preve,
                image: data
            }
        })
    }

    console.log(process.env.REACT_APP_SERVER_DOMIN)
    //handleSubmit là lấy data từ dữ liệu người dùng và in ra console
    const handleSubmit = async (e) => {
        e.preventDefault()// (preventDefault is ngăn chặn even chứ không stop even) ngăn chặn và dữ liệu cũ và lấy dữ liệu mới 
        const { firstName, lastName, email, password, confirmPassword } = data
        if (firstName && lastName && email && password && confirmPassword) {
            if (password === confirmPassword) {
                //connect from frontend to backend
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })

                const dataRes = await fetchData.json()
                console.log(dataRes)
                // alert(dataRes.message)
                toast(dataRes.message)
                if (dataRes.alert) {
                    navigate('/login')
                }

            } else {
                alert('password and confirmPassword not equal')
            }
        } else {
            alert('please Enter require')
        }
    }
    return (
        <div className='p-3 md:p-4'>
            <div className='w-full max-w-md bg-white m-auto flex flex-col p-4'>
                {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
                <div className='w-20 h-20 overflow-hidden rounded-full  m-auto drop-shadow-sm shadow-sm relative'>
                    <img src={data.image ? data.image : loginSignupImage} className='w-full h-full' />

                    <label htmlFor='profileImage'>
                        <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer'>
                            <p className='text-sm p-1 text-white'>UpLoad</p>
                        </div>
                        <input type='file' id='profileImage' accept='Image/*' className='hidden' onChange={handleUploadProfileImage} />
                    </label>
                </div>

                <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor='firstName'>First Name</label>
                    <input
                        type='text'
                        id='firstName'
                        name='firstName'
                        className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
                        value={data.firstName}
                        onChange={handleOnChange}
                    />

                    <label htmlFor='lastName'>Last Name</label>
                    <input
                        type='text'
                        id='lastName'
                        name='lastName'
                        className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
                        value={data.lastName}
                        onChange={handleOnChange}
                    />

                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
                        value={data.email}
                        onChange={handleOnChange}
                    />

                    <label htmlFor='password'>Password</label>
                    <div className='flex  px-2 py-1  bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            className=' w-full bg-slate-200 border-none outline-none'
                            value={data.password}
                            onChange={handleOnChange}
                        />
                        <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiHide /> : <BiShow />}</span>
                    </div>

                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <div className='flex  px-2 py-1  bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300'>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id='confirmPassword'
                            name='confirmPassword'
                            className=' w-full bg-slate-200 border-none outline-none'
                            value={data.confirmPassword}
                            onChange={handleOnChange}
                        />
                        <span className='flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>{showConfirmPassword ? <BiHide /> : <BiShow />}</span>
                    </div>

                    <button className='max-w-[120px] m-auto mt-4 w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full'>Sgin up</button>

                </form>

                <p className='text-left text-sm mt-2'>Already have account ? <Link to={'/login'} className='text-red-500 underline' >Login</Link></p>
            </div>
        </div>

    )
}

export default Signup;