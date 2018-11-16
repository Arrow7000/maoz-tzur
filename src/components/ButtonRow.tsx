import React, { Component } from "react";
import "./ButtonRow.css";
import {
  AttributeSection,
  Language,
  Nusach,
  Attribute,
  AllAttributes,
  ChangeSelect
} from "../MaozTzurContent";

interface Props {
  selectors: AttributeSection<Language | Nusach>[];
  type: Attribute;
  active: AllAttributes;
  handler: ChangeSelect;
}

class ButtonRow extends Component<Props> {
  click(tag: AllAttributes) {
    // console.log(this.props.type, tag);
    this.props.handler(this.props.type, tag);
  }
  render() {
    return (
      <div className="ButtonRow">
        <div className="ButtonRow__center">
          {this.props.selectors.map(sel => {
            const isActive = sel.tag === this.props.active;
            return (
              <button
                className={`ButtonRow__button ${
                  isActive ? "selected" : ""
                } ButtonRow__button--${this.props.type} `}
                onClick={() => this.click(sel.tag)}
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
}

export default ButtonRow;
