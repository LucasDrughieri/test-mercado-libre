import React from 'react';

export default class ProductDetail extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>   
                <div className="row detail">
                    <div className="col-md-8 col-xs-12">
                        <div className="img-detail img-responsive">
                            <img src={this.props.detail.item.picture} />
                        </div>   
                    </div>
                    <div className="col-md-4 col-xs-12">
                        <h5 className="condition">{this.props.detail.item.condition == 'new' ? 'Nuevo - ' + this.props.detail.item.soldQuantity + ' vendidos': 'Usado'}</h5>
                        <h4 className="title">{ this.props.detail.item.title }</h4>
                        <h3 className="price">{ this.props.detail.item.price.currency == 'ARS' ? '$' : 'U$D' } {this.props.detail.item.price.amount} <sup className="decimals">{this.props.detail.item.price.decimals}</sup></h3>

                        <button className="btn btn-buy btn-block">Comprar</button>
                    </div>
                </div>

                <div className="row description">
                    <div className="col-xs-12">
                        <h3 className="description-title">Descripción del producto</h3>

                        <div className="img-responsive">											
                            <img className="img-center" src={this.props.detail.item.description} />
                        </div>
                    </div>
                </div>    
            </div> 
        );
    }
}