import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignUpPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', form)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#142930] p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg rounded-2xl bg-[#fce8d8]">
          <CardContent className="p-8">
            <h2 className="text-center text-lg font-semibold text-gray-700 mb-2">Welcome to the Sign Up Portal</h2>
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign Up</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
                <div className="text-right mt-1">
                  <a href="/forgot-password" className="text-sm text-[#142930] hover:underline">Forgot password?</a>
                </div>
              </div>

              <Button type="submit" className="w-full mt-4 bg-[#142930] text-white hover:bg-[#1d3b45]">Create Account</Button>
            </form>

            <p className="text-center text-sm text-gray-700 mt-4">
              Already have an account?{' '}
              <a href="/login" className="text-[#142930] hover:underline font-medium">Log in</a>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
