import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "../components/Styles";
import Home from "../pages/Home";

describe("Home page", () => {
  const writeText = vi.fn();

  beforeEach(() => {
    writeText.mockReset();
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
  });

  it("copies a component snippet from the demo card", async () => {
    writeText.mockResolvedValue(undefined);

    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>,
    );

    fireEvent.click(screen.getByLabelText("Copiar ejemplo de Button"));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(
        '<Button variant="primary">Guardar</Button>',
      );
      expect(screen.getByLabelText("Copiar ejemplo de Button")).toHaveAttribute(
        "title",
        "Copiado",
      );
    });
  });

  it("copies icon snippets and exposes the full name in a tooltip-friendly label", async () => {
    writeText.mockResolvedValue(undefined);

    render(
      <ThemeProvider>
        <Home />
      </ThemeProvider>,
    );

    expect(screen.getAllByText("Business").length).toBeGreaterThan(0);

    const iconButton = screen.getByLabelText("Copiar icono align-horizontal-space-between");
    const iconName = within(iconButton).getByText("align-horizon...");

    expect(iconName).toHaveAttribute("title", "align-horizontal-space-between");

    fireEvent.mouseEnter(iconName);
    expect(screen.getByText("align-horizontal-space-between")).toBeInTheDocument();

    fireEvent.click(iconButton);

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(
        '<Icons name="align-horizontal-space-between" size={24} />',
      );
    });
  });
});
