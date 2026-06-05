import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Avatar,
  Badge,
  Chip,
  Icons,
  iconNames,
  List,
  Table,
  Tooltip,
} from "../components/DataDisplay";

const listItems = [
  { title: "Item 1", description: "Detalle", meta: "OK" },
  { title: "Item 2", description: "Detalle 2", meta: "Pendiente" },
];

const cols = [
  { key: "name", header: "Nombre" },
  { key: "role", header: "Rol" },
];
const rows = [
  { name: "Ana", role: "Admin" },
  { name: "Luis", role: "User" },
];

describe("DataDisplay components", () => {
  it("renders Avatar, Badge, Chip", () => {
    render(
      <>
        <Avatar name="Demo User" />
        <Badge color="blue">Nuevo</Badge>
        <Chip>Filtro</Chip>
      </>,
    );
    expect(screen.getByLabelText("Demo User")).toBeInTheDocument();
    expect(screen.getByText("Nuevo")).toBeInTheDocument();
    expect(screen.getByText("Filtro")).toBeInTheDocument();
  });

  it("renders List and Table", () => {
    render(
      <>
        <List
          items={listItems.map((item) => ({
            content: item.title,
            meta: item.meta,
          }))}
        />
        <Table columns={cols} data={rows} />
      </>,
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Ana")).toBeInTheDocument();
  });

  it("renders Text and Tooltip", () => {
    render(
      <Tooltip content="Ayuda">
        <Icons name="spark" />
      </Tooltip>,
    );
    expect(screen.getByLabelText("spark")).toBeInTheDocument();
  });

  it("exposes a large icon catalog", () => {
    expect(iconNames.length).toBeGreaterThanOrEqual(200);
  });

  it("renders a catalog icon and respects the minimum small size", () => {
    render(<Icons name="airplay" size="sm" />);

    const icon = screen.getByLabelText("airplay");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("width", "24");
    expect(icon).toHaveAttribute("height", "24");
  });
});
