import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import Landing from '../home/Landing';
import Callback from '../Callback';
import Analyse from '../track/Analyse';

class Menu extends React.Component{

    loggedOut(){
        if (localStorage.getItem('spotify_token') === null){
            return (
                <Alert key="alert" variant="danger">
                    You are disconnected, please log in...
                </Alert>
            )
        }
    }
    
    render() {
        var loggedIn = localStorage.getItem('spotify_token');
        var client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID
        const redirectUri = "http://localhost:3000/callback";
        var scopes = [
            "user-read-email",
            "user-read-private",
            "user-library-read",
            "playlist-read-private"
        ]
        var spotifyAuthUrl = "https://accounts.spotify.com/authorize?client_id="
            + client_id + "&redirect_uri=" + redirectUri + "&scope=" + scopes.join("%20") +"&response_type=token&show_dialog=true"

        return (
            <Router>
                <div>
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand><Link to="/">Spotify Scanner</Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Link to="/home">Home</Link>
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <Button href={spotifyAuthUrl} variant="outline-primary">Login</Button>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar>
                    {this.loggedOut()}
                    <Switch>
                        <Route path="/callback">
                            <Callback />
                        </Route>
                        <Route path="/home">
                            {loggedIn === null ? <Redirect to="/" /> : <Landing />}
                        </Route>
                        <Route path="/track/:id">
                            {loggedIn === null ? <Redirect to="/" /> : <Analyse />}
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Menu;
