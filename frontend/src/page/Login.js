import React, { useState } from 'react'
import loginSignupImage from '../assest/login-animation.gif'
import { BiShow } from 'react-icons/bi'
import { BiHide } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { loginRedux } from '../redux/userSlice'

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: "",
    })

    // Redux
    const userData = useSelector(state => state)

    const dispatch = useDispatch()

    // hiển thị password
    // console.log(data)
    const handleShowPassword = () => {
        setShowPassword(preve => !preve)
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

    // hàm này làm việc với backend
    const handleSubmit = async (e) => {
        e.preventDefault()// kiểm tra đã nhập đúng email chưa

        const { email, password } = data
        if (email && password) {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/login`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const dataRes = await fetchData.json()
            console.log(dataRes)

            toast(dataRes.message)
            if (dataRes.alert) {
                dispatch(loginRedux(dataRes))
                setTimeout(() => {
                    navigate("/")
                }, 1000)
            }
            console.log(userData)
        } else {
            alert('please Enter require')
        }
    }
    return (
        <div className='p-3 md:p-4'>
            <div className='w-full max-w-md bg-white m-auto flex flex-col p-4'>
                {/* <h1 className='text-center text-2xl font-bold'>Sign up</h1> */}
                <div className='w-20 overflow-hidden rounded-full  m-auto drop-shadow-sm shadow-sm'>
                    <img src={loginSignupImage} className='w-full' />
                </div>

                <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
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

                    <button className='max-w-[120px] m-auto mt-4 w-full bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full'>
                        Login
                    </button>

                </form>

                <p className='text-left text-sm mt-2'>Don't have account ?
                    <Link to={'/signup'} className='text-red-500 underline ml-1' >Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login