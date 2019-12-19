import React, { useEffect, useState } from "react";
import "./MaozTzur.css";
import { content } from "../content";
import { Selector } from "./Selector";
import { CandleCountWithBoundary } from "./CandleCount/CandleCount";
import Menorah from "./Menorah";
import Section from "./Section";
import Footer from "./Footer";

export function MaozTzur() {
  const [nusach, setNusach] = useState<Nusach>("sefardi");

  const nusachim: Option<Nusach>[] = [
    { label: "Ashkenaz", value: "ashkenaz" },
    { label: "Sefardi", value: "sefardi" }
  ];

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
        {content.map(section => (
          <Section key={section.title} section={section} nusach={nusach} />
        ))}
        <Footer />
      </div>
      <Selector
        selectedNusach={nusach}
        nusachimOptions={nusachim}
        setNusach={setNusach}
      />
    </section>
  );
}
