import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "../App";

describe("checks Navbar filtering , border color and comments", () => {
  it("checks nav filter", () => {
    render(<App />);
    const search = screen.getByPlaceholderText("Cerca un libro");
    fireEvent.change(search, { target: { value: "witch" } });
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(3);
  });

  it("checks if border becomes red", () => {
    render(<App />);
    const cards = screen.getAllByTestId("card");
    fireEvent.click(cards[0]);
    expect(cards[0]).toHaveStyle("border:3px solid red");
  });

  it("check that border returns uncolored", () => {
    render(<App />);
    const cards = screen.getAllByTestId("card");
    fireEvent.click(cards[0]);
    fireEvent.click(cards[1]);
    expect(cards[0]).toHaveStyle("border:none");
  });

  it("checks that no comment are shown at the first rendering", () => {
    render(<App />);
    const commentButtons = screen.queryAllByText("Elimina");
    expect(commentButtons).toHaveLength(0);
  });

  it("checks that comments are rendered", async () => {
    render(<App />);
    const cards = screen.getAllByTestId("card");
    fireEvent.click(cards[0]);
    const commentButtons = await screen.findAllByText("Elimina");
    expect(commentButtons.length).toBeGreaterThan(0);
  });
});
