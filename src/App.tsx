import { Fragment, useCallback, useEffect, useState } from "react";
import { Member, fetchMembers } from "./data/members";
import "./App.css";
import { MemberRow, getMemberRowSkeletonList } from "./components/MemberRow";
import * as RadixTabs from "@radix-ui/react-tabs";
import { RowDivider } from "./components/RowDivider";
import { EmptyListMessage } from "./components/EmptyListMessage";
import { Tabs } from "./components/Tabs";
import { HeaderRow } from "./components/HeaderRow";

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
        if (prevMember.id !== memberId) return prevMember;

        return {
          ...prevMember,
          admin: !prevMember.admin,
        };
      });
    });
  }, []);

  // TODO: Consider moving this to a separate file / hook. This file isn't super huge for right now so it's not a big deal, and is kind of nice to keep everything co-located. But it's also kind of messy
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

    // TODO: Look into a more graceful solution here. This way is good perf-wise and allows the rendered element to be re-used and it to retain focus, but it's still not super intuitive or leave an easy way to scale in the future when we might want more headers
    let hasRenderedStandardHeader = false;

    // TODO: Fix this, this ugly, and sucks for perf. We should probably just segment the full list, and have a component that renders a divider / header, and then rows if there are some or the empty message if not
    const hasAdmin = members.some((member) => member.admin);
    const hasStandard = members.some((member) => !member.admin);

    return (
      <ol>
        {/* TODO: Make a component for a "table", that includes a divider / label, a header row, and then renders all the children */}
        <RowDivider>Admin</RowDivider>
        <HeaderRow />
        {!hasAdmin && <EmptyListMessage>No admins found</EmptyListMessage>}

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
                {willRenderStandardHeader && (
                  <>
                    <RowDivider className="mt-10">Standard</RowDivider>
                    <HeaderRow />
                  </>
                )}
                <MemberRow
                  member={member}
                  onToggleAdmin={() => onToggleAdmin(member.id)}
                />
              </Fragment>
            );
          })}

        {!hasRenderedStandardHeader && (
          <>
            <RowDivider className="mt-10">Standard</RowDivider>
            <HeaderRow />
          </>
        )}
        {!hasStandard && (
          <EmptyListMessage>No standard users found</EmptyListMessage>
        )}
      </ol>
    );
  }, [members, onToggleAdmin]);

  return (
    <RadixTabs.Root
      defaultValue="members"
      className="h-full max-w-screen-xl w-11/12 mx-auto pt-8 pb-2 overflow-hidden flex flex-col px-20"
    >
      <Tabs tabs={["members", "groups"]} />
      <div className="flex flex-col overflow-auto rounded">
        <RadixTabs.Content value="members">
          <ol className="border-t-2 border-slate-200">
            <HeaderRow />
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
          </ol>
        </RadixTabs.Content>
        {/* TODO: Don't do this sorting / logic if this tab isn't active / rendered? */}
        <RadixTabs.Content value="groups">{renderGroupTab()}</RadixTabs.Content>
      </div>
    </RadixTabs.Root>
  );
}
