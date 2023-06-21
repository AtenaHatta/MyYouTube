import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


function SignUp() {
  const navigate = useNavigate();
  const VITE_HOST = import.meta.env.VITE_HOST;

  //zod schema
  const schema = z
    .object({
      email: z.string().email({ message: "Invalid email" }),
      password: z.string().min(5, {
        message: "Password is too short! Must be a minimum of 5 characters.",
      }),
      confirmPass: z.string().min(5, {
        message: "Password is too short! Must be a minimum of 5 characters.",
      }),
    })
    .refine((data) => data.password === data.confirmPass, {
      message: "Passwords do not match",
      path: ["confirmPass"],
    });
    console.log(useForm);

  //React hook form
  const {register, handleSubmit, formState: { errors, isSubmitting }} = useForm({
    resolver: zodResolver(schema),
  });

  //send this data to backend
  const handleSignUp = async (formData) => {
    try {
      await axios.post(`${VITE_HOST}/user/signup`, {
        email: formData.email,
        password: formData.password,
      });
      toast.success("Sign up successful!");
      navigate("/signin");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen m-3">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-extrabold text-center text-gray-900">
          Sign Up
        </h2>
        <form
          className="space-y-6"
          onSubmit={handleSubmit((formData) => handleSignUp(formData))}
          sx={{ mt: 3 }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              type="email"
              placeholder="Email"
              name="email"
              {...register("email")}
            />
          </div>
          {errors.email && <p className="error text-[red]">{errors.email.message}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              type="password"
              placeholder="Password"
              name="password" 
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="error text-[red]">{errors.password.message}</p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              {...register("confirmPass")}
            />
          </div>
          {errors.confirmPass && (
            <p className="error text-[red]">{errors.confirmPass.message}</p>
          )}

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
            <div className="text-right mt-2">
              <span className="text-sm text-gray-400 pr-2">
                Already have an account?
              </span>
              <Link
                to="/signin"
                className="text-sm text-red-600 hover:text-red-500"
              >
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
      <Link to="/" className="text-sm text-white hover:text-red-500 mt-5">
        back
      </Link>
    </div>
  );
}

export default SignUp;
