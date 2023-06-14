import React from 'react'
import Image from 'next/image'
import lottery from '../assets/lottery.jpg'

import { useMetamask } from '@thirdweb-dev/react'

function Login() {
    const connectWithMetamask = useMetamask();

    return (
        <div className='bg-[#091b18] min-h-screen flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center mb-10 text-center'>
                <Image
                    src={lottery}
                    alt='Login picture'
                    className='rounded-full mb-10 border border-emerald-500 shadow-lg'
                    width={200}
                    height={200}
                />
                <h1 className='text-4xl text-white font-bold font-poppins'>Lucky Draw</h1>
                <p className='mt-2 text-white font-poppins'>Get started by logging in with your wallet.</p>
                <button onClick={connectWithMetamask} className='bg-white hover:bg-gray-200 px-6 py-4 mt-10 rounded-lg shadow-lg font-bold font-poppins'>
                    Connect Wallet
                </button>
            </div>
        </div>
    )
}

export default Login
