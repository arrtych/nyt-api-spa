import React from "react";
import {Button,Navbar, FormControl, FormGroup} from "react-bootstrap";

const Form = props => {
    return (

        <Navbar.Form pullLeft {...props}>
            <FormGroup>
                <FormControl type="text" name="query" placeholder="Search..." value={props.query} onChange={props.onQueryChanged}/>
            </FormGroup>{' '}
            <Button type="submit" value="Get Article">Submit</Button>
        </Navbar.Form>
    );
};

export default Form;