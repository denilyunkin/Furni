const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

let dom;

beforeAll(() => {
  const html = fs.readFileSync(
    path.resolve(__dirname, "../index.html"),
    "utf8"
  );
  dom = new JSDOM(html);
});

test("На странице есть хотя бы один товар", () => {
  const cards = dom.window.document.querySelectorAll(".card");
  expect(cards.length).toBeGreaterThan(0);
});

test("карточки товаров должны содержать цены и названия", () => {
  const cards = dom.window.document.querySelectorAll(".card");

  cards.forEach((card) => {
    const price = card.querySelector(".card-title");
    const name = card.querySelector(".card-text");

    expect(price).toBeTruthy();
    expect(name).toBeTruthy();

    expect(price.textContent).toMatch(/₽/);
    expect(name.textContent.trim()).not.toBe("");
  });
});
