import { Row } from "./Row";

export function HeaderRow() {
  return (
    <Row className="bg-slate-100">
      {{
        column2: <span className="uppercase text-slate-500">Name</span>,
        column3: <span className="uppercase text-slate-500">Admin</span>,
      }}
    </Row>
  );
}
