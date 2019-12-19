import React from "react";
import "./Section.css";
import { isAllContent } from "../content";

interface Props {
  section: ContentSection;
  nusach: Nusach;
}

function Section({ section, nusach }: Props) {
  const { title, subtitle, content } = section;

  return (
    <div className="Section">
      <div className="title">
        {title && <h3>{title}</h3>}
        {subtitle && <h4>{subtitle}</h4>}
      </div>
      <div className="text__area">
        {content.map((item, i) => {
          const subContent = isAllContent(item.texts)
            ? item.texts.all
            : item.texts[nusach];

          return (
            <div key={i}>
              {item.title ? (
                <h6 className="title title--text">{item.title}</h6>
              ) : null}
              {subContent.map(item => (
                <p key={item} className={`text ${"hebrew"}`}>
                  {item}
                </p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Section;
