import { useState } from "react";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";

export default function QuantityInputCell({ row }) {
  const [quantity, setQuantity] = useState(0);

  row.original.amount = quantity;

  return (
    <SheInput
      placeholder="0"
      onChange={(value) => {
        setQuantity(Number(value) as number);
        row.original.amount = value;
      }}
    />
  );
}
