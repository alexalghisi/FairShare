import { create } from "zustand";
import { LINES, PEOPLE, TIP_BPS, type Line } from "@/lib/split";

interface SplitState {
  lines: Line[];
  toggleEater: (lineId: string, personId: string) => void;
  reset: () => void;
}

function toggle(line: Line, personId: string): Line {
  const has = line.eaterIds.includes(personId);
  const eaterIds = has
    ? line.eaterIds.filter((id) => id !== personId)
    : [...line.eaterIds, personId];
  return { ...line, eaterIds };
}

export const useSplitStore = create<SplitState>((set) => ({
  lines: LINES,
  toggleEater: (lineId, personId) =>
    set((state) => ({
      lines: state.lines.map((line) => (line.id === lineId ? toggle(line, personId) : line)),
    })),
  reset: () => set({ lines: LINES }),
}));

export { PEOPLE, TIP_BPS };
