import { OptionSelectedCombo } from "@/typings/types";

export function combosTotalPrice(combos: OptionSelectedCombo[]) {
  return combos.reduce(
    (accumulator: number, currentValue: OptionSelectedCombo) => {
      return (
        accumulator +
        currentValue.price +
        currentValue.items.reduce((acc, curr) => {
          return (
            acc +
            curr.price +
            curr.selected.price +
            curr.selected.options.reduce((acc, curr) => {
              return acc + curr.price;
            }, 0)
          );
        }, 0)
      );
    },
    0
  );
}
