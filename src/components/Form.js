import React from "react";
import {Button, Navbar, FormControl, FormGroup} from "react-bootstrap";
import PropTypes from "prop-types";

class Form extends React.Component {
    static propTypes = {
        onQueryChanged: PropTypes.func.isRequired,
        query: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
    };
    constructor(props) {
        super(props);
        // this.state = {
        //     query: ''
        // }
    }
    onSubmit = (e) => {
        const { props, state } = this;
        e.preventDefault();
        if(props.onSubmit) {
            props.onSubmit(props.query);
        }
    };
    render() {
        const { onQueryChanged, query } = this.props;
        return (
            <form onSubmit={this.onSubmit}>
                <FormGroup>
                    <FormControl type="text" name="query" placeholder="Filter articles..." value={query} onChange={onQueryChanged}/>
                </FormGroup>
                {/*<Button type="submit">Filter</Button>*/}
            </form>
        );
    }
}

export default Form;