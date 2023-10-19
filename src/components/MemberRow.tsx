import { Member } from "../data/members";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import { Row } from "./Row";

/**
 * A row in the members list
 */
export function MemberRow({
  member,
  onToggleAdmin,
  applyAdminStyles,
}: {
  /** The full member object to render */
  member: Member;
  /** Called when the user initiated an action to toggle whether the user is an admin or not */
  onToggleAdmin?: () => void;
  /** Apply special styles if this user is an admin (i.e. indenting the row) */
  applyAdminStyles?: boolean;
}) {
  const checkboxId = `${member.id}__admin-checkbox`;
  return (
    <Row
      className={` transition-all ease-in-out duration-300 bg-white ${
        // TODO: Make this transition smoother, i.e. with `transform`
        applyAdminStyles && member.admin ? "ml-12" : ""
      }`}
    >
      {{
        column1: (
          <Avatar>
            {/* TODO: Handle when image isn't loaded yet, i.e. show the skeleton during that time instead */}
            {/* NOTE: We're using an empty `alt` here, since this element is purely decorative */}
            <img src={member.photo} alt="" className="rounded-full" />
          </Avatar>
        ),
        column2: (
          <div className="flex flex-col">
            <div className="font-semibold text-slate-700 text-lg">
              {member.first + " " + member.last}
            </div>
            <div className="text-slate-500">{member.role}</div>
          </div>
        ),
        columnLast: (
          <div className="flex flex-col items-center gap-2">
            <Checkbox.Root
              checked={member.admin}
              onCheckedChange={onToggleAdmin}
              id={checkboxId}
              className="w-8 h-8 border-2 rounded-sm border-slate ml-2"
              // TODO: Double check we're doing a11y right here, since we're not showing an actual label
              aria-label="Admin"
            >
              <Checkbox.Indicator className="flex items-center justify-center">
                <CheckIcon className="w-8 h-6 text-slate-600" />
              </Checkbox.Indicator>
            </Checkbox.Root>
          </div>
        ),
      }}
    </Row>
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

/**
 * Generates a list of skeleton rows to show while members are loading
 */
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

/********************************************************************
 * Shared Utils
 *
 * These are shared between the MemberRow and MemberRowSkeleton
 * components, so we can ensure they line up and are sized the same
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
