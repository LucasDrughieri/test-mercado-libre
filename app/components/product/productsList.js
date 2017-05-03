import React from 'react'
import Breadcrumb from '../breadcrumb/breadcrumb';
import ProductItem from './productItem';

export default class ProductList extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <Breadcrumb categories={this.props.result.categories} />
                
                <ul className="products">
                    {
                        this.props.result.items.map((item, index) => {
                            return (
                                <li key={"product"+index}><ProductItem item={item} /></li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}