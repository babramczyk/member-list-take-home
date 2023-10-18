import { Member } from "../data/members";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

export function MemberRow({
  member,
  onToggleAdmin,
}: {
  member: Member;
  onToggleAdmin?: () => void;
}) {
  return (
    <div className="border-2 border-slate-500 p-4 flex flex-col">
      <div className="flex flex-row items-center gap-8">
        {/* TODO: Reconsider where this goes, what the UI looks for it, etc. Current state is very barebones and kind of gross */}
        <div className="flex flex-col items-center gap-2">
          <Checkbox.Root
            checked={member.admin}
            onCheckedChange={onToggleAdmin}
            id={`${member.id}__admin-checkbox`}
            className="w-8 h-8 border"
          >
            <Checkbox.Indicator className="flex items-center justify-center">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label htmlFor={`${member.id}__admin-checkbox`}>Admin</label>
        </div>

        <img
          src={member.photo}
          alt={member.first}
          className="w-16 h-16 rounded-full mr-4"
        />
        <div className="flex flex-col">
          <div className="font-bold text-xl">
            {member.first + " " + member.last}
          </div>
          <div className="text-gray-500">{member.role}</div>
        </div>
      </div>
    </div>
  );
}
