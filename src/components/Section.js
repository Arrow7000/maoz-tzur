import React, { Component } from 'react';
import './Section.css';

class Section extends Component {
	render() {
		const section = this.props.section;
		const title = section.title || null;
		const subtitle = section.subtitle || null;
		const content = section.content || null;
		const language = this.props.language;

		// console.log(this.props.selected);

		return (
			<section className="Section">
				<div className="title">
					{title && <h3>{title}</h3>}
					{subtitle && <h4>{subtitle}</h4>}
				</div>
				<div className="text__area">
					{content.map(item => {
						const title = item.title ? (<h6 className="title title--text">{item.title}</h6>) : null;

						return (
							<div key={item.text}>
								{title}
								<p className={`text ${language}`} > {item.text}</p>
							</div>
						)
					})}
				</div>
			</section>
		)
	}
}

export default Section;