import { Row } from "./Row";

export function HeaderRow() {
  return (
    <Row className="bg-slate-100">
      {{
        column2: "Name",
        column3: "Admin",
      }}
    </Row>
  );
}
