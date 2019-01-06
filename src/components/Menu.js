import React from "react";
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';
import {
    Button,
    ButtonToolbar,
    Nav,
    Navbar,
    NavDropdown,
    NavItem,
    ToggleButton,
    ToggleButtonGroup
} from "react-bootstrap";
import Form from "./Form";

class Menu extends React.Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired,
    };
    toggleTheme= this.toggleTheme.bind(this);
    state = {
        active: false
    };
    componentDidMount() {

    }
    onClick = (href) => {
        const { props } = this;
        if(props.onClick) {
            props.onClick(href);
        }
        console.log("onclick");
    };
    toggleTheme() {
        const currentState = this.state.active;
        var articles = document.querySelectorAll("#articles-list > .article");
        var links = document.getElementsByTagName("a");

        if (this.state.active === true){
            //Light theme
            document.body.style.setProperty('background-color', '#faebd7');
            document.body.style.setProperty('color', '#333');
            for (var i =0; i< articles.length;i++){
                articles[i].style.backgroundColor = "#f8f8f8";
                articles[i].style.borderColor = "#d1bf1ca3";
            }
            for (var i =0; i< links.length;i++){
                links[i].style.color="#777";
            }
            document.getElementById("menu-st").style.backgroundColor = "#e7e7e7";
            document.getElementById("menu-st").style.borderColor = "#faebd7";
        } else {

            //Dark theme
            document.body.style.setProperty('background-color', '#222');
            document.body.style.setProperty('color', 'white');
            for (var i =0; i< articles.length;i++){
                articles[i].style.backgroundColor = "#303030";
                articles[i].style.borderColor = "#303030";
            }
            for (var i =0; i< links.length;i++){
                links[i].style.color="white";
            }
            document.getElementById("menu-st").style.backgroundColor = "#375a7f";
            document.getElementById("menu-st").style.borderColor = "#375a7f";


        }
        this.setState({ active: !currentState });
        console.log("active",this.state.active);
    };
    render() {
        const { items, children } = this.props;
        return (
            <div className="menu" >
                <Navbar id="menu-st">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#home">News Api App</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullLeft>
                            {items && items.map((item)=> {
                                return <MenuItem item={item} onClick={this.onClick}/>
                            })}
                        </Nav>
                        <Navbar.Form pullRight>
                            {children}
                        </Navbar.Form>{' '}
                        <Button className={this.state.active ? 'theme-btns light-th': "theme-btns dark-th"} onClick={this.toggleTheme}>Change theme</Button>
                    </Navbar.Collapse>

                </Navbar>
                {/*<Form*/}
                    {/*onQueryChanged={this.onQueryChanged}*/}
                {/*/>*/}

            </div>
        )
    }
}
export default Menu;