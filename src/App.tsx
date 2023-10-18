import { useEffect, useState } from "react";
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

  return (
    <div className="h-full p-16">
      <Tabs.Root defaultValue="Members">
        <Tabs.List>
          <Tabs.Trigger value="members">Members</Tabs.Trigger>
          <Tabs.Trigger value="groups">Groups</Tabs.Trigger>
        </Tabs.List>
        <div className="border-2 border-slate-900 h-full flex flex-col">
          <Tabs.Content value="members">
            {/* TODO: Figure out a fancy way to not recreate elements for each row? Would be better for perf if we need that one day, + could do some fun animation stuff as rows move around */}
            {members?.map((member) => (
              <MemberRow key={member.id} member={member} />
            ))}
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
}
