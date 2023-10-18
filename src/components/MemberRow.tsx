import { Member } from "../data/members";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

export function MemberRow({
  member,
  onToggleAdmin,
  applyAdminStyles,
}: {
  member: Member;
  onToggleAdmin?: () => void;
  /** Apply special styles if this user is an admin (i.e. indenting the row) */
  applyAdminStyles?: boolean;
}) {
  const checkboxId = `${member.id}__admin-checkbox`;
  return (
    // TODO: In the future, we might want to let consumers specify the tag to user here. i.e. there's theoretically use cases where we're not rendering this row in a list 🤷🏼‍♂️ and in that case, we might just want a <div>
    <li
      className={`border-2 border-slate-500 p-4 flex flex-col 
                  transition-all ease-in-out duration-300 
                  ${applyAdminStyles && member.admin ? "ml-12" : ""}`}
    >
      <div className="flex flex-row items-center gap-8">
        {/* TODO: Reconsider where this goes, what the UI looks for it, etc. Current state is very barebones and kind of gross */}
        <div className="flex flex-col items-center gap-2">
          <Checkbox.Root
            checked={member.admin}
            onCheckedChange={onToggleAdmin}
            id={checkboxId}
            className="w-8 h-8 border"
          >
            <Checkbox.Indicator className="flex items-center justify-center">
              <CheckIcon />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <label htmlFor={checkboxId}>Admin</label>
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
    </li>
  );
}

/**
 * A skeleton row / loader to show while a member is loading
 */
export function MemberRowSkeleton() {
  return (
    <div className="border-2 border-slate-500 p-4 flex flex-col animate-pulse">
      <div className="flex flex-row items-center gap-8 pl-20">
        <div className="w-16 h-16 rounded-full mr-4 bg-gray-400" />
        <div className="flex flex-col">
          <div className="font-bold text-xl bg-gray-500 h-8 w-48 mb-2" />
          <div className="bg-gray-300 h-4 w-32" />
        </div>
      </div>
    </div>
  );
}

export function getMemberRowSkeletonList(size: number) {
  return Array(size)
    .fill(null)
    .map((_, i) => <MemberRowSkeleton key={i} />);
}
