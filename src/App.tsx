import { Fragment, useCallback, useEffect, useState } from "react";
import { Member, fetchMembers } from "./data/members";
import "./App.css";
import { MemberRow } from "./components/MemberRow";
import * as Tabs from "@radix-ui/react-tabs";

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

  const renderGroupTab = useCallback(() => {
    if (!members) return null;

    let hasRenderedStandardHeader = false;

    return (
      <>
        <div>Admin</div>
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
                {willRenderStandardHeader && <div>Standard</div>}
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
    <div className="h-full p-16">
      <Tabs.Root defaultValue="members">
        <Tabs.List className="px-4 flex gap-2">
          <Tabs.Trigger value="members" className={tabClassName}>
            Members
          </Tabs.Trigger>
          <Tabs.Trigger value="groups" className={tabClassName}>
            Groups
          </Tabs.Trigger>
        </Tabs.List>
        <div className="border-2 border-slate-900 h-full flex flex-col">
          <Tabs.Content value="members">
            {/* TODO: Figure out a fancy way to not recreate elements for each row? Would be better for perf if we need that one day, + could do some fun animation stuff as rows move around */}
            {members?.map((member) => (
              <MemberRow
                key={member.id}
                member={member}
                onToggleAdmin={() => onToggleAdmin(member.id)}
              />
            ))}
          </Tabs.Content>
          {/* TODO: Don't do this sorting / logic if this tab isn't active / rendered? */}
          <Tabs.Content value="groups">{renderGroupTab()}</Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
}
