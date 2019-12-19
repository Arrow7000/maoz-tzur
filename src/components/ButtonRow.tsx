import React from "react";
import "./ButtonRow.css";

interface Props<T> {
  options: Option<T>[];
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
          const isActive = sel.value === active;

          return (
            <button
              className={`ButtonRow__button ${
                isActive ? "selected" : ""
              } ButtonRow__button--${type} `}
              onClick={() => setter(sel.value)}
              key={sel.value}
            >
              {sel.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
