import { useEffect, useState } from "react";
import { Member, fetchMembers } from "./data/members";
import "./App.css";
import { MemberRow } from "./components/MemberRow";

export default function App() {
  const [members, setMembers] = useState<Member[] | null>(null);

  useEffect(() => {
    // TODO: Handle error case (and include that in the mock fetch function?)
    fetchMembers().then((members) => setMembers(members));
  }, []);

  return (
    <div className="h-full p-16">
      <div className="border-2 border-slate-900 h-full flex flex-col">
        {members?.map((member) => (
          <MemberRow key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
