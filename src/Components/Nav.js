import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Nav = ({setFormFlag}) => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" align={'left'} style={{flex:1}}>
                        Redux Task
                    </Typography>
                    <Button color="inherit" onClick={() => setFormFlag("ADD")}>Add User</Button>    
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Nav
