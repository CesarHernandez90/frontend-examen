import React from 'react';
import Link from '../src/Link';
import { AppBar, Toolbar, Container, Button } from "@material-ui/core"

export default function NavbarComponent() {
    return (
        <AppBar position="sticky">
            <Container>
                <Toolbar>
                    <Link color="inherit" href="/">
                        <Button color="inherit">Nombre Candidato</Button>
                    </Link>
                    <Link color="inherit" href="/store">
                        <Button color="inherit">Store</Button>
                    </Link>    
                </Toolbar>
            </Container>
        </AppBar>
    );
}