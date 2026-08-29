import {
  LINES,
  PEOPLE,
  TIP_BPS,
  formatLei,
  settle,
  shareBani,
  splitAmount,
  withTip,
} from "./split";

test("splitAmount uses largest remainder", () => {
  expect(splitAmount(100, 3)).toEqual([34, 33, 33]);
  expect(splitAmount(100, 3).reduce((sum, n) => sum + n, 0)).toBe(100);
});

test("Ana skips the wine", () => {
  expect(shareBani(LINES, "ana")).toBe(4_000 + 4_500);
  expect(shareBani(LINES, "bogdan")).toBe(4_000 + 4_000 + 6_500);
  expect(shareBani(LINES, "cristina")).toBe(4_000 + 4_000 + 3_000);
});

test("ten percent tip sits on each share", () => {
  expect(withTip(8_500, TIP_BPS)).toBe(9_350);
});

test("settle matches the table and formats lei", () => {
  const bill = settle(LINES, PEOPLE, TIP_BPS);
  expect(bill.ana).toBe(9_350);
  expect(formatLei(bill.ana ?? 0)).toBe("93.50 lei");
});
