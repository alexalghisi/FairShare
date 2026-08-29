import { LINES } from "@/lib/split";
import { useSplitStore } from "./splitStore";

test("toggling Ana off the board leaves Bogdan and Cristina", () => {
  useSplitStore.setState({ lines: LINES });
  useSplitStore.getState().toggleEater("board", "ana");
  expect(useSplitStore.getState().lines.find((line) => line.id === "board")?.eaterIds).toEqual([
    "bogdan",
    "cristina",
  ]);
  useSplitStore.getState().reset();
  expect(useSplitStore.getState().lines.find((line) => line.id === "board")?.eaterIds).toContain(
    "ana",
  );
});
