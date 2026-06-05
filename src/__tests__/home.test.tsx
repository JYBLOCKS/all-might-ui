import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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
});
