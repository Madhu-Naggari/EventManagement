import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

import { cn } from "@/utils/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import GoogleLoginButton from "./GoogleLoginButton";
import { useAuth } from "@/context/AuthContext";
import { SelectDemo } from "./SelectDemo";

export function SignUpForm({ className, ...props }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const BASE_URL =
        import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000";

      const { data } = await axios.post(`${BASE_URL}/api/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // Extract token
      const { token, ...userData } = data;

      // Save in context + cookies
      login(userData, token);

      toast.success("Account created successfully 🎉");

      // Navigate to home
      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden bg-background">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* LEFT SIDE FORM */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Hello Friend</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your details to continue with us
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <SelectDemo
                  value={formData.role}
                  onChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Sign Up"}
              </Button>

              {/* Divider */}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>

              <div className="w-full rounded border border-border p-2">
                <GoogleLoginButton />
              </div>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>

          {/* RIGHT SIDE IMAGE */}
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://res.cloudinary.com/dv2fvq9dd/image/upload/v1771077325/loginlogo_mdua8s.webp"
              alt="Signup"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
