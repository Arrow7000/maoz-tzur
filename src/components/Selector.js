import React, { Component } from 'react';
import './Selector.css';
import ButtonRow from './ButtonRow';

class Selector extends Component {
	render() {
		const { nusachot, languages } = this.props;

		return (
			<div className="Selector">
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
		);
	}
}

export default Selector;