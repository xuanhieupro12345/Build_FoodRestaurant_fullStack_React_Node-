import React, { useState } from 'react'
import logo from '../assest/logo.png'
import { Link } from 'react-router-dom'
import { FaUserTie } from 'react-icons/fa'
import { TiShoppingCart } from 'react-icons/ti'
import loginSignupImage from '../assest/login-animation.gif'
import { useDispatch, useSelector } from 'react-redux'
import { loguotRedux } from '../redux/userSlice'
import { toast } from 'react-hot-toast'



const Header = () => {
    const [showMenu, setShowMenu] = useState(false)

    //Redux
    const userData = useSelector((state) => state.user);
    // console.log(userData.email)
    const dispatch = useDispatch()

    //hien thi menu
    const handleShowMenu = () => {
        setShowMenu(preve => !preve)
    }

    //logout 
    const handleLogout = () => {
        dispatch(loguotRedux()) // use redux 
        toast('logout successfully')
    }

    // hiển thị số trên cart
    const cartItemNumber = useSelector((state) => state.product.cartItem)

    console.log(process.env.REACT_APP_ADMINT_EMAIL)
    return (
        <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white' >
            {/* desktop */}
            <div className='flex items-center h-full justify-between'>
                <Link>
                    <div className='h-10'>
                        <img src={logo} className='h-full' />
                    </div>
                </Link>

                <div className='flex items-center gap-6 md:px-2'>
                    <nav className=' gap-4 md:gap-6 text-base md:text-lg hidden md:flex'>
                        <Link to={''}>Home</Link>
                        <Link to={'menu/6490e9b87d7b5accdaedeb14'}>Menu</Link>
                        <Link to={'about'}>About</Link>
                        <Link to={'contact'}>Contact</Link>
                    </nav>

                    <div className='text-2xl text-slate-700 relative '>
                        <Link to={"cart"}><TiShoppingCart />
                            <div className='absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center '>
                                {
                                    cartItemNumber.length
                                }
                            </div>
                        </Link>
                    </div>
                    <div className='text-xl text-slate-700' onClick={handleShowMenu}>
                        <div className='border-2 border-solid border-slate-400  rounded-full cursor-pointer' >
                            {userData.image ? <img src={userData.image} className='h-7 w-7  rounded-full overflow-hidden shadow p-0 ' /> : <FaUserTie className='p-1 h-7 w-7' />

                            }
                        </div>
                        {
                            showMenu && (
                                <div className='absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center'>

                                    {
                                        userData.email === process.env.REACT_APP_ADMINT_EMAIL && <Link to={'newproduct'} className='whitespace-nowrap cursor-pointer px-2 text-base'>New product</Link>
                                    }

                                    {
                                        userData.image ? <p className='cursor-pointer text-white bg-red-500 px-2' onClick={handleLogout} > loguot {(userData.firstName)}</p> : <Link to={'login'} className='whitespace-nowrap cursor-pointer px-2 text-base'>Login</Link>
                                    }

                                    <nav className=' text-base md:text-lg flex flex-col md:hidden'>
                                        <Link to={''} className='px-2 py-1'>Home</Link>
                                        <Link to={'menu/6490e9b87d7b5accdaedeb14'} className='px-2 py-1'>Menu</Link>
                                        <Link to={'about'} className='px-2 py-1'>About</Link>
                                        <Link to={'contact'} className='px-2 py-1'>Contact</Link>
                                    </nav>

                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* mobile */}
        </header>
    )
}

export default Header