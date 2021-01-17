import React from 'react';
import Link from '../src/Link';
import { AppBar, Toolbar, Container, Button } from "@material-ui/core"

export default function NavbarComponent() {
    return (
        <AppBar position="sticky">
            <Container>
                <Toolbar>
                    <Link color="inherit" href="/" className="navbar-item">
                        NOMBRE CANDIDATO
                    </Link>
                    <Link color="inherit" href="/store" className="navbar-item">
                        STORE
                    </Link>    
                </Toolbar>
            </Container>
        </AppBar>
    );
}