import React, { useEffect, useState } from "react";
import "./MaozTzur.css";
import content, {
  Language,
  Nusach,
  hebrew,
  ashkenaz,
  languages,
  nusachim
} from "./../MaozTzurContent";
import { Selector } from "./Selector";
import { CandleCountWithBoundary } from "./CandleCount";
import Menorah from "./Menorah";
import Section from "./Section";
import Footer from "./Footer";

import HebrewEnglishCompare from "./HebrewEnglishCompare";

export function MaozTzur() {
  const [language, setLang] = useState<Language>(hebrew);
  const [nusach, setNusach] = useState<Nusach>(ashkenaz);

  useEffect(() => {
    console.log(
      "Hi there fellow developer 👋\nCheck out my other projects at https://github.com/Arrow7000"
    );
  }, []);

  return (
    <section className="MaozTzur">
      <div className="MaozTzur__inner">
        <Menorah />
        <CandleCountWithBoundary />
        {content[language][nusach].map(section => (
          <Section section={section} key={section.title} language={language} />
        ))}
        <Footer />
      </div>
      <Selector
        selectedLang={language}
        selectedNusach={nusach}
        languages={languages}
        nusachot={nusachim}
        setLang={setLang}
        setNusach={setNusach}
      />
    </section>
  );
}
