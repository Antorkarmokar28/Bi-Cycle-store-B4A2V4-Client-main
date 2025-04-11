import { Button } from '@/components/ui/button';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import {FieldValues, useForm} from 'react-hook-form';
import signInCover from '@/assets/images/signin-cover.png'
import { Link, useNavigate } from 'react-router';
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/features/auth/authSlice';
import { verifyToken } from '@/utils/verifyToken';
import { toast } from 'sonner';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const [ login ] = useLoginMutation();
  const navigate = useNavigate();
  const onsubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Siggin in');
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken);
      dispatch(setUser({user: user, token: res.data.accessToken}));
      toast.success('Sign in', {id: toastId, duration: 2000});
      navigate('/');
    } catch (err){
      toast.error('Something went wrong', {id: toastId, duration: 2000});
      console.log(err)
    }
  }
  return (
    <div className="bg-white font-inter">
        <div className="container mx-auto flex justify-center items-center  h-screen">
          <div className='w-3/4 flex shadow-2xl '>
            <div className="bg-white w-2/4 p-6 rounded-lg">
              <h1 className="text-center text-3xl md:text-5xl font-bold text-secondary mb-6"><span className='text-primary'>Sign</span>In</h1>
              <form className='w-2/4 mx-auto leading-6' onSubmit={handleSubmit(onsubmit)}>
                <div className='mb-4'>
                  <label htmlFor="email">Email:</label>
                  <br />
                  <input className='p-2 rounded-md bg-[#e9e9e975] w-full block mt-4' id="email" type="email" placeholder="Enter your email" {...register('email')} />
                </div>
                <div className='mb-6'>
                  <label htmlFor="password">Password:</label>
                  <br />
                  <input className='p-2 rounded-md bg-[#e9e9e975] w-full block mt-4' id="password" type="Password" placeholder="Enter your password" {...register('password')} />
                </div>
                <Button className='text-white'>Sign in</Button>
                <p className='text-secondary mt-4'>Don't have an Account! <Link className='text-primary font-bold' to="/signup">Sign up</Link></p>
              </form>
            </div>
            <div className='w-2/4'>
              <img className='w-full h-full' src={signInCover} alt="" />
            </div>
          </div>
        </div>
    </div>
  );
};

export default SignIn;
