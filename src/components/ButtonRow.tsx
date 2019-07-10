import React from "react";
import { AttributeSection } from "../MaozTzurContent";
import "./ButtonRow.css";

export type Setter<T> = (t: T) => void;

interface Props<T extends string> {
  options: AttributeSection<T>[];
  type: string;
  active: T;
  setter: Setter<T>;
}

export function ButtonRow<T extends string>({
  setter,
  options,
  type,
  active
}: Props<T>) {
  return (
    <div className="ButtonRow">
      <div className="ButtonRow__center">
        {options.map(sel => {
          const isActive = sel.tag === active;
          return (
            <button
              className={`ButtonRow__button ${
                isActive ? "selected" : ""
              } ButtonRow__button--${type} `}
              onClick={() => setter(sel.tag)}
              key={sel.tag}
            >
              {sel.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
