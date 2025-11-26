const fs = require("fs");
const path = require("path");

let html;

beforeAll(() => {
  html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");
});

test("На странице есть хотя бы один товар", () => {
  const hasCard = html.includes('class="card"');
  expect(hasCard).toBe(true);
});

test("Карточки товаров должны содержать цены и названия", () => {
  // Ищем все карточки по тегу div с классом card
  const cardRegex = /<div class="card">([\s\S]*?)<\/div>/g;
  const cards = html.match(cardRegex);

  expect(cards).not.toBeNull();
  expect(cards.length).toBeGreaterThan(0);

  cards.forEach((card) => {
    const priceMatch = card.match(/class="card-title">([^<]+)<\/h3>/);
    const nameMatch = card.match(/class="card-text"[^>]*>([^<]+)<\/p>/);

    expect(priceMatch).toBeTruthy();
    expect(nameMatch).toBeTruthy();

    expect(priceMatch[1]).toMatch(/₽/);
    expect(nameMatch[1].trim()).not.toBe("");
  });
});
