import React from "react";
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import {Nav, Navbar, NavDropdown, NavItem} from "react-bootstrap";

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
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#home">News Api App</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        {items && items.map((item)=> {
                            return <MenuItem item={item} onClick={this.onClick}/>
                        })}
                    </Nav>
                </Navbar>

            </div>
        )
    }
}
export default Menu;