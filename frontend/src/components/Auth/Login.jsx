import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const { login, loading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-screen px-4 
      bg-gradient-to-br from-purple-900 via-indigo-900 to-black
      dark:from-purple-900 dark:via-indigo-900 dark:to-black
      light:from-gray-100 light:to-white"
    >
      <Card className="mx-auto max-w-sm w-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-white">
            LetXchange 🔥
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            Welcome back! Let’s exchange skills 🚀
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">

            {/* Email */}
            <div className="grid gap-2">
              <Label className="text-gray-200">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label className="text-gray-200">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 cursor-pointer text-sm text-gray-300"
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Signing in..." : "Start Skill Exchange 🚀"}
            </Button>
          </form>

          {/* Signup */}
          <div className="mt-4 text-center text-sm text-gray-300">
            New here?{" "}
            <Link to="/signup" className="text-purple-400 hover:underline">
              Join LetXchange
            </Link>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-400 mt-4">
            Built by Ayushi 💜
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Login;