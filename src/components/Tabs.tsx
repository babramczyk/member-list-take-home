import * as RadixTabs from "@radix-ui/react-tabs";

export function Tabs({ tabs = [] }: { tabs: string[] }) {
  // TODO: Maybe do something dope where the bottom active border "slides" around to the active tab. That's a can of worms, so ignoring for now...
  return (
    <div className="relative">
      <RadixTabs.List className="px-8 flex mb-4">
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab}
            value={tab}
            className="border-b-2 border-slate-300 text-slate-500 rounded-t-lg py-4 px-10 w-60 text-xl font-bold capitalize transition-all Tab"
          >
            {tab}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
    </div>
  );
}
