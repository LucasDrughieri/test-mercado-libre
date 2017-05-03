import React from 'react';
import Search from '../search/search';

export default class Index extends React.Component {
	constructor(props) {
       super(props);
    } 

	render() {
		return (
			<div className="container">
				<header id="search">
					<Search view="products" query={this.props.location.query.search} />		 
				</header>

				<section id="products-result">
					
				</section>
		 	 </div>
		);
	}
}