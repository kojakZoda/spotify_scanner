import React from 'react';
import queryString from 'query-string';
import {
    Redirect
} from "react-router-dom";

class Callback extends React.Component {
    render() {
        const query = queryString.parse(window.location.hash);
        localStorage.setItem('spotify_token', query.access_token);
        if (localStorage.getItem('spotify_token') !== null){
            return <Redirect
                to="/home"
            />;
        }else{
            return <Redirect
                to="/"
            />;
        }
    }
}

export default Callback;
