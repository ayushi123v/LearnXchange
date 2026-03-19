import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Label } from '@/components/ui/Label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Shishya'
  });

  const [showPassword, setShowPassword] = useState(false);

  const { signup, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRoleChange = (value) =>
    setFormData({ ...formData, role: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signup(formData);
    if (success) {
      navigate('/profile');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center min-h-screen px-4 
      bg-gradient-to-br from-purple-900 via-indigo-900 to-black"
    >
      <Card className="mx-auto max-w-sm w-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-2xl">
        
        <CardHeader>
          <CardTitle className="text-2xl text-center text-white">
            Join LetXchange 🚀
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            Start your skill journey today
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">

            {/* Name */}
            <div className="grid gap-2">
              <Label className="text-gray-200">Name</Label>
              <Input
                name="name"
                placeholder="Enter your name"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

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
                  placeholder="Create a password"
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

            {/* Role */}
            <div className="grid gap-2">
              <Label className="text-gray-200">I want to</Label>
              <Select
                onValueChange={handleRoleChange}
                defaultValue={formData.role}
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="Shishya">Skill Seeker 🔥</SelectItem>
                <SelectItem value="Guru">Skill Master ⚡</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Creating account..." : "Join Now 🚀"}
            </Button>
          </form>

          {/* Login link */}
          <div className="mt-4 text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:underline">
              Login
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

export default Signup;