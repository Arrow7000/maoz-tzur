import React, { useState } from "react";
import { Setter, ButtonRow } from "./ButtonRow";
import { AttributeSection, Language, Nusach } from "../MaozTzurContent";
import "./Selector.css";

interface Props {
  nusachot: AttributeSection<Nusach>[];
  languages: AttributeSection<Language>[];

  selectedLang: Language;
  selectedNusach: Nusach;
  setLang: Setter<Language>;
  setNusach: Setter<Nusach>;
}

export function Selector({ languages, selectedLang, setLang }: Props) {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen(o => !o);

  return (
    <div className={`Selector Selector--${open ? "open" : "closed"}`}>
      <button className="Selector__opener" onClick={toggleOpen}>
        Aא
      </button>
      <div className="Selector__switches">
        <ButtonRow
          options={languages}
          type="language"
          active={selectedLang}
          setter={setLang}
        />
      </div>
    </div>
  );
}
