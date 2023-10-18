export function Row({
  children,
  className,
}: {
  children: {
    column1?: React.ReactNode;
    column2?: React.ReactNode;
    column3?: React.ReactNode;
  };
  className?: string;
}) {
  return (
    <li
      className={`items-center gap-8 border-b-2 border-x-2 border-slate-200 py-4 px-8 flex ${className}`}
    >
      <div className="flex-initial w-12 flex justify-start">{children.column1}</div>
      <div className="flex-initial w-40 flex justify-start">{children.column2}</div>
      <div className="flex-initial w-20 flex justify-start ml-auto">{children.column3}</div>
    </li>
  );
}
