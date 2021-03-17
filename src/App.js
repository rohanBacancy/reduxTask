import { useState } from 'react';
import './App.css';
import Form from './Components/Form';
import Nav from './Components/Nav';
import Users from './Components/Users';

function App(props) {

  const [formFlag,setFormFlag] = useState(""); //Should render edit/add form or Show users
  const [editUID,setEditUID] = useState(-1); //If edit form is about to open which user to edit

  let contentRender;

  if(formFlag === 'ADD')
  {
    contentRender = <Form title="Add User Form" formFlag={formFlag} setFormFlag={setFormFlag}/>
  }
  else if(formFlag === 'EDIT')
  {
    contentRender = <Form title="Update User Form" id={editUID} formFlag={formFlag} setFormFlag={setFormFlag}/>
  }
  else
  {
    contentRender = <Users setFormFlag={setFormFlag} setEditUID={setEditUID}/>
  }

  return (
    <div className="App">
      <Nav setFormFlag={setFormFlag}/>
      {contentRender}
    </div>
  );
}

export default App;
