import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import fantasy from "../data/fantasy.json";

import BookList from "../components/BookList";

describe("checks number of books and comments", () => {
  it("checks if thera are 150 books", () => {
    render(<BookList books={fantasy} />);
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(150);
  });

  it("checks commentArea", () => {
    render(<BookList books={fantasy} />);
    const inputComment = screen.getByPlaceholderText(/inserisci qui il testo/i);
    expect(inputComment).toBeInTheDocument();
  });
});
