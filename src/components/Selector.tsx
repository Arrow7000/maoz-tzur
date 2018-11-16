import React, { Component } from "react";
import "./Selector.css";
import ButtonRow from "./ButtonRow";
import {
  AttributeSection,
  Language,
  Nusach,
  Selection,
  ChangeSelect
} from "../MaozTzurContent";

interface Props {
  nusachot: AttributeSection<Nusach>[];
  languages: AttributeSection<Language>[];
  selected: Selection;
  handler: ChangeSelect;
}
interface State {
  open: boolean;
}

class Selector extends Component<Props, State> {
  constructor(p: Props) {
    super(p);
    this.state = { open: false };

    this.toggleOpen = this.toggleOpen.bind(this);
  }
  toggleOpen() {
    this.setState({ open: !this.state.open });
  }
  render() {
    const { nusachot, languages, selected, handler } = this.props;

    return (
      <div
        className={`Selector Selector--${this.state.open ? "open" : "closed"}`}
      >
        <button className="Selector__opener" onClick={this.toggleOpen}>
          Aא
        </button>
        <div className="Selector__switches">
          <ButtonRow
            selectors={languages}
            type="language"
            active={selected.language}
            handler={handler}
          />
        </div>
      </div>
    );
  }
}

// // Selector for languages
// <ButtonRow
// 	selectors={nusachot}
// 	type="nusach"
// 	active={this.props.selected.nusach}
// 	handler={this.props.handler} />

export default Selector;
