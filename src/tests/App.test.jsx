import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import fantasy from "../data/fantasy.json";

import App from "../App";

describe("checks Navbar filtering", () => {
  it("checks nav filter", () => {
    render(<App />);
    const search = screen.getByPlaceholderText("Cerca un libro");
    fireEvent.change(search, { target: { value: "witch" } });
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(3);
  });
});
