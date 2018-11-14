import React from "react";

const Form = props => {
    return (
        <form onSubmit={props.getData}>
            <input type="text" name="query" placeholder="Search..." value={props.query} onChange={props.onQueryChanged}/>
            <input type="submit" value="Get Article" />
        </form>
    );
};

export default Form;