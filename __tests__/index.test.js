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

test("У товара есть изображение и цена", () => {
  const firstCard = dom.window.document.querySelector(".card");
  const img = firstCard.querySelector("img");
  const price = firstCard.querySelector(".card-title");
  expect(img).not.toBeNull();
  expect(price).not.toBeNull();
});
