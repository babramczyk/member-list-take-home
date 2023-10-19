/**
 * Row component to use in the Members table (i.e. for members, header rows, etc.)
 */
export function Row({
  children,
  className,
}: {
  // TODO: Re-evaluate this API. I like what we have going here with `children` slots so that we can have uniform fixed width columns in our table, but maybe there's something better. Or maybe we should rename these props. Also, worth noting that this probably doesn't need to be done this way if we ever use an actual <table>
  children: {
    /** Element to show in the first column in the table */
    column1?: React.ReactNode;
    /** Element to show in the second column in the table */
    column2?: React.ReactNode;
    /** Element to show in the last column in the table (i.e. it's offset all the way to the end) */
    columnLast?: React.ReactNode;
  };
  className?: string;
}) {
  return (
    <li
      className={`items-center gap-8 border-b-2 border-x-2 border-slate-200 py-4 px-8 flex ${className}`}
    >
      <div className="flex-initial w-12 flex justify-start">{children.column1}</div>
      <div className="flex-initial w-40 flex justify-start">{children.column2}</div>
      <div className="flex-initial w-20 flex justify-start ml-auto">{children.columnLast}</div>
    </li>
  );
}
