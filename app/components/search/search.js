import React from 'react';
import ReactDOM, {render} from 'react-dom';  
import { browserHistory } from 'react-router';
import Axios from 'axios';
import Toastr from 'toastr';
import ProductsList from '../product/productsList';
import Spinner from '../spinner/spinner';

export default class Search extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            query: props.query ? props.query : ''
        }

        this.updateState = this.updateState.bind(this);
    }

    componentDidMount() {
        if(this.props.view == "products" && this.state.query && this.state.query !== ""){
            render(<Spinner />, document.getElementById('products-result'));
            this.getProducts();
        }
    }

    onSubmit(event) {
        event.preventDefault();

        if(this.props.view == "detail"){
            browserHistory.push('/items?search=' + this.state.query);
        }
        else{
           render(<Spinner />, document.getElementById('products-result'));
           this.getProducts();     
        }
    }

    getProducts() {
        var query = this.state.query ? this.state.query : '';

        Axios.get('/api/items?q=' + query)
            .then(response => {
                browserHistory.replace('/items?search=' + this.state.query);
                render(<ProductsList result={response.data} />, document.getElementById('products-result'));
            })
            .catch(err => {
                ReactDOM.unmountComponentAtNode(document.getElementById('products-result'));
                Toastr.error(err.response.data[0].msg);
            });	
    }

    updateState(event) {
        return this.setState({query: event.target.value});
    }

    goHome(event){
        window.location.href = "/";
    }

    render() {
        return (
            <form onSubmit={ (event) => this.onSubmit(event) }>
                <nav className="row navbar navbar-ml">
                    <div className="col-xs-1 col-xs-offset-2">
				    	<div className="logo pull-right" onClick={this.goHome}></div>
				    </div>
                    <div className="col-xs-7">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Nunca dejes de buscar" value={this.state.query} onChange={this.updateState} />
                            <span className="input-group-addon btn btn-default">
                                <button className="search-button" type="submit"><div className="search-icon"></div></button>
                            </span>
                        </div>
                    </div>
                </nav>
            </form>
        );
    }
}