import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select your role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Role</SelectLabel>
          <SelectItem value="User">User</SelectItem>
          <SelectItem value="Organizer">Organizer</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
