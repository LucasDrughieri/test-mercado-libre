import React from 'react';

export default class Spinner extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-2 col-xs-offset-5">
                    <div className="loader"></div>
                </div>
            </div>
        );
    }
}