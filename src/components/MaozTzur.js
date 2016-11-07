import React, { Component } from 'react';
import './MaozTzur.css';
import * as content from './../MaozTzurContent';
import Selector from './Selector';
import DisplayTimes from './DisplayTimes';
import Menorah from './Menorah';
import Section from './Section';
import Footer from './Footer';

class MaozTzur extends Component {
    constructor() {
        super();

        this.state = {
            languages: content.languages,
            nusachot: content.versions,
            selected: {
                language: 'hebrew',
                nusach: 'ashkenaz'
            }
        };
    }
    selectHandler(type, selection) {
        const newSel = Object.assign({}, this.state.selected, { [type]: selection })
        this.setState({ selected: newSel });
    }
    render() {

        const { language, nusach } = this.state.selected;

        return (
            <section className="MaozTzur">
                <div className="MaozTzur__inner">
                    <Menorah />
                    <DisplayTimes />
                    {content[language][nusach].map(section => <Section
                        section={section}
                        key={section.title}
                        language={this.state.selected.language} />)}
                    <Footer />
                </div>
                <Selector
                    selected={this.state.selected}
                    languages={this.state.languages}
                    nusachot={this.state.nusachot}
                    handler={this.selectHandler.bind(this)} />
            </section>)
    }
}

export default MaozTzur;