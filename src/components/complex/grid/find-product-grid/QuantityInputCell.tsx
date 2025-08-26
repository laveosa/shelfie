import { useState } from "react";
import SheInput from "@/components/primitive/she-input/SheInput.tsx";

export default function QuantityInputCell({ row }) {
  const [quantity, setQuantity] = useState(1);

  row.original.amount = quantity;

  return (
    <SheInput
      value="1"
      onChange={(value) => {
        setQuantity(Number(value) as number);
        row.original.amount = value;
      }}
    />
  );
}
