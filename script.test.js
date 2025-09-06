import { greet } from "./js/script.js";

test("greet says hello", () => {
  expect(greet()).toBe("Hello World");
});
