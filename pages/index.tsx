import { 
	Typography, 
	Card, 
	CardContent, 
	List, 
	ListItem, 
	ListItemText, 
	Button 
} from '@material-ui/core'

import Head from 'next/head';
import Link from '../src/Link'
import LayoutComponent from '../components/layout_component';

export default function Index() {
	return (
		<LayoutComponent>
            <Head><title>Candidato</title></Head>
			<Card>
                <CardContent>
                    <Typography variant="h4">Información del candidato</Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="Nombre" secondary="Julio César Hernández Castillo"></ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Email" secondary="infocesar03@gmail.com"></ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Teléfono" secondary="(833) 535 76 14"></ListItemText>
                        </ListItem>
                        <ListItem>
                            <Link color="inherit" href="/CesarHernandez.pdf" target="_blank">
                                <Button color="primary" variant="contained">Ver curriculum</Button>
                            </Link>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
		</LayoutComponent>
	);
}