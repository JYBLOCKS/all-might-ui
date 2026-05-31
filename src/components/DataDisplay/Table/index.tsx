import type { HTMLAttributes, ReactNode } from "react";
import "./Table.css";

export type TableColumn<TableData> = {
  key: string;
  header: ReactNode;
  render?: (row: TableData) => ReactNode;
};
export type TableProps<TableData> = HTMLAttributes<HTMLTableElement> & {
  columns: TableColumn<TableData>[];
  data: TableData[];
};
export type TableData = Record<string, ReactNode | string>;

export default function Table({
  columns,
  data,
  className,
  ...props
}: TableProps<TableData>) {
  const classes = ["vx-table", className ?? ""].filter(Boolean).join(" ");

  return (
    <div className="vx-table-wrap">
      <table className={classes} {...props}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={String(col.key)}>
                  {col.render ? col.render(row) : (row[col.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
