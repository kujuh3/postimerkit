import { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom"

function Valikko() {

    const [open, setOpen] = useState(null);

    const suljeMenu = () => {
        setOpen(null);
    }

  return (
        <AppBar position="sticky" color="default">
            <Toolbar>
                <IconButton color="inherit" edge="start" onClick={ (e) => { setOpen(e.currentTarget) }}>
                    <MenuIcon />
                </IconButton>
                <Menu open={Boolean(open)} anchorEl={open} onClose={suljeMenu}>
                    <MenuItem 
                        component={Link}
                        to="/etusivu"
                        onClick={ () => { 
                            suljeMenu();
                            }}
                    >Etusivu</MenuItem>
                    <MenuItem 
                        component={Link}
                        to="/selaa"
                        onClick={ () => { 
                            suljeMenu();
                            }}
                    >Selaa</MenuItem>
                 </Menu>

                <Typography variant="h5">Postimerkki kirjasto</Typography>
            </Toolbar>
        </AppBar>
  );
}

export default Valikko;
