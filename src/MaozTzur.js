import React, { Component } from 'react';
import * as content from './MaozTzurContent';
import Selector from './Selector';
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
		this.selectHandler = this.selectHandler.bind(this);
	}
	selectHandler(type, selection) {
		const newSel = Object.assign({}, this.state.selected, { [type]: selection })
		this.setState({ selected: newSel });
	}
	render() {
		const { language, nusach } = this.state.selected;

		return (
			<div>
				<Selector
					selected={this.state.selected}
					languages={this.state.languages}
					nusachot={this.state.nusachot}
					handler={this.selectHandler} />
				{content[language][nusach].map(section => <Section
					section={section}
					key={section.title} />)}
				<Footer />
			</div>)
	}
}

export default MaozTzur;