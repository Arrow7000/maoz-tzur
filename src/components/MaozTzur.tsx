import React, { useEffect, useState } from "react";
import "./MaozTzur.css";
import { content } from "../content";
import { Selector } from "./Selector";
import { CandleCount, useGetCandleCount } from "./CandleCount/CandleCount";
import { Menorah, numToDayMap } from "./Menorah";
import Section from "./Section";
import Footer from "./Footer";
import { isNusach } from "../helpers";
import { useLocalStorage } from "../hooks/useLocalStorage";

const savedNusachKey = "savedNusach";

export function MaozTzur() {
  const [savedNusach, setSavedNusach] = useLocalStorage(savedNusachKey);
  const defaultNusach = isNusach(savedNusach) ? savedNusach : null;

  useEffect(() => {
    if (!defaultNusach) {
      setSavedNusach(); // clear it if invalid
    }
  }, []);

  const [nusach, setNusach] = useState<Nusach>(defaultNusach ?? "ashkenaz");

  const changeNusach = (newNusach: Nusach) => {
    setNusach(newNusach);
    setSavedNusach(newNusach);
  };

  const nusachim: Option<Nusach>[] = [
    { label: "Ashkenaz", value: "ashkenaz" },
    { label: "Sefardi", value: "sefardi" },
    { label: "Chabad", value: "chabad" },
  ];

  const [state, askLocationPermission] = useGetCandleCount();

  useEffect(() => {
    console.log(
      "Hi there fellow developer 👋\nCheck out my other projects at https://github.com/Arrow7000"
    );
  }, []);

  return (
    <section className="MaozTzur">
      <div className="MaozTzur__inner">
        <Menorah
          day={
            state.label === "ChanukahReqComplete"
              ? numToDayMap[state.candleCount] ?? null
              : null
          }
        />
        <CandleCount
          state={state}
          askLocationPermission={askLocationPermission}
        />
        {content.map((section) => (
          <Section key={section.title} section={section} nusach={nusach} />
        ))}
        <Footer />
      </div>
      <Selector
        selectedNusach={nusach}
        nusachimOptions={nusachim}
        setNusach={changeNusach}
      />
    </section>
  );
}
