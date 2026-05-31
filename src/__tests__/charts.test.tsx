import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Bars, Gauge, Lines, Pie } from "../components/Charts";

describe("Charts components", () => {
  it("renders Bars", () => {
    render(
      <Bars
        title="Ventas"
        data={[
          { label: "Q1", value: 40 },
          { label: "Q2", value: 60 },
        ]}
      />,
    );
    expect(screen.getByText("Ventas")).toBeInTheDocument();
    expect(screen.getAllByText("Q1").length).toBeGreaterThan(0);
  });

  it("renders Lines", () => {
    render(<Lines title="Series" series={[{ name: "A", points: [1, 2] }]} />);
    expect(screen.getByText("Series")).toBeInTheDocument();
  });

  it("renders Pie", () => {
    render(<Pie title="Torta" data={[{ label: "A", value: 10 }]} />);
    expect(screen.getByText("Torta")).toBeInTheDocument();
  });

  it("renders Gauge", () => {
    render(<Gauge title="Nivel" value={50} />);
    expect(screen.getByText("Nivel")).toBeInTheDocument();
  });
});
