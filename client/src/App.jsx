import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/login/page";
import SignUpPage from "./pages/register/page";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "@/components/ui/sonner";
import Events from "./pages/Events/Page";
import { EventProvider } from "./context/EventContext";
import { RegistrationProvider } from "./context/RegistrationContext";
import EventDetails from "./pages/eventDetails/Page";
import MyEvents from "./pages/myEvents/Page";
import Profile from "./pages/profile/Page";
import Contact from "./pages/contact/Page";
import Home from "./pages/Home/Page";
import NotFound from "./pages/notFound/Page";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Toaster position="bottom-right" richColors />
      <Router>
        <ScrollToTop />
        <AuthProvider>
          <EventProvider>
            <RegistrationProvider>
              <Routes>
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  }
                />

                <Route
                  path="/register"
                  element={
                    <PublicRoute>
                      <SignUpPage />
                    </PublicRoute>
                  }
                />

                <Route path="/" element={<Home />} />
                <Route
                  path="/events"
                  element={
                    <PrivateRoute>
                      <Events />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/events/:id"
                  element={
                    <PrivateRoute>
                      <EventDetails />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/my-events"
                  element={
                    <PrivateRoute>
                      <MyEvents />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PrivateRoute>
                      <Contact />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    <PrivateRoute>
                      <NotFound />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </RegistrationProvider>
          </EventProvider>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
