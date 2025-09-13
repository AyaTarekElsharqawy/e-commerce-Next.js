"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors: typeof errors = {}

        // basic validation
        if (!email) newErrors.email = "Email is required"
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            newErrors.email = "Invalid email format"

        if (!password) newErrors.password = "Password is required"

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // check if user exists in localStorage
        const storedUser = localStorage.getItem("user")
        if (!storedUser) {
            setErrors({ general: "No account found. Please sign up first." })
            return
        }

        const { email: savedEmail, password: savedPassword } = JSON.parse(storedUser)

        if (email !== savedEmail || password !== savedPassword) {
            setErrors({ general: "Invalid email or password" })
            return
        }

        // login success
        localStorage.setItem("loggedIn", "true")


        const cart = localStorage.getItem("cart")
        if (cart && JSON.parse(cart).length > 0) {
            router.push("/checkout")
        } else {
            router.push("/")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
            >
                <h1 className="text-2xl font-bold text-center mb-6 text-yellow-900">
                    Login
                </h1>

                {errors.general && (
                    <p className="text-red-500 text-sm mb-4 text-center">{errors.general}</p>
                )}

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 
              ${errors.email
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-yellow-900"}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 
              ${errors.password
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-yellow-900"}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-yellow-900 text-white py-2 rounded hover:bg-yellow-800 transition"
                >
                    Login
                </button>

                <p className="text-sm text-center mt-4">
                    Don&apos;t have an account?{" "}
                    <a href="/signup" className="text-yellow-900 hover:underline">
                        Sign up
                    </a>
                </p>
            </form>
        </div>
    )
}
