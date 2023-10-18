import { Member } from "../data/members";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { Row } from "./Row";

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
    // {/* TODO: Reconsider where this goes, what the UI looks for it, etc. Current state is very barebones and kind of gross */}
    <Row
      className={` transition-all ease-in-out duration-300 ${
        applyAdminStyles && member.admin ? "ml-12" : ""
      }`}
    >
      {{
        column1: (
          <Avatar>
            {/* TODO: Handle when image isn't loaded yet, i.e. show the skeleton during that time instead */}
            <img
              src={member.photo}
              alt={member.first + " " + member.last}
              className="rounded-full"
            />
          </Avatar>
        ),
        column2: (
          <div className="flex flex-col">
            <div className="font-semibold text-slate-800 text-lg">
              {member.first + " " + member.last}
            </div>
            <div className="text-slate-500">{member.role}</div>
          </div>
        ),
        column3: (
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
        ),
      }}
    </Row>
  );
}

/********************************************************************
 * Shared Utils
 *******************************************************************/

function Avatar({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-12 h-12 rounded-full ${className}`}>{children}</div>
  );
}

/********************************************************************
 * Skeleton
 *******************************************************************/

/**
 * A skeleton row / loader to show while a member is loading
 */
export function MemberRowSkeleton({
  avatarColor = "bg-slate-400",
}: {
  /** Background color to make the loader for the user's avatar, as a Tailwind string (e.g. `bg-red-950`) */
  avatarColor?: string;
}) {
  // TODO: Use a better and more DRY way to share sizes and positions to mirror what a row looks like, instead of hardcoding them in both places
  return (
    <Row>
      {{
        column1: <Avatar className={avatarColor} />,
        column2: (
          <div className="flex flex-col">
            <div className="font-bold text-xl bg-slate-500 h-8 w-48 mb-2" />
            <div className="bg-slate-300 h-4 w-32" />
          </div>
        ),
      }}
    </Row>
  );
}

export function getMemberRowSkeletonList(size: number) {
  const colorList = [
    "bg-red-950",
    "bg-sky-950",
    "bg-emerald-950",
    "bg-fuchsia-950",
    "bg-yellow-950",
    "bg-indigo-950",
    "bg-rose-950",
    "bg-green-950",
  ];

  return Array(size)
    .fill(null)
    .map((_, i) => (
      <MemberRowSkeleton
        key={i}
        avatarColor={colorList[Math.floor(Math.random() * colorList.length)]}
      />
    ));
}
