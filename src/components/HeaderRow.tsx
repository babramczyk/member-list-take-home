import { Row } from "./Row";

/**
 * Header row for the Members table, i.e. the row with the column labels
 */
export function HeaderRow() {
  return (
    <Row className="bg-slate-100">
      {{
        column2: <span className="uppercase text-slate-500">Name</span>,
        columnLast: <span className="uppercase text-slate-500">Admin</span>,
      }}
    </Row>
  );
}
