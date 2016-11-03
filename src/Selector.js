import React, { Component } from 'react';
import './Selector.css';
import './ButtonRow.css';

class ButtonRow extends Component {
	click(tag) {
		// console.log(this.props.type, tag);
		this.props.handler(this.props.type, tag);
	}
	render() {
		return (
			<div className="ButtonRow">
				{this.props.selectors.map(sel => {
					const isActive = sel.tag === this.props.active;
					return (
						<button
							className={`ButtonRow__button ${isActive ? 'selected' : ''}`}
							onClick={() => this.click(sel.tag)}
							key={sel.tag}>{sel.label}</button>
					)
				})}
			</div>
		)
	}
}

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