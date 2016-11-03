import React, { Component } from 'react';
import * as content from './MaozTzurContent';
import Selector from './Selector';
import Section from './Section';
import Footer from './Footer';
import 'whatwg-fetch';

class MaozTzur extends Component {
	constructor() {
		super();

		// fetch('http://freegeoip.net/json/').then(response => {
		// 	return response.json();
		// }).then(json => {
		// 	console.log(json);
		// }).catch(function (error) {
		// 	console.log('request failed', error)
		// });


		fetch('http://freegeoip.net/json/')
			.then(res => res.json())
			.then(res => {
				return fetch(`http://www.hebcal.com/hebcal/?v=1&cfg=json&year=now&month=12&c=on&geo=pos&latitude=${res.latitude}&longitude=${res.longitude}&tzid=UTC`);
			})
			.then(res => res.json())
			.then(res => {
				console.log(res);
			})
			.catch(function (error) {
				console.log('request failed', error)
			});

		// this.state.location = response;


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