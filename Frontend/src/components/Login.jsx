import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { base_url } from "../constant";
import { useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../Context/AuthContext";

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: yup.string().required("Password is required"),
  })
  .required();

const Login = () => {
  let { user, setUser } = useContext(authContext);
  const navigate = useNavigate();

  const location = useLocation();

  // console.log(location)

    const from = location.state?.from?.pathname || "/"; 

  console.log(from)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = async (data) => {
    try {
      let response = await axios.post(`${base_url}/users/login`, data, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setUser(response.data.data.userData);
      navigate(from, {replace : true}  );
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light_green to-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-green mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-light_green"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-light_green"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green text-white rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Extra Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green hover:underline cursor-pointer"
          > Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
