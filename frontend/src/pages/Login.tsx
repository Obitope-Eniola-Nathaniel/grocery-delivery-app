import { useState } from "react";
import hero_bg from "../assets/hero_bg.jpeg";
import { Link } from "react-router-dom";
import { BikeIcon, Loader2Icon, LockIcon, MailIcon, UserIcon } from "lucide-react";

const Login = () => {
  const [isLoginState, setIsLoginState] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => (window.location.href = "/"), 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-app-green relative items-center justify-center">
        <img
          src={hero_bg}
          alt=""
          className="absolute inset-0 object-cover h-full bg-center opacity-10"
        />
        <div className="relative text-center px-12">
          <h2 className="text-4xl font-semibold text-white mb-4">
            Welcome back to Instacart
          </h2>
          <p className="text-white/60 font-serif text-xl max-w-sm mx-auto">
            Fresh groceries and organic produce, delivered to your desktop.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex-center px-4 py-12 bg-app-cream">
        <div className="w-full max-w-md">
          {/* form header message */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <BikeIcon className="size-8 text-app-green" />
              <span className="text-2xl font-semibold text-app-green">
                Instacart
              </span>
            </Link>
            <h1 className="text-2xl font-semibold text-app-green mb-2">
              {isLoginState ? "Login to your account" : "Create a new account"}
            </h1>
            <p className="text-sm text-app-text-light">
              {isLoginState
                ? "Don't have an account?"
                : "Already have an account?"}
              <button
                onClick={() => setIsLoginState(!isLoginState)}
                className="text-orange-500 ml-1 font-semibold hover:text-orange-600 transition-colors"
              >
                {isLoginState ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>

          {/* Login / Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLoginState && (
              <label htmlFor="name" className="block">
                Name
                <div className="relative mt-2">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-app-text-light" />
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-3 pl-11 py-2 bg-white not-focus:border-app-border transition-all"
                    required
                    placeholder="Enter your name"
                  />
                </div>
              </label>
            )}
            <label htmlFor="email" className="block">
              Email
              <div className="relative mt-2">
                <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-app-text-light" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 pl-11 py-2 bg-white not-focus:border-app-border transition-all"
                  placeholder="Enter your email"
                />
              </div>
            </label>
            <label htmlFor="password" className="block">
              Password
              <div className="relative mt-2">
                <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-app-text-light" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-3 pl-11 py-2 bg-white not-focus:border-app-border transition-all"
                  placeholder="*********"
                />
              </div>
            </label>
            <button
              type="submit"
              disabled={loading}
              className="flex-center w-full py-3 bg-green-950 text-white font-semibold rounded-xl hover:bg-green-900 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2Icon className="animate-spin"/> : isLoginState  ? "Login" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
