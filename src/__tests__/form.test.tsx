import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  Button,
  Calendar,
  Checkbox,
  DatePicker,
  Input,
  InputArea,
  Rating,
  Select,
  Slider,
  Switch,
  TimePicker,
} from "../components/Form";

describe("Form components", () => {
  it("render Button variants and handle click", () => {
    const handleClick = vi.fn();
    render(
      <>
        <Button variant="primary" onClick={handleClick}>
          Guardar
        </Button>
        <Button variant="ghost">Ghost</Button>
      </>,
    );
    fireEvent.click(screen.getByText("Guardar"));
    expect(handleClick).toHaveBeenCalled();
    expect(screen.getByText("Ghost")).toBeInTheDocument();
  });

  it("render inputs and allow change", () => {
    render(
      <>
        <Input placeholder="Nombre" />
        <InputArea placeholder="Nota" />
      </>,
    );
    const input = screen.getByPlaceholderText("Nombre") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Ana" } });
    expect(input.value).toBe("Ana");
    expect(screen.getByPlaceholderText("Nota")).toBeInTheDocument();
  });

  it("render select and options", () => {
    render(
      <Select defaultValue="1">
        <option value="1">Uno</option>
        <option value="2">Dos</option>
      </Select>,
    );
    expect(screen.getByDisplayValue("Uno")).toBeInTheDocument();
  });

  it("render checkbox and switch controlled", () => {
    render(
      <>
        <Checkbox label="Aceptar" checked onChange={() => undefined} />
        <Switch label="Encendido" checked onChange={() => undefined} />
      </>,
    );
    expect(screen.getByText("Aceptar")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("render slider and rating", () => {
    render(
      <>
        <Slider min={0} max={100} defaultValue={50} />
        <Rating value={3} onChange={() => undefined} />
      </>,
    );
    expect(screen.getByRole("slider")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("render date/time inputs", () => {
    const { container } = render(
      <>
        <Calendar />
        <DatePicker />
        <TimePicker />
      </>,
    );
    expect(container.querySelectorAll("input[type='date']").length).toBe(1);
    expect(container.querySelectorAll("input[type='datetime-local']").length).toBe(1);
    expect(container.querySelectorAll("input[type='time']").length).toBe(1);
  });
});
