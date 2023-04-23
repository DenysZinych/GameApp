import { render, screen } from "@testing-library/react";
import { GameCard } from "./GameCard";

describe("GameCard", () => {
  const props = {
    name: "Game Name",
    imageUrl: "https://example.com/game-image.png",
  };

  it("render name and image", () => {
    render(<GameCard {...props} />);
    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByAltText("Game image")).toHaveAttribute(
      "src",
      props.imageUrl,
    );
  });
});
