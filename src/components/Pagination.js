import React from "react";
import {Pagination as BootstrapPagination} from "react-bootstrap";
import PropTypes from "prop-types";
import ReactPaginate from 'react-paginate';
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
        if(current <= pages) {
            if (onPageChanged) {
                onPageChanged(current + 1, e);
            }
        }
    };
    onPageChanged = (e) => {
        const { onPageChanged, current, pages } = this.props;
        onPageChanged(e.selected, e);
    };
    render() {
        const { onPageChanged, query, pages, current } = this.props;
        return (
            <ReactPaginate forcePage={current} pageCount={pages} activeClassName="active" containerClassName="pagination" pageRangeDisplayed={5} marginPagesDisplayed={5} onPageChange={this.onPageChanged} />
            // <BootstrapPagination id="pagination">
            //     <First disabled={firstDisabled} onClick={() => onPageChanged(1)} />
            //     <Prev disabled={prevDisabled} onClick={this.prevPage} />
            //     {this.getPrintablePages()}
            //     <Next disabled={nextDisabled} onClick={this.nextPage} />
            //     <Last disabled={lastDisabled} onClick={() => onPageChanged(pages)} />
            // </BootstrapPagination>
        );
    }
}

export default Pagination;