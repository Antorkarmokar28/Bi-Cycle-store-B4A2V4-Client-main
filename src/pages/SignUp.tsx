import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import signInCover from '@/assets/images/signin-cover.png'
import { Link, useNavigate } from "react-router";
import { useRegisterMutation } from "@/redux/features/register/registerApi";
import { toast } from "sonner";
import { TResponse } from "@/types/global";
// import { TResponse } from "@/types/global";


const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [createUser] = useRegisterMutation();
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Sign up...');
    const userData = {
      name: data?.name,
      email: data?.email,
      password: data?.password,
      address: data?.address,
      phone: data?.phone,
      city: data?.city,
    }
    try{
      const res = (await createUser(userData))  as TResponse;
      console.log(res);
      if(res.error){
        toast.error(res?.error?.data?.message, { id: toastId });
      }else{
        toast.success("User Sign up Successfully", {
          id: toastId,
        });
        navigate('/signin');
      }
    }catch(err){
      toast.error("Something went worng!", { id: toastId });
      console.log(err)
    }
  }
  return (
    <div className="bg-white font-inter">
        <div className="container mx-auto flex justify-center items-center  h-screen">
          <div className='w-3/4 flex shadow-2xl '>
            <div className="bg-white w-2/4 p-6 rounded-lg">
              <h1 className="text-center text-3xl md:text-5xl font-bold text-secondary mb-6"><span className='text-primary'>Sign</span>Up</h1>
              {/* signup form */}
              <form className='w-2/4 mx-auto leading-6' onSubmit={handleSubmit(onsubmit)}>
                <div className='mb-4'>
                  <label htmlFor="name">Name:</label>
                  <br />
                  <input className='p-2 rounded-md bg-[#e9e9e975] w-full block mt-4' id="name" type="text" placeholder="Enter your name" {...register('name')} />
                </div>
                <div className='mb-4'>
                  <label htmlFor="email">Email:</label>
                  <br />
                  <input className='p-2 rounded-md bg-[#e9e9e975] w-full block mt-4' id="email" type="email" placeholder="Enter your email" {...register('email')} />
                </div>
                <div className='mb-6'>
                  <label htmlFor="password">Password:</label>
                  <br />
                  <input className='p-2 rounded-md bg-[#e9e9e975] w-full block mt-4' id="password" type="text" placeholder="Enter your password" {...register('password')} />
                </div>
                <Button className='text-white'>Sign up</Button>
                <p className='text-secondary mt-4'>Do have an Account! <Link className='text-primary font-bold' to="/signin">Sign in</Link></p>
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

export default SignUp;
