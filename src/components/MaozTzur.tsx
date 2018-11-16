import React, { Component } from "react";
import "./MaozTzur.css";
import content, {
  Language,
  Nusach,
  AttributeSection,
  hebrew,
  ashkenaz,
  Selection,
  AllAttributes,
  Attribute
} from "./../MaozTzurContent";
import Selector from "./Selector";
// import DisplayTimes from "./DisplayTimes";
import Menorah from "./Menorah";
import Section from "./Section";
import Footer from "./Footer";

import HebrewEnglishCompare from "./HebrewEnglishCompare";

interface Props {}
interface State {
  languages: AttributeSection<Language>[];
  nusachim: AttributeSection<Nusach>[];
  selected: Selection;
}
class MaozTzur extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      languages: content.languages,
      nusachim: content.nusachim,
      selected: {
        language: hebrew,
        nusach: ashkenaz
      }
    };
  }
  selectHandler(type: Attribute, selection: AllAttributes) {
    const newSel = { ...this.state.selected, [type]: selection };
    this.setState({ selected: newSel });
  }
  render() {
    const { language, nusach } = this.state.selected;

    return (
      <section className="MaozTzur">
        <div className="MaozTzur__inner">
          <Menorah />
          {/* <DisplayTimes /> */}
          {content[language][nusach].map(section => (
            <Section
              section={section}
              key={section.title}
              language={this.state.selected.language}
            />
          ))}
          <Footer />
        </div>
        <Selector
          selected={this.state.selected}
          languages={this.state.languages}
          nusachot={this.state.nusachim}
          handler={this.selectHandler.bind(this)}
        />
      </section>
    );
  }
}

export default MaozTzur;
