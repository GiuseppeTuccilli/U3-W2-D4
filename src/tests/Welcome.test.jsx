import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Welcome from "../components/Welcome";

describe("testing initial mounting", () => {
  it("checks if component is in the dom", () => {
    render(<Welcome />);
    const title = screen.getByText("Benvenuti in EpiBooks!");
    expect(title).toBeInTheDocument();
  });
});
