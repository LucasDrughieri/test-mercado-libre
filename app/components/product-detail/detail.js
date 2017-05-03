import React from 'react';
import {render} from 'react-dom'; 
import Axios from 'axios';
import Toastr from 'toastr';
import Search from '../search/search';
import Breadcrumb from '../breadcrumb/breadcrumb';
import Spinner from '../spinner/spinner';

export default class ProductDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            detail: {
                item: {
                    price: {}
                },
                categories: []
            },
            loading: true,
            notfound: false
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        Axios.get('/api/items/' + this.props.params.id)
            .then((response) => {
                this.setState({ detail: response.data });
                this.setState({ loading: false });
            })
            .catch(err => {
                Toastr.error('Producto no encontrado');
                this.setState({ loading: false, notfound: true });
            });
    }

    render() {
        return (
            <div >
				<header id="search" className="container-fluid">
					<Search view="detail" query="" />		 
				</header>

				<section id="detail" className="container">
                    <div className={this.state.loading ? '' : 'hide'}>
                        <Spinner />
                    </div>
                    <div className={this.state.loading || this.state.notfound ? 'hide' : ''}>
                        <Breadcrumb categories={this.state.detail.categories} />

                        <div className="row detail">
                            <div className="col-md-8 col-xs-12">
                                <div className="img-detail img-responsive">
                                    <img src={this.state.detail.item.picture} />
                                </div>   
                            </div>
                            <div className="col-md-4 col-xs-12">
                                <h5 className="condition">{this.state.detail.item.condition == 'new' ? 'Nuevo - ' + this.state.detail.item.soldQuantity + ' vendidos': 'Usado'}</h5>
                                <h4 className="title">{ this.state.detail.item.title }</h4>
                                <h3 className="price">{ this.state.detail.item.price.currency == 'ARS' ? '$' : 'U$D' } {this.state.detail.item.price.amount} <sup className="decimals">{this.state.detail.item.price.decimals}</sup></h3>

                                <button className="btn btn-buy btn-block">Comprar</button>
                            </div>
                        </div>

                        <div className="row description">
                            <div className="col-xs-12">
                                <h3 className="description-title">Descripción del producto</h3>

                                <div className="img-responsive">											
									<img className="img-center" src={this.state.detail.item.description} />
								</div>
                            </div>
                        </div>
                    </div>
				</section>
            </div>
        );
    }
}