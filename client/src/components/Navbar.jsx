import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export function NavbarDemo() {
  const { logout } = useAuth();
  const { user } = useAuth();
  const navItems = [
    { name: "Home", link: "/" },
    { name: "My Events", link: "/my-events" },
    { name: "Events", link: "/events" },
    { name: "Contact Us", link: "/contact" },
    { name: "Profile", link: "/profile" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsLogoutDialogOpen(false);
  };

  const openLogoutDialog = () => setIsLogoutDialogOpen(true);

  return (
    <>
      {/* Navbar */}
      <Navbar>
        {/* Desktop */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <NavbarButton variant="secondary">
                  <Link to="/login">Login</Link>
                </NavbarButton>
                <NavbarButton variant="primary">
                  <Link to="/register">Register</Link>
                </NavbarButton>
              </>
            ) : (
              <NavbarButton onClick={openLogoutDialog}>Logout</NavbarButton>
            )}
          </div>
        </NavBody>

        {/* Mobile */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}

            {user && (
              <div className="flex w-full flex-col gap-4 mt-4">
                <NavbarButton onClick={openLogoutDialog}>Logout</NavbarButton>
              </div>
            )}

            {!user && (
              <div className="flex w-full flex-col gap-4 mt-4">
                <NavbarButton variant="secondary">
                  <Link to="/login">Login</Link>
                </NavbarButton>
                <NavbarButton variant="primary">
                  <Link to="/register">Register</Link>
                </NavbarButton>
              </div>
            )}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Logout Confirmation Dialog (shared for desktop & mobile) */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent className="sm:max-w-100">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to logout? You will be redirected to the
              login page.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <NavbarButton
              variant="secondary"
              onClick={() => setIsLogoutDialogOpen(false)}
            >
              Cancel
            </NavbarButton>
            <NavbarButton variant="destructive" onClick={handleLogout}>
              Logout
            </NavbarButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
