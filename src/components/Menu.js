import React from "react";
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

class Menu extends React.Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    componentDidMount() {

    }
    onClick = (href) => {
        const { props } = this;
        if(props.onClick) {
            props.onClick(href);
        }
    };

    render() {
        const { items } = this.props;
        return (
            <div className="menu">
                <ul>
                    {items && items.map((item)=> {
                        console.log("item",item);
                        return <MenuItem item={item} onClick={this.onClick}/>
                    })}
                </ul>
            </div>
        )
    }
}
export default Menu;