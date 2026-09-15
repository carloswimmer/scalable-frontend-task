import "./jest.polyfills";
import "whatwg-fetch";
import { server } from "./mocks/server";
import { resetPortfolio } from "./mocks/data";

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