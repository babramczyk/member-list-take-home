import { Fragment, useCallback, useEffect, useState } from "react";
import { Member, fetchMembers } from "./data/members";
import "./App.css";
import { MemberRow, getMemberRowSkeletonList } from "./components/MemberRow";
import * as Tabs from "@radix-ui/react-tabs";
import { RowDivider } from "./components/RowDivider";

export default function App() {
  const [members, setMembers] = useState<Member[] | null>(null);

  useEffect(() => {
    // TODO: Handle error case (and include that in the mock fetch function?)
    fetchMembers().then((members) => setMembers(members));
  }, []);

  const onToggleAdmin = useCallback((memberId: string) => {
    setMembers((prevMembers) => {
      if (!prevMembers) return null;

      // TODO: Overall, review how we're storing admin data. For now, we're storing it on each member object. We could do something else, like store a mapping or array of which members are admins. But, that kind of couples us to the current use case, where admin tracking is completely and only tracked client side -- i.e. what if in the future, the API returns `.admin` as a field on each member? Hard to determine a path without knowing requirements, but this works for now
      // TODO: If we stick with this approach, we could probably make this update a bit more performant if we needed to, i.e. by storing members as an object, only updating the member that changed, short circuiting after finding them, etc.
      return prevMembers?.map((prevMember) => {
        if (prevMember.id === memberId) {
          return {
            ...prevMember,
            admin: !prevMember.admin,
          };
        }
        return prevMember;
      });
    });
  }, []);

  // TODO: This is weird... Maybe just make a util component for a Tab?
  /* TODO: Figure out a better way to do this for active tab styling (Tab class)... I like being able to style based on something I can target with a selector (i.e. `data-state` attribute), but don't know right now how that can be done gracefully with Tailwind */
  const tabClassName = "border border-slate-900 rounded-t-lg p-4 Tab";

  // TODO: Make lists more semantic (i.e. ul / li)

  const renderGroupTab = useCallback(() => {
    if (!members)
      return (
        <>
          <RowDivider>Admin</RowDivider>
          {getMemberRowSkeletonList(2)}
          <RowDivider>Standard</RowDivider>
          {getMemberRowSkeletonList(6)}
        </>
      );

    let hasRenderedStandardHeader = false;

    return (
      <>
        <RowDivider>Admin</RowDivider>
        {[...members]
          .sort((a, b) => (a.admin ? -1 : 1))
          .map((member) => {
            const willRenderStandardHeader =
              !hasRenderedStandardHeader && !member.admin;
            if (willRenderStandardHeader) {
              hasRenderedStandardHeader = true;
            }

            return (
              <Fragment key={member.id}>
                {willRenderStandardHeader && <RowDivider>Standard</RowDivider>}
                <MemberRow
                  member={member}
                  onToggleAdmin={() => onToggleAdmin(member.id)}
                />
              </Fragment>
            );
          })}
      </>
    );
  }, [members, onToggleAdmin]);

  return (
    <Tabs.Root
      defaultValue="members"
      className="h-full max-w-screen-xl w-11/12 mx-auto pt-8 pb-2 overflow-hidden flex flex-col"
    >
      <Tabs.List className="px-4 flex gap-2">
        <Tabs.Trigger value="members" className={tabClassName}>
          Members
        </Tabs.Trigger>
        <Tabs.Trigger value="groups" className={tabClassName}>
          Groups
        </Tabs.Trigger>
      </Tabs.List>
      <div className="border-2 border-slate-900 flex flex-col overflow-auto rounded">
        <Tabs.Content value="members">
          {/* TODO: Figure out a fancy way to not recreate elements for each row when we switch tabs? Would be better for perf if we need that one day, + could do some fun animation stuff as rows move around */}
          {members
            ? members.map((member) => (
                <MemberRow
                  key={member.id}
                  member={member}
                  onToggleAdmin={() => onToggleAdmin(member.id)}
                  applyAdminStyles
                />
              ))
            : getMemberRowSkeletonList(8)}
        </Tabs.Content>
        {/* TODO: Don't do this sorting / logic if this tab isn't active / rendered? */}
        <Tabs.Content value="groups">{renderGroupTab()}</Tabs.Content>
      </div>
    </Tabs.Root>
  );
}
