import React, { useContext, useState } from "react";
import { userService } from "../../api/userService";
import { useNavigate } from "react-router";
import { UserContext } from "../../store/userContext";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext is not provided");
  }
  const { login } = userContext;

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    common?: string;
  }>({});

  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);
      setErrors({});

      const user = await userService.login({ email, password });

      login(user);

      navigate("/");
    } catch (e) {
      console.log(e);
      setErrors({
        common: "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-2">Welcome 👋</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign in to your account
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {errors.common && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {errors.common}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              placeholder="john@mail.com"
              className={`px-3 py-2 border rounded-md outline-none focus:border-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className={`px-3 py-2 border rounded-md outline-none focus:border-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            {errors.password && (
              <span className="text-xs text-red-500">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 py-2 rounded-md transition-colors text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
