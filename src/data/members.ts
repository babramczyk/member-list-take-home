/**
 * Get the members of the team.
 *
 * NOTE: While the data is technically hardcoded in source, this function mocks a fetch, by returning a promise that resolves with member data after an artificial random delay.
 */
export function fetchMembers(): Promise<Member[]> {
  return new Promise((resolve) => {
    const delayFloor = 2_000;
    const delayVariance = 1_000;
    const mockDelay = Math.floor(Math.random() * delayVariance + delayFloor);
    setTimeout(() => {
      resolve(getMembersAsArray());
    }, mockDelay);
  });
}

export interface Member {
  id: string;
  first: string;
  last: string;
  role: string;
  photo: string;
  // TODO: Rename to `isAdmin`
  admin: boolean;
}

// TODO: Review on if this makes sense as a generic util?
function getMembersAsArray() {
  return Object.keys(_MEMBERS).map((id) => ({
    id,
    // FIXME: This is a bit weird going in this function since this is a util, but gets me there for now. I didn't want to modify the data I was given, in case that was a no-no.
    admin: false,
    ..._MEMBERS[id],
  }));
}

const _MEMBERS: Record<string, Omit<Member, "id" | "admin">> = {
  "troy-tipton": {
    first: "Mark",
    last: "Tipton",
    role: "Design",
    photo: "https://i.pravatar.cc/400?img=51",
  },
  "jennifer-todd": {
    first: "Jennifer",
    last: "Todd",
    role: "Engineering",
    photo: "https://i.pravatar.cc/400?img=45",
  },
  "terry-graf": {
    first: "Terry",
    last: "Graf",
    role: "Engineering",
    photo: "https://i.pravatar.cc/400?img=7",
  },
  "rebecca-morse": {
    first: "Rebecca",
    last: "Morse",
    role: "CTO",
    photo: "https://i.pravatar.cc/400?img=49",
  },
  "aaron-bowman": {
    first: "Aaron",
    last: "Bowman",
    role: "Engineering",
    photo: "https://i.pravatar.cc/400?img=69",
  },
  "julius-rivera": {
    first: "Julius",
    last: "Rivera",
    role: "Engineering",
    photo: "https://i.pravatar.cc/400?img=68",
  },
  "stephanie-nelson": {
    first: "Stephanie",
    last: "Nelson",
    role: "Engineering",
    photo: "https://i.pravatar.cc/400?img=16",
  },
  "michelle-samuel": {
    first: "Michelle",
    last: "Samuel",
    role: "Developer Experience",
    photo: "https://i.pravatar.cc/400?img=35",
  },
};
