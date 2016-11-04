import React, { Component } from 'react';
import './ButtonRow.css';

class ButtonRow extends Component {
	click(tag) {
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
								className={`ButtonRow__button ${isActive ? 'selected' : ''} ButtonRow__button--${this.props.type} `}
								onClick={() => this.click(sel.tag)}
								key={sel.tag}>{sel.label}</button>
						)
					})}
				</div>
			</div>
		)
	}
}

export default ButtonRow;