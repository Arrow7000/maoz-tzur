import React, { Component } from 'react';
import './MaozTzur.css';
import * as content from './../MaozTzurContent';
import Selector from './Selector';
import Menorah from './Menorah';
import Section from './Section';
import Footer from './Footer';
import getTimes from './getTimes';

class MaozTzur extends Component {
    constructor() {
        super();

        getTimes()
            .then(res => console.log(res));

        this.state = {
            languages: content.languages,
            nusachot: content.versions,
            selected: {
                language: 'english',
                nusach: 'ashkenaz'
            }
        };
        this.selectHandler = this.selectHandler.bind(this);
    }
    selectHandler(type, selection) {
        const newSel = Object.assign({}, this.state.selected, { [type]: selection })
        this.setState({ selected: newSel });
    }
    render() {

        const { language, nusach } = this.state.selected;

        return (
            <section className="MaozTzur">
                <Selector
                    selected={this.state.selected}
                    languages={this.state.languages}
                    nusachot={this.state.nusachot}
                    handler={this.selectHandler} />
                <div className="MaozTzur__inner">
                    <Menorah />
                    {content[language][nusach].map(section => <Section
                        section={section}
                        key={section.title}
                        language={this.state.selected.language} />)}
                    <Footer />
                </div>
            </section>)
    }
}

export default MaozTzur;