import { useState } from "react";
import { NavbarDemo } from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import API from "@/services/api";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);

    try {
      await API.post("/api/contact", formData);

      toast.success("Message sent successfully! 📩");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavbarDemo />

      <div className="max-w-200 mx-auto px-6 py-12 h-screen">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-muted/40 p-8 rounded-xl border"
        >
          <Input
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            name="subject"
            placeholder="Subject"
            required
            value={formData.subject}
            onChange={handleChange}
          />

          <Textarea
            name="message"
            placeholder="Your Message..."
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
