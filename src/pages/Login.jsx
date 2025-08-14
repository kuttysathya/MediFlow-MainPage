import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const {token, setToken} = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(state === 'Sign Up'){

        const check = await axios.get(`http://localhost:5000/patients?email=${email}`);
      if (check.data.length > 0) {
        toast.error("Email already registered!");
        return;
      }

      await axios.post("http://localhost:5000/patients", { name, email, password });
      toast.success("Account created successfully!");
      setState("Login");

      } else {

        const res = await axios.get(`http://localhost:5000/patients?email=${email}&password=${password}`);
        if (res.data.length > 0) {
          localStorage.setItem("token", res.data[0].id);
          setToken(res.data[0].id);
          toast.success("Login successful!");
        } else {
          toast.error("Invalid credentials!");
        }
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])


  return (
    <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 items-start m-auto p-8 min-w-[340px] sm:min-w-96 border border-gray-300 rounded-xl text-zinc-600 text-sm shadow-lg bg-white'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ?'Create Account':'Login'}</p>
        <p>Please {state === 'Sign Up' ?'Sign Up':'Login'} to Book Appointment</p>
        {
          state === 'Sign Up' && 
          <div className='w-full'>
            <p>Full Name</p>
            <input 
              type="text" 
              placeholder='Enter your username' 
              value={name} 
              onChange={(e) => setName(e.target.value)} required
              className='w-full border border-gray-300 rounded-md p-2 mt-1'
            />      
          </div>
        }
        <div className='w-full'>
          <p>Email</p>
          <input 
            type="email" 
            placeholder='Enter your email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} required
            className='w-full border border-gray-300 rounded-md p-2 mt-1'
          />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input 
            type="password" 
            placeholder='create a password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} required
            className='w-full border border-gray-300 rounded-md p-2 mt-1'
          />
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md mt-4 text-base'>{state === 'Sign Up' ?'Create Account':'Login'}</button>
        {state === 'Sign Up' 
        ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login</span></p>
        : <p>Don't have an account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Sign Up</span></p>
        }
      </div>
    </form>
  )
}

export default Login
