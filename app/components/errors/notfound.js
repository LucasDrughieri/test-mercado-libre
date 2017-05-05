import React from 'react';
import { Link } from 'react-router';

export default class NotFound extends React.Component {
    render() {
        return (
            <div className="middle-box text-center">
                <h1>404</h1>
                <h3 className="font-bold">Página no encontrada</h3>
                <p>
                    Lo sentimos, pero la página que está buscando ha sido encontrada. Prueba a comprobar la URL de error, 
                    luego pulsa el botón de actualización en tu navegador o intenta encontrar algo más en nuestra aplicación.
                </p>

                <Link className="btn btn-primary" to="/">Volver a la página principal</Link>
            </div>
        );
    }
}