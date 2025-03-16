import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { loginUser } from '../services/authService';
import { authAtom } from '../store/authAtom';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';


function Login() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const setAuth = useSetRecoilState(authAtom)
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false)
  const [fail, setFail] = useState(false)

  const onSubmit = async (data) => {
    try {
      // console.log(data);
      const response = await loginUser(data)
      setAuth({
        user: response.user,
        isAuthenticated: true
      })
      setSuccess(true)
      reset()
      navigate('/');
    } catch (error) {
      // console.error("Login Failed:", error.message);
      setFail(true)
    }
  }
  return (
    <div className='h-[60vh] flex justify-center items-center'>
      <form onSubmit={handleSubmit(onSubmit)} className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">

        <label className="fieldset-label">Email</label>
        <input
          {...register("email", { required: "Email is required" })}
          type="email" className="input" placeholder="Email"
        />

        {errors.email && <p>{errors.email.message}</p>}

        <label className="fieldset-label">Password</label>
        <input
          {...register("password", { required: "Password is required" })}
          type="password" className="input" placeholder="Password"
        />

        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button type='submit' className="btn btn-neutral mt-4">Login</button>
      </form>
      {success && <Alert text={"Login successfull"}/>}
      {fail && <Alert text={"Login Unsuccessful"}/>}
    </div>
  )
}

export default Login