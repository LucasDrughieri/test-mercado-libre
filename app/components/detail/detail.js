import React from 'react';
import {render} from 'react-dom'; 
import Axios from 'axios';
import Toastr from 'toastr';
import Search from '../search/search';
import Breadcrumb from '../breadcrumb/breadcrumb';
import Spinner from '../spinner/spinner';
import ProductDetail from './product-detail';

export default class Detail extends React.Component {
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

                        <ProductDetail  detail={this.state.detail} />
                    </div>
				</section>
            </div>
        );
    }
}