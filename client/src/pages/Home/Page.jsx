import React from "react";
import { NavbarDemo } from "@/components/Navbar";
import { AccordionCard } from "@/components/faq";
import { Link } from "react-router-dom";
import Footer from "@/components/footer";

const Home = () => {
  return (
    <div>
      <NavbarDemo />
      <div>
        <main className="flex-1 relative -top-8">
          <div className="flex min-h-dvh items-center justify-center bg-background dark:bg-background">
            <div className="theme-zinc w-full" style={{ "--radius": "0.5rem" }}>
              <div className="flex min-h-full w-full items-center justify-center">
                <div className="relative w-full">
                  {/* Hero Content */}
                  <div className="relative flex min-h-dvh w-full flex-col justify-end p-4 md:p-14">
                    <div
                      className="pointer-events-none absolute inset-4 overflow-hidden md:inset-10"
                      style={{ opacity: 1 }}
                    >
                      <img
                        alt="Background"
                        className="h-full w-full mask-t-from-20% mask-b-from-50% mask-l-from-50% object-cover object-center"
                        src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1920"
                      />
                    </div>

                    {/* Decorative borders */}
                    <div className="pointer-events-none absolute inset-x-0 top-4 h-px w-full bg-border md:top-10 dark:bg-border"></div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-4 h-px w-full bg-border md:bottom-10 dark:bg-border"></div>
                    <div className="pointer-events-none absolute inset-y-0 left-4 h-full w-px bg-border md:left-10 dark:bg-border"></div>
                    <div className="pointer-events-none absolute inset-y-0 right-4 h-full w-px bg-border md:right-10 dark:bg-border"></div>

                    <div className="relative z-40 p-4 md:p-4 -top-20">
                      <h1 className="max-w-3xl text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-6xl dark:text-foreground">
                        Create and Discover Events Effortlessly
                      </h1>
                      <p className="mt-4 max-w-xl text-base text-foreground md:mt-6 md:text-lg dark:text-foreground">
                        Plan, host, and join events in just a few clicks. From
                        sports tournaments to cultural festivals, our platform
                        makes event management simple and seamless.
                      </p>

                      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center md:mt-10">
                        <Link to="/events">
                          <button className="group/button relative flex cursor-pointer items-center gap-2 rounded-lg border border-white/20 bg-black py-2 pr-4 pl-11 tracking-tight">
                            <div className="absolute inset-y-0 left-1 z-40 my-auto flex size-8 flex-col items-center justify-center gap-px rounded-[5px] bg-yellow-500 transition-all duration-400 ease-out group-hover/button:left-[calc(100%-2.3rem)] group-hover/button:rotate-180 group-hover/button:transform">
                              <div className="flex flex-col gap-px">
                                <div className="flex gap-px">
                                  <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25"></span>
                                  <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25"></span>
                                  <span className="inline-block size-0.75 shrink-0 rounded-full animate-pulse bg-white duration-200 ease-linear"></span>
                                  <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25"></span>
                                  <span className="inline-block size-0.75 shrink-0 rounded-full bg-white/25"></span>
                                </div>
                              </div>
                            </div>
                            <div className="absolute -inset-px rounded-lg bg-white/20 transition-[clip-path] duration-400 ease-out [clip-path:inset(0_100%_0_0)] group-hover/button:[clip-path:inset(0_0%_0_0)]"></div>
                            <span className="inline-block text-white transition-transform duration-400 group-hover/button:-translate-x-8">
                              Get Started
                            </span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <DummyContent />
        <GetStarted />
        <AccordionCard />
        <Footer />
      </div>
    </div>
  );
};

const GetStarted = () => {
  return (
    <section className="py-16 bg-background sm:py-20 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl">
            How It Works
          </h2>

          <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-muted-foreground">
            Getting started is simple. Create your account, explore or host
            events, and become part of an exciting community.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-16 lg:mt-20">
          {/* Decorative Line */}
          <div className="absolute inset-x-0 hidden xl:px-44 top-6 md:block md:px-20 lg:px-28">
            <img
              className="w-full opacity-40"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
              alt="Decorative line"
            />
          </div>

          <div className="relative grid grid-cols-1 text-center gap-y-14 md:grid-cols-3 gap-x-12">
            {/* Step 1 */}
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-background border-2 border-primary rounded-full shadow-md">
                <span className="text-xl font-semibold text-primary">1</span>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-foreground md:mt-10">
                Create Your Account
              </h3>

              <p className="mt-4 text-base text-muted-foreground">
                Sign up in seconds to access all features. Manage your profile,
                track registrations, and host events easily.
              </p>
            </div>

            {/* Step 2 */}
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-background border-2 border-primary rounded-full shadow-md">
                <span className="text-xl font-semibold text-primary">2</span>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-foreground md:mt-10">
                Create or Register for an Event
              </h3>

              <p className="mt-4 text-base text-muted-foreground">
                Organizers can create and manage events. Attendees can browse,
                filter by category or location, and register instantly.
              </p>
            </div>

            {/* Step 3 */}
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-background border-2 border-primary rounded-full shadow-md">
                <span className="text-xl font-semibold text-primary">3</span>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-foreground md:mt-10">
                Participate & Enjoy
              </h3>

              <p className="mt-4 text-base text-muted-foreground">
                Attend the event, connect with like-minded people, and make the
                most of your experience. Stay updated with real-time details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
const DummyContent = () => {
  const boxes = [
    {
      id: 1,
      title: "Tech Conference 2026",
      desc: "Explore the future of AI, Web & Cloud",
      image:
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1600",
      width: "md:col-span-2",
    },
    {
      id: 2,
      title: "Music Festival",
      desc: "Live performances from top artists",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600",
      width: "md:col-span-1",
    },
    {
      id: 3,
      title: "Startup Meetup",
      desc: "Network with founders & investors",
      image:
        "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1600",
      width: "md:col-span-1",
    },
    {
      id: 4,
      title: "Design Workshop",
      desc: "Hands-on UI/UX learning experience",
      image:
        "https://images.unsplash.com/photo-1492724441997-5dc865305da7?q=80&w=1600",
      width: "md:col-span-2",
    },
    {
      id: 5,
      title: "Sports Tournament",
      desc: "Compete and celebrate victory",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1600",
      width: "md:col-span-1",
    },
    {
      id: 6,
      title: "Cultural Fest",
      desc: "Tradition, art & performances",
      image:
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1600",
      width: "md:col-span-1",
    },
  ];

  return (
    <div className="container mx-auto p-8 pt-24">
      <h1 className="mb-4 text-center text-3xl font-bold text-foreground">
        Discover Upcoming Events
      </h1>

      <p className="mb-10 text-center text-sm text-muted-foreground">
        Browse trending events happening near you. Explore conferences,
        workshops, festivals and more.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {boxes.map((box) => (
          <div
            key={box.id}
            className={`${box.width} relative h-64 rounded-xl overflow-hidden shadow-md group`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${box.image})` }}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Text Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
              <h2 className="text-xl md:text-2xl font-semibold text-white">
                {box.title}
              </h2>
              <p className="mt-2 text-sm text-gray-200">{box.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
