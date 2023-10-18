import { useEffect, useState } from "react";
import { Member, fetchMembers } from "./data/members";

export default function App() {
  const [members, setMembers] = useState<Member[] | null>(null);

  useEffect(() => {
    // TODO: Handle error case (and include that in the mock fetch function?)
    fetchMembers().then((members) => setMembers(members));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">The app, yo</h1>
      {JSON.stringify(members, null, 2)}
    </>
  );
}
