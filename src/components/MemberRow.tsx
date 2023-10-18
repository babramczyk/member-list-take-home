import { Member } from "../data/members";

export function MemberRow({
  member,
  onToggleAdmin,
}: {
  member: Member;
  onToggleAdmin?: () => void;
}) {
  return (
    // TODO: Turn this into a button if we're using onClick -- or, most likely, use a checkbox or some other specific part of the row to toggle admin
    <div
      className="border-2 border-slate-500 p-4 flex flex-col"
      onClick={onToggleAdmin}
    >
      <div className="flex flex-row">
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
