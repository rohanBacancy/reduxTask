import React from 'react'
import { connect } from 'react-redux'
import {editUser,deleteUser} from '../store/actions'
import {Button,TextField,TableContainer,Table,TableRow,TableHead,TableCell,TableBody,Paper,Grid,Typography, IconButton} from '@material-ui/core/';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const Users = (props) => {
    return (
    <Grid container justify="center" align={"center"} style={{maxWidth:'60vw',margin:'10vh auto'}}>
    <Grid item>
    <TableContainer component={Paper}>
      <Table align="center" justify="center" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><Typography color="primary" variant={"h6"}>Name</Typography></TableCell>
            <TableCell align="center"><Typography color="primary" variant={"h6"}>Email</Typography></TableCell>
            <TableCell align="center"><Typography color="primary" variant={"h6"}>Address</Typography></TableCell>
            <TableCell align="center"><Typography color="primary" variant={"h6"}>Phone No</Typography></TableCell>
            <TableCell align="center"><Typography color="primary" variant={"h6"}>Website</Typography></TableCell>
            <TableCell align="center"><Typography color="primary" variant={"h6"}>Edit</Typography></TableCell>         
            <TableCell align="center"><Typography color="primary" variant={"h6"}>Delete</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.usrs.map( (user) =>  
            <TableRow key={user.id}>
              <TableCell align="center"><Typography variant={"body1"}>{user.name}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"body1"}>{user.email}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"body1"}>{user.address}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"body1"}>{user.phone}</Typography></TableCell>
              <TableCell align="center"><Typography variant={"body1"}>{user.website}</Typography></TableCell>
              <TableCell align="center"><Typography color="primary" variant={"body1"}><IconButton  onClick={() => {props.setFormFlag('EDIT'); props.setEditUID(user.id)}}><EditIcon/></IconButton></Typography></TableCell>
              <TableCell align="center"><Typography color="primary" variant={"body1"}><IconButton  onClick={() => props.onDeleteClicked(user.id)}><DeleteIcon/></IconButton></Typography></TableCell>
            
            </TableRow>) 
            
          }
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
    </Grid>

    )
}

const mapStateToProps = state =>
{
    return{
        usrs:state,
    }
}

const mapDispatchToProps = dispatch =>
{
    return{
        onEditClicked : (id,name,email,address,phone,website) => dispatch(editUser(id,name,email,address,phone,website)),
        onDeleteClicked : (id) => dispatch(deleteUser(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Users)
