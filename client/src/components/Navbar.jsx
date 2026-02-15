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

export function NavbarDemo() {
  let token = Cookies.get("token");
  const { logout } = useAuth();
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "My Events",
      link: "/my-events",
    },
    {
      name: "Events",
      link: "/events",
    },
    {
      name: "Contact Us",
      link: "/contact",
    },
    {
      name: "Profile",
      link: "/profile",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    // Updated: text-foreground
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          {token === "" ? (
            <>
              <NavbarButton variant="secondary">
                <Link to="/login">Login</Link>
              </NavbarButton>
              <NavbarButton variant="primary">
                <Link to="/register">Register</Link>
              </NavbarButton>
            </>
          ) : (
            <>
              <NavbarButton onClick={() => logout()}>logout</NavbarButton>
            </>
          )}
        </div>
      </NavBody>

      {/* Mobile Navigation */}
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
              to={`${item.link}`}
              onClick={() => setIsMobileMenuOpen(false)}
              // Updated: text-muted-foreground
              className="relative text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="block">{item.name}</span>
            </Link>
          ))}
          <div className="flex w-full flex-col gap-4">
            {token === "" ? (
              <>
                <NavbarButton variant="secondary">
                  <Link to="/login">Login</Link>
                </NavbarButton>
                <NavbarButton variant="primary">
                  <Link to="/register">Register</Link>
                </NavbarButton>
              </>
            ) : (
              <>
                <NavbarButton onClick={() => logout()}>logout</NavbarButton>
              </>
            )}
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}

const DummyContent = () => {
  return (
    <div className="container mx-auto p-8 pt-24">
      <h1 className="mb-4 text-center text-3xl font-bold text-foreground">
        Check the navbar at the top of the container
      </h1>
      {/* Updated: text-muted-foreground */}
      <p className="mb-10 text-center text-sm text-muted-foreground">
        For demo purpose we have kept the position as{" "}
        <span className="font-medium text-foreground">Sticky</span>. Keep in
        mind that this component is{" "}
        <span className="font-medium text-foreground">fixed</span> and will not
        move when scrolling.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          {
            id: 1,
            title: "The",
            width: "md:col-span-1",
            height: "h-60",
            // Updated: bg-muted
            bg: "bg-muted",
          },
          {
            id: 2,
            title: "First",
            width: "md:col-span-2",
            height: "h-60",
            bg: "bg-muted",
          },
          {
            id: 3,
            title: "Rule",
            width: "md:col-span-1",
            height: "h-60",
            bg: "bg-muted",
          },
          {
            id: 4,
            title: "Of",
            width: "md:col-span-3",
            height: "h-60",
            bg: "bg-muted",
          },
          {
            id: 5,
            title: "F",
            width: "md:col-span-1",
            height: "h-60",
            bg: "bg-muted",
          },
          {
            id: 6,
            title: "Club",
            width: "md:col-span-2",
            height: "h-60",
            bg: "bg-muted",
          },
          {
            id: 7,
            title: "Is",
            width: "md:col-span-2",
            height: "h-60",
            bg: "bg-muted",
          },
          {
            id: 8,
            title: "You",
            width: "md:col-span-1",
            height: "h-60",
            bg: "bg-muted",
          },
          {
            id: 9,
            title: "Do NOT TALK about",
            width: "md:col-span-2",
            height: "h-60",
            bg: "bg-muted",
          },
          {
            id: 10,
            title: "F Club",
            width: "md:col-span-1",
            height: "h-60",
            bg: "bg-muted",
          },
        ].map((box) => (
          <div
            key={box.id}
            className={`${box.width} ${box.height} ${box.bg} flex items-center justify-center rounded-lg p-4 shadow-sm border border-border/10`}
          >
            <h2 className="text-xl font-medium text-muted-foreground">
              {box.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};
