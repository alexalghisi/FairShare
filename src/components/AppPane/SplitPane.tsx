import { PEOPLE, TIP_BPS, formatLei, settle } from "@/lib/split";
import { useSplitStore } from "@/store/splitStore";

export function SplitPane() {
  const lines = useSplitStore((state) => state.lines);
  const toggleEater = useSplitStore((state) => state.toggleEater);
  const bill = settle(lines, PEOPLE, TIP_BPS);

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-[1fr_240px]">
      <div className="min-h-0 overflow-auto p-4">
        <p className="mb-3 text-[13px] text-muted-foreground">
          Tick who ate. Wine is already off Ana. Tip is 10% on each share.
        </p>
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="pb-2 font-medium">Item</th>
              <th className="pb-2 font-medium">Price</th>
              {PEOPLE.map((person) => (
                <th key={person.id} className="pb-2 font-medium">
                  {person.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => (
              <tr
                key={line.id}
                className="border-b border-border/70"
                data-testid={`line-${line.id}`}
              >
                <td className="py-2">{line.label}</td>
                <td className="py-2 tabular-nums">{formatLei(line.bani)}</td>
                {PEOPLE.map((person) => (
                  <td key={person.id} className="py-2">
                    <input
                      type="checkbox"
                      aria-label={`${person.name} ate ${line.label}`}
                      data-testid={`eat-${line.id}-${person.id}`}
                      checked={line.eaterIds.includes(person.id)}
                      onChange={() => toggleEater(line.id, person.id)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <aside className="border-t border-border bg-sidebar p-4 md:border-t-0 md:border-l">
        <p className="text-[12px] font-medium uppercase tracking-wide text-muted-foreground">
          Each owes
        </p>
        <ul className="mt-3 space-y-3">
          {PEOPLE.map((person) => (
            <li key={person.id} data-testid={`owe-${person.id}`}>
              <p className="text-[13px]">{person.name}</p>
              <p className="text-[20px] font-semibold tabular-nums tracking-tight">
                {formatLei(bill[person.id] ?? 0)}
              </p>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
