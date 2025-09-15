import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { base_url } from "../constant";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  })
  .required();

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitHandler = async (data) => {
    try {
      const response = await axios.post(`${base_url}/users/register`, data, { withCredentials: true } );
      toast.success(response.data?.message);
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light_green to-gray-50 px-4">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-green mb-6">
            Create new account
          </h2>
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-1">Name</label>
              <input
                type="text"
                {...register("name")}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-light_green"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-1">Email</label>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-light_green"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-1">
                Password
              </label>
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

            <button
              type="submit"
              className="w-full py-2 px-4 bg-green text-white rounded-lg transition duration-300"
            >
              Sign Up
            </button>
          </form>

          {/* Extra Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account? {"  "}
            <span
              onClick={() => navigate("/login")}
              className="text-green hover:underline cursor-pointer"
            >
              {" "}
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
