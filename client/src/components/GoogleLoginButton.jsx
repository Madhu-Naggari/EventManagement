import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import API from "@/services/api"; // your axios instance with interceptor
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const GoogleLoginButton = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    scope: "openid email profile",
    onSuccess: async (codeResponse) => {
      try {
        const { code } = codeResponse;
        console.log(code);
        if (!code) return toast.error("No code found");
        const { data } = await API.post("/api/auth/google-login", { code });

        const { token, ...userData } = data;
        console.log("data", data);
        login(userData, token);

        toast.success("Login successful 🎉");
        navigate("/");
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Server authentication failed",
        );
      }
    },
    onError: () => {
      toast.error("Google login failed");
    },
  });

  return (
    <Button
      className="w-full flex items-center gap-2 cursor-pointer"
      onClick={() => googleLogin()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="h-5 w-5"
      >
        <path
          fill="#EA4335"
          d="M24 9.5c3.2 0 6.1 1.1 8.4 3.3l6.3-6C34.8 2.5 29.8 0 24 0 14.6 0 6.5 5.5 2.6 13.5l7.7 6C12.3 13 17.7 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.6-4.9 7.4l7.6 6c4.4-4.1 7.1-10.2 7.1-17.9z"
        />
        <path
          fill="#FBBC05"
          d="M10.3 28.5c-1-3-1-6.2 0-9.2l-7.7-6C.9 17.2 0 20.5 0 24s.9 6.8 2.6 10.7l7.7-6.2z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.5 0 12-2.1 16-5.7l-7.6-6c-2.1 1.4-4.9 2.2-8.4 2.2-6.3 0-11.7-3.5-13.7-8.5l-7.7 6C6.5 42.5 14.6 48 24 48z"
        />
      </svg>
      Sign in with Google
    </Button>
  );
};

export default GoogleLoginButton;
