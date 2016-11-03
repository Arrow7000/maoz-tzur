import React, { Component } from 'react';

class Section extends Component {
	render() {
		const section = this.props.section;
		const title = section.title || null;
		const subtitle = section.subtitle || null;
		const content = section.content || null;

		return (
			<section className="part" id="blessings">
				<div className="intro">
					{title && <h3>{title}</h3>}
					{subtitle && <h4>{subtitle}</h4>}
				</div>
				<div className="hebrew-area">
					{content.map(item => {
						const title = item.title ? (<h6 className="intro" id="shehe">{item.title}</h6>) : null;

						return (
							<div key={item.text}>
								{title}
								<p className="hebrew" > {item.text}</p>
							</div>
						)
					})}
				</div>
			</section>
		)
	}
}

export default Section;