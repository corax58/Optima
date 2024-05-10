import React, { useState } from 'react'
import {useSignup} from '../../hooks/useSignup'
import { useAuthContext } from '../../hooks/useAuthContext'
import { FaRegEye,FaRegEyeSlash  } from "react-icons/fa6";
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [Visible, setVisible] = useState('password')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('');
    const {signup, error, isLoading}= useSignup();
    const { user } = useAuthContext();
    const navigator= useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        // await Signup(emailOrUserName, password);
     await signup(email,password)
        

      };

const handlePasswordVisible =()=>{
    if(Visible=='password'){
        setVisible('text')
    }else{
        setVisible('password')
    }
}

if (user){
console.log(user)
    return <Navigate to={"/"} />;
} 

  return (
    <div className='h-screen w-screen bg-red-300 items-center flex'>
<div className=' h-3/4 w-96 bg-white rounded-xl mx-auto '>
    <div className=' items-center flex  flex-col h-full justify-center space-y-4'>

        <h1 >Create an Account</h1>
       <form action="" className='flex flex-col space-y-2' onSubmit={handleSubmit}>
    <label htmlFor="">Email</label>
    <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" className='bg-red-100' />
    <label htmlFor="password">Password</label>
    <div className='flex'>

        <input type={Visible} value={password} onChange={(e)=>{setPassword(e.target.value)}} className='bg-red-100'  />

<div onClick={handlePasswordVisible} className='  cursor-pointer  flex items-center -mx-4'>
    {Visible=='text'?(<FaRegEye/>):(<FaRegEyeSlash/>)}
    </div> 

    </div>
    <div>
        {error && <p>{error}</p>}
    </div>
   
    <button type='submit'>Signup</button>
</form> 
<div>
  Already have an account? <Link to={'/login'}>Login</Link>
</div>
    </div>

</div>
    </div>
  )
}

export default Signup