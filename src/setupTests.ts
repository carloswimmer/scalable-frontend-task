import { server } from "./mocks/server";
import { resetPortfolio } from "./mocks/data";
import "@testing-library/jest-dom/vitest";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

afterEach(() => {
  server.resetHandlers();
  resetPortfolio();
});

afterAll(() => {
  server.close();
});
