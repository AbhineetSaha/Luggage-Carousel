import { describe, it, expect } from "vitest";
import { render, screen } from "./test/utils";
import App from "./App";

describe("App Component", () => {
  it("renders the main heading", () => {
    render(<App />);
    const heading = screen.getByText(/luggage carousel/i);
    expect(heading).toBeInTheDocument();
  });

  it("renders storage area heading", () => {
    render(<App />);
    const storageHeading = screen.getByText(/storage area/i);
    expect(storageHeading).toBeInTheDocument();
  });

  it("renders unload button", () => {
    render(<App />);
    const unloadButton = screen.getByRole("button", {
      name: /unload storage/i,
    });
    expect(unloadButton).toBeInTheDocument();
  });

  it("renders priority cells text", () => {
    render(<App />);
    const priorityCells = screen.getAllByText(/priority/i);
    expect(priorityCells.length).toBe(3);
  });
});
