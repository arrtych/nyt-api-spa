import React from "react";

const Form = props => (
    <form onSubmit={props.getData}>
        <input type="text" name="query" placeholder="Search..."/>
        <input type="submit" value="Get Article" />
    </form>
);

export default Form;