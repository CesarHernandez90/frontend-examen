import NavbarComponent from './navbar_component';
import { Container } from "@material-ui/core";

export default function LayoutComponent(props) {
    return (
        <div>
            <NavbarComponent></NavbarComponent>
            <Container className="pt-4">
                {props.children}
            </Container>
        </div>
    )
}