import React, { useState, useEffect } from "react";
import API from "@/services/api";
import { toast } from "sonner";
import { LoaderOne } from "@/components/ui/loader";
import Footer from "@/components/footer";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { NavbarDemo } from "@/components/Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false); // ✅ CONTROL DIALOG

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    description: "",
    gender: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // ================= FETCH PROFILE =================
  const fetchProfile = async () => {
    try {
      const res = await API.get("/api/auth/get-profile");
      setUser(res.data);
    } catch {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ================= OPEN EDIT =================
  const handleEditClick = () => {
    if (!user) return;

    setFormData({
      name: user.name || "",
      contact: user.contact || "",
      description: user.description || "",
      gender: user.gender || "",
    });

    setPreview(user.profileImage?.url || null);
    setImage(null);
    setOpen(true);
  };

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================= IMAGE CHANGE =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ================= UPDATE PROFILE =================
  const handleUpdate = async () => {
    setLoading(true);

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => data.append(key, formData[key]));

      if (image) {
        data.append("profileImage", image);
      }

      await API.put("/api/auth/profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await fetchProfile(); // 🔥 Refresh profile immediately

      toast.success("Profile updated successfully 🎉");

      setOpen(false); // ✅ close dialog
    } catch (error) {
      console.error(error);
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavbarDemo />
      <div>
        {!user ? (
          <div className="w-full h-screen flex items-center justify-center">
            <LoaderOne />
          </div>
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-background px-4">
            {/* ================= PROFILE CARD ================= */}
            <div className="w-full max-w-xl bg-card border border-border rounded-2xl shadow-xl p-8 text-center space-y-4">
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-border">
                <img
                  src={
                    user.profileImage?.url ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
              <p className="text-sm">
                {user.description || "No description added."}
              </p>

              {/* ================= DIALOG ================= */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleEditClick}>Edit Profile</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-lg text-muted outline">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      Edit Profile
                    </DialogTitle>
                  </DialogHeader>

                  {/* IMAGE */}
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-24 h-24 rounded-full overflow-hidden border">
                      <img
                        src={
                          preview ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <label className="cursor-pointer text-sm text-primary hover:underline">
                      Change Picture
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>

                  {/* FORM */}
                  <div className="space-y-4 mt-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className="w-full rounded-lg border px-4 py-2 "
                    />

                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="Contact"
                      className="w-full rounded-lg border px-4 py-2"
                    />

                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full rounded-lg border px-4 py-2"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>

                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Description"
                      className="w-full rounded-lg border px-4 py-2"
                    />
                  </div>

                  <DialogFooter className="mt-6">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>

                    <Button onClick={handleUpdate} disabled={loading}>
                      {loading ? "Updating..." : "Update"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
