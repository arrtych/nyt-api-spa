import React from "react";

const Form = props => {
    return (
        <form {...props}>
            <input type="text" name="query" placeholder="Search..." value={props.query} onChange={props.onQueryChanged}/>
            <input type="submit" value="Get Article" />
        </form>
    );
};

export default Form;