import React, { Component } from "react";
import "./Section.css";
import { ContentSection, Language } from "../MaozTzurContent";

interface Props {
  section: ContentSection;
  language: Language;
}

function Section({ section, language }: Props) {
  const title = section.title;
  const subtitle = section.subtitle;
  const content = section.content;

  return (
    <section className="Section">
      <div className="title">
        {title && <h3>{title}</h3>}
        {subtitle && <h4>{subtitle}</h4>}
      </div>
      <div className="text__area">
        {content.map(item => {
          const title = item.title ? (
            <h6 className="title title--text">{item.title}</h6>
          ) : null;

          return (
            <div key={item.text}>
              {title}
              <p className={`text ${language}`}> {item.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Section;
