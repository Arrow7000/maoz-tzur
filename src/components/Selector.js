import React, { Component } from 'react';
import './Selector.css';
import ButtonRow from './ButtonRow';

class Selector extends Component {
	constructor() {
		super();
		this.state = { open: false };
	}
	toggleOpen() {
		this.setState({ open: !this.state.open });
	}
	render() {
		const { nusachot, languages } = this.props;

		return (
			<div className={`Selector Selector--${this.state.open ? 'open' : 'closed'}`} >
				<button className="Selector__opener" onClick={this.toggleOpen.bind(this)}>Aא</button>
				<div className="Selector__switches">
					<ButtonRow
						selectors={nusachot}
						type="nusach"
						active={this.props.selected.nusach}
						handler={this.props.handler} />
					<ButtonRow
						selectors={languages}
						type="language"
						active={this.props.selected.language}
						handler={this.props.handler} />
				</div>
			</div>
		);
	}
}

export default Selector;