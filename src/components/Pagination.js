import React from "react";
import {Pagination as BootstrapPagination} from "react-bootstrap";
import PropTypes from "prop-types";
const { Ellipsis, Item, First, Last, Next, Prev } = BootstrapPagination;

class Pagination extends React.Component {
    static propTypes = {
        onPageChanged: PropTypes.func.isRequired,
        current: PropTypes.number.isRequired,
        pages: PropTypes.number.isRequired,
    };
    constructor(props) {
        super(props);
    }
    onClick = (page, e) => {
        const { props, state } = this;
        if(props.onPageChanged) {
            props.onPageChanged(page, e);
        }
    };
    getPrintablePages = () => {
        const { current, pages } = this.props;
        const pagesArr = [];
        let Component = Item;
        // <Pagination.Ellipsis />
        for(let i = 1; i <= pages; i++) {
            const active = current === i;
            if(i > current + 3) break;
            if(i > current - 3 && i <= current - 2) continue;
            pagesArr.push((<Component active={active} onClick={this.onClick.bind(this, i)}>{i}</Component>));
        }
        return pagesArr;
    };
    onSubmit = (e) => {
        const { props, state } = this;
        e.preventDefault();
        if(props.onSubmit) {
            props.onSubmit(props.query);
        }
    };
    nextPage = (e) => {
        const { onPageChanged, current, pages } = this.props;
        if(onPageChanged) {
            onPageChanged(current + 1 > pages ? pages : current + 1, e);
        }
    };
    render() {
        const { onQueryChanged, query } = this.props;
        return (
            <BootstrapPagination id="pagination">
                <First />
                <Prev />
                {this.getPrintablePages()}
                <Next onClick={() => this.nextPage()}/>
                <Last />
            </BootstrapPagination>
        );
    }
}

export default Pagination;