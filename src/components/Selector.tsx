import React, { useState } from "react";
import { ButtonRow } from "./ButtonRow";
import "./Selector.css";

interface Props {
  selectedNusach: Nusach;
  nusachimOptions: Option<Nusach>[];
  setNusach: Setter<Nusach>;
}

export function Selector({
  nusachimOptions,
  selectedNusach,
  setNusach
}: Props) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(o => !o);

  return (
    <div className={`Selector Selector--${open ? "open" : "closed"}`}>
      <button className="Selector__opener" onClick={toggleOpen}>
        Aא
      </button>
      <div className="Selector__switches">
        <ButtonRow
          options={nusachimOptions}
          type="language"
          active={selectedNusach}
          setter={setNusach}
        />
      </div>
    </div>
  );
}
