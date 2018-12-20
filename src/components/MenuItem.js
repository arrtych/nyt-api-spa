import React from "react";
import PropTypes from "prop-types";
import { buildUrl } from "./../utils";

class MenuItem extends React.Component {
    static propTypes = {
        item: PropTypes.object.isRequired,
        onClick: PropTypes.func.isRequired,
    };
    onClick = (e) => {
        e.preventDefault();
        const { href } = e.target;
        const { props } = this;
        if(props.onClick) {
            props.onClick(href);
        }
    };
    render() {
        const { item } = this.props;
        return (
            <li className="menu-item">
                <a href={buildUrl(item.query)} onClick={this.onClick}>{item.label}</a>
            </li>
        )
    }
}
export default MenuItem;