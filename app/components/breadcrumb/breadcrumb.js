import React from 'react';

export default class Breadcrum extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <ul className="list-inline breadcrumb-ml">
                {
                    this.props.categories.map((category, index) => {
                        return <li key={"category"+index}>{category} {index !== (this.props.categories.length-1) ? '>' : '' }</li>
                    })
                }
            </ul>   
        );
    }
}