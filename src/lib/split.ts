export type Person = { id: string; name: string };

export type Line = {
  id: string;
  label: string;
  bani: number;
  eaterIds: string[];
};

/** Largest remainder so line totals do not leak a ban from integer division. */
export function splitAmount(amount: number, n: number): number[] {
  const base = Math.floor(amount / n);
  const rem = amount - base * n;
  return Array.from({ length: n }, (_, index) => base + (index < rem ? 1 : 0));
}

export function shareBani(lines: Line[], personId: string): number {
  let total = 0;
  for (const line of lines) {
    const eaters = [...line.eaterIds].sort();
    if (eaters.length === 0) continue;
    const index = eaters.indexOf(personId);
    if (index === -1) continue;
    total += splitAmount(line.bani, eaters.length)[index] ?? 0;
  }
  return total;
}

export function withTip(share: number, tipBps: number): number {
  return share + Math.round((share * tipBps) / 10_000);
}

export function settle(lines: Line[], people: Person[], tipBps: number): Record<string, number> {
  return Object.fromEntries(
    people.map((person) => [person.id, withTip(shareBani(lines, person.id), tipBps)]),
  );
}

export function formatLei(bani: number): string {
  return `${(bani / 100).toFixed(2)} lei`;
}

export const PEOPLE: Person[] = [
  { id: "ana", name: "Ana" },
  { id: "bogdan", name: "Bogdan" },
  { id: "cristina", name: "Cristina" },
];

export const TIP_BPS = 1000;

export const LINES: Line[] = [
  { id: "board", label: "Shared board", bani: 12_000, eaterIds: ["ana", "bogdan", "cristina"] },
  { id: "wine", label: "Bottle of wine", bani: 8_000, eaterIds: ["bogdan", "cristina"] },
  { id: "pasta", label: "Pasta", bani: 4_500, eaterIds: ["ana"] },
  { id: "steak", label: "Steak", bani: 6_500, eaterIds: ["bogdan"] },
  { id: "salad", label: "Salad", bani: 3_000, eaterIds: ["cristina"] },
];
