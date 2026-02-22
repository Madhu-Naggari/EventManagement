import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function EventCard(props) {
  const { eventDetails, eventId, eventFunction } = props;

  if (!eventDetails) return null;
  const { name, description, category, image } = eventDetails;

  return (
    <Card className="mx-auto w-[300px] h-[320px] flex flex-col overflow-hidden pt-0">
      {/* Image */}
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={image?.url || ""}
          alt="Event cover"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <CardHeader className="flex-1">
          <div className="flex justify-between items-center gap-2">
            <CardTitle className="text-base line-clamp-1">
              {name || ""}
            </CardTitle>
            <Badge variant="secondary">{category}</Badge>
          </div>

          <CardDescription className="line-clamp-2 mt-2">
            {description}
          </CardDescription>
        </CardHeader>

        {/* Footer */}
        <CardFooter>
          <Button
            className="w-full cursor-pointer"
            onClick={() => eventFunction(eventId)}
          >
            View Event
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
