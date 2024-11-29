import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders loading text", () => {
  render(<App />);
  const loadingText = screen.getByText(/Loading.../i);
  expect(loadingText).toBeInTheDocument();
});
