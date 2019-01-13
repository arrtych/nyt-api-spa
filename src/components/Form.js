import React from "react";
import {Button, Navbar, FormControl, FormGroup} from "react-bootstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {query} from "../actions/query";

class Form extends React.Component {
    static propTypes = {
        onQueryChanged: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
    };
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }
    onSubmit = (e) => {
        const { props } = this;
        e.preventDefault();
        if(props.onSubmit) {
            props.onSubmit(e.value);
        }
        props.makeQuery(e.value);
    };
    onQueryChanged = (e) => {
        const { props } = this;
        const query = e.target.value;
        this.setState({
            query
        });
        props.makeQuery(query);
        if(props.onQueryChanged) {
            props.onQueryChanged(query);
        }
    };
    render() {
        const { query } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <FormGroup>
                    <FormControl type="text" name="query" placeholder="Filter articles..." value={query} onChange={this.onQueryChanged}/>
                </FormGroup>
                {/*<Button type="submit">Filter</Button>*/}
            </form>
        );
    }
}
const mapStateToProps = state => ({
    query: state.query.query,
});
const mapDispatchToProps = dispatch => ({
    makeQuery: (value) => dispatch(query(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Form);