import React, { useState,useEffect } from 'react';
import { Typography,Grid,Button, Paper, TextField} from '@material-ui/core';
import { connect } from 'react-redux'
import { addUser,editUser } from '../store/actions'

const Form = (props) => {

    const [formDtls ,setFormDtls] = useState({});
    const [errorMsgs,setErrorMsgs] = useState({
        nameError:'',
        emailError:'',
        addressError:'',
        phoneError:'',
        websiteError:'',
    })

    useEffect( () => {

        if(props.id>0) // if Edit form is opened
        {
            let userOfPassedId= props.usrs.filter(usr => usr.id === props.id);
            let userObjectFromArray =  userOfPassedId[0];
            setFormDtls(userObjectFromArray)
        }
        else // Add user form
        {
            setFormDtls({
                name:'',
                email:'',
                address:'',
                phone:'',
                website:'',
            })
        }

    },[props.id])

    const handleSubmit = (e) => //Store User Object At it's position in Users Array
    {
        e.preventDefault();

        //Check If All Inputs are Valid
        let sum=0;
        for(let msg in errorMsgs)
        {
            sum+=errorMsgs[msg].length;
        }

        if(sum==0)//No Input Errors
        {
            if(props.formFlag == 'ADD') // If Form is for Adding User
            {
                let sendNewUser = {
                        id:Math.floor(Math.random() * 101),
                        name:formDtls.name,
                        email:formDtls.email,
                        address:formDtls.address,
                        phone:formDtls.phone,
                        website:formDtls.website,
                }
                props.onAddUser(sendNewUser);
                alert("User Added Successfully");
                props.setFormFlag(""); // Close Model and Show HomePage
            }
            else if(props.formFlag == 'EDIT') // If Form is for Updating User
            {
                let sendUpdatedUser = {
                        id:props.id,
                        name:formDtls.name,
                        email:formDtls.email,
                        address:formDtls.address,
                        phone:formDtls.phone,
                        website:formDtls.website,
                }
                console.log("sent user")
                console.log(sendUpdatedUser)
                props.onEditUser(props.id,sendUpdatedUser);
                alert("User Updated Successfully");
                props.setFormFlag(""); // Close Model and Show HomePage
            }
        }
        else//Any one or more of the form fields contains errors
        {
            alert("Any of the Form Fields Contains Error")
        }
    }

    const handleChange = (e) => //Update Form Details in local state and check validation
    {
        validate(e);
        switch(e.target.name)
        {
            case 'name':
                setFormDtls({...formDtls,name:e.target.value});
                break;
            case 'email':
                setFormDtls({...formDtls,email:e.target.value});
                break;
            case 'phone':
                setFormDtls({...formDtls,phone:e.target.value});
                break;
            case 'website':
                setFormDtls({...formDtls,website:e.target.value});
                break;
            case 'address':
                setFormDtls({...formDtls,address:e.target.value});
                break;
            default:
                console.log("How");
                break;
        }
    }

    const validate = (e) =>
    {
        switch(e.target.name)
        {
            case 'name':
                e.target.value == '' ? setErrorMsgs({...errorMsgs,nameError:"It is Required"}) : setErrorMsgs({...errorMsgs,nameError:""}) ;
                break;
            case 'address':
                e.target.value == '' ? setErrorMsgs({...errorMsgs,addressError:"It is Required"}) : setErrorMsgs({...errorMsgs,addressError:""}) ;
                break;
            case 'website':
                !validURL(e.target.value) ? setErrorMsgs({...errorMsgs,websiteError:"Enter Valid URL"}) : setErrorMsgs({...errorMsgs,websiteError:""});
                break;
            case 'email':
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if( ! (re.test(String(e.target.value).toLowerCase()))) setErrorMsgs({...errorMsgs,emailError:"Invalid Email"}); else setErrorMsgs({...errorMsgs,emailError:""});
                console.log(errorMsgs);
                break;
            case 'phone':
                const rephone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                 if( ! (rephone.test(String(e.target.value)))) setErrorMsgs({...errorMsgs,phoneError:"Invalid PhoneNo"}); else setErrorMsgs({...errorMsgs,phoneError:""});
                 console.log(errorMsgs);
                break;
            default:
                console.log("How");
                break;
        }
        
    }

    //Website validation regex from stackoverflow
    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }

    const onCancelClick = () =>
    {
        props.setFormFlag("")
    }

    let addOrUpdateButton;

    if(props.formFlag == 'ADD')
    {
       addOrUpdateButton = <Button type="submit" color="primary" variant="contained" style={{marginTop:'25px',width:'25vw'}}>Add</Button>         
    }
    else if(props.formFlag == 'EDIT')
    {
        addOrUpdateButton = <Button type="submit" color="primary" variant="contained" style={{marginTop:'25px',width:'25vw'}}>Update</Button>
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <Paper elevation={20} style={{maxWidth:'55vw',margin:'30px auto',padding:'20px'}}>
            <Typography variant="h5" align="center" color="primary">{props.title}</Typography>
            <Grid container alignItems="center" justify="center" direction="column" spacing={1} style={{maxWidth:'100vw',marginTop:'15px'}}>
                
                {/* Name */}
                <Grid item>
                    <TextField
                     value={formDtls.name}
                      onChange={handleChange}   
                        error={errorMsgs.nameError.length>1}
                        helperText={errorMsgs.nameError}
                       name="name"
                        label="Name"
                         required style={{width:'25vw'}}></TextField></Grid>
               
                {/* Email */}
                <Grid item><TextField
                 error={errorMsgs.emailError.length>1}
                  helperText={errorMsgs.emailError}
                  value={formDtls.email}
                    name="email"
                     onChange={handleChange}
                      label="Email ID"
                       type="email"
                        required style={{width:'25vw'}}></TextField></Grid>

                {/* Address */}
                <Grid item><TextField
                 error={errorMsgs.addressError.length>1}
                  helperText={errorMsgs.addressError}
                   value={formDtls.address}
                    name="address"
                     onChange={handleChange}
                      label="Address"
                       type="text"
                        required style={{width:'25vw'}}></TextField></Grid>
                
                {/* Phone Number */}
                <Grid item><TextField
                 error={errorMsgs.phoneError.length>1}
                  helperText={errorMsgs.phoneError}
                   value={formDtls.phone}
                    name="phone"
                     onChange={handleChange}
                      label="Phone No"
                       required style={{width:'25vw'}}></TextField></Grid>

                {/* Website */}
                <Grid item><TextField
                 error={errorMsgs.websiteError.length>1}
                  helperText={errorMsgs.websiteError}
                   value={formDtls.website}
                    name="website"
                     onChange={handleChange}
                      label="Website URL"
                       type="text"
                        required style={{width:'25vw'}}></TextField></Grid>
                
                {  addOrUpdateButton  }
                <Button onClick={onCancelClick} color="secondary" variant="contained" style={{marginTop:'25px',width:'25vw'}}>Cancel</Button>
            
            </Grid>
            </Paper>
        </form>
        </div>
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
        onAddUser : (newUser) => dispatch(addUser(newUser)),
        onEditUser : (id,editedUser) => dispatch(editUser(id,editedUser)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Form)
