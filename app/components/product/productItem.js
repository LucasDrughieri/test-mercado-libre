import React from 'react';
import { browserHistory } from 'react-router';

export default class ProductItem extends React.Component {
    constructor(props){
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        browserHistory.push('/items/' + this.props.item.id);
    }

    render() {
        return (
            <div className="row product" onClick={this.onClick}>
                <div className="col-md-2 col-xs-12">
                    <div className="img-responsive">											
                        <img className="product-img" src={this.props.item.picture} />
                    </div>
                </div>
                <div className="col-md-6 col-xs-12 description">
                    <div className="price">
                        { this.props.item.price.currency == 'ARS' ? '$' : 'U$D' } { this.props.item.price.amount }
                        <sup className="decimals">{this.props.item.price.decimals}</sup>
                        <div className={this.props.item.freeShipping ? 'free-shipping' : ''}></div>
                    </div>
                    
                    <div className="title">
                        <span>{this.props.item.title}</span>
                    </div>
                </div>
                <div className="col-md-2 col-md-offset-1 location col-xs-12">
                    {this.props.item.location}
                </div>
            </div>
        );
    }
}