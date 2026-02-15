import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const items = [
  {
    value: "who-we-are",
    trigger: "Who are we?",
    content:
      "We are a modern event management platform dedicated to connecting organizers and attendees in a seamless and efficient way. Our goal is to simplify event creation, discovery, and participation for everyone.",
  },
  {
    value: "our-mission",
    trigger: "What is our mission?",
    content:
      "Our mission is to empower communities by making event management simple, accessible, and scalable. We aim to provide organizers with powerful tools while offering attendees an easy way to discover meaningful events.",
  },
  {
    value: "what-we-offer",
    trigger: "What services do we offer?",
    content:
      "We provide tools to create, manage, and promote events. Users can search and filter events by category and location, register instantly, and track their participation. Organizers can manage capacity, edit details, and monitor registrations.",
  },
  {
    value: "who-can-use",
    trigger: "Who can use this platform?",
    content:
      "Our platform is open to individuals, organizations, businesses, and communities who want to host or attend events such as sports, technology meetups, educational workshops, and cultural gatherings.",
  },
  {
    value: "why-choose-us",
    trigger: "Why should I choose this platform?",
    content:
      "We focus on simplicity, reliability, and user experience. With real-time seat availability, easy event management tools, and secure registration processes, we ensure a smooth experience for both organizers and attendees.",
  },
  {
    value: "data-security",
    trigger: "How do we protect your data?",
    content:
      "We prioritize user privacy and data protection. All sensitive information is securely handled, and we follow best practices to ensure your account and event data remain safe.",
  },
  {
    value: "community",
    trigger: "How do we support communities?",
    content:
      "We believe events bring people together. Our platform helps communities grow by making it easier to organize impactful events and connect like-minded individuals.",
  },
  {
    value: "contact",
    trigger: "How can you get in touch with us?",
    content:
      "You can reach out to us anytime through our Contact page. Simply fill out the form and our team will respond promptly to assist you.",
  },
];

export function AccordionCard() {
  return (
    <Card className="w-full max-w-300 mx-auto grow bg-background border-0">
      <CardHeader>
        <CardTitle>Who We Are & What We Do</CardTitle>
        <CardDescription>
          Discover our mission, services, and commitment to creating meaningful
          and memorable event experiences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible defaultValue="plans">
          {items.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
