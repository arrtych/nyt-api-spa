import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {defineMessages, injectIntl} from 'react-intl';
import MenuItem from './MenuItem';
import { changeTheme } from './../actions/theme';
import { changeLanguage } from './../actions/language';
import {
    Button,
    ButtonToolbar,
    Nav,
    Navbar,
    NavDropdown,
    NavItem,
    Glyphicon,
    MenuItem as BMenuItem,
} from "react-bootstrap";
import Form from "./Form";

const ruFlag = require("../assets/img/flag-ru.png");
const enFlag = require("../assets/img/flag-en.png");

const messages = defineMessages({
    lang: {
        id: 'menu.lang',
        defaultMessage: 'Lang'
    },
    themeLight: {
        id: 'menu.theme.light',
        defaultMessage: 'Light theme'
    },
    themeDark: {
        id: 'menu.theme.dark',
        defaultMessage: 'Dark theme'
    },
    topics: {
        id: 'menu.topics',
        defaultMessage: 'Topics'
    }
});

class Menu extends React.Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired,
    };
    state = {
        active: false,
        lang: undefined,
        languages: [{
            value: "ru",
            label: "Русский",
            image: ruFlag,
        }, {
            value: "en",
            label: "English",
            image: enFlag,
        }]
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
    toggleTheme = () => {
        const { theme } = this.props;
        let newTheme = "light";
        // const themeStyle = document.getElementById("theme-style");
        // console.log("themeStyle", themeStyle);
        if(theme === "dark") {
            // themeStyle.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
            newTheme = "light";


        } else if (theme === "light") {
            // themeStyle.href = "https://bootswatch.com/3/darkly/bootstrap.min.css";
            newTheme = "dark";

        }
        console.log("themeStyle", newTheme);
        this.props.changeTheme(newTheme);
    };

    changeLanguage = (language, e) => {
        console.log("language, e", language, e);
        e.preventDefault();
        this.props.changeLanguage(language);
    };
    render() {
        const { items, language, children, intl:{formatMessage} } = this.props;
        const { languages } = this.state;
        const [currentLanguage] = languages.filter((lang) => lang.value === language);
        const currentLanguageImage = currentLanguage && currentLanguage.image;
        return (
            <div className="menu">
                <Navbar id="menu-st">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#home">News Api App</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullLeft>
                            <MenuItem item={items && items[0]} onClick={this.onClick}/>
                            <NavDropdown eventKey={3} title={formatMessage(messages.topics)} id="basic-nav-dropdown">
                                {items && items.map((item)=> {
                                    return <MenuItem item={item} onClick={this.onClick}/>
                                })}
                            </NavDropdown>
                        </Nav>
                        <Navbar.Form pullRight>
                            {children}
                        </Navbar.Form>
                        <Nav pullRight>
                            <NavDropdown
                                className="languages"
                                title={<span>
                                    <img src={currentLanguageImage} />
                                    <span>{formatMessage(messages.lang)}</span>
                                </span>}
                                id="basic-nav-dropdown"
                            >
                                {languages && languages.map((item)=> {
                                    return <BMenuItem onClick={this.changeLanguage.bind(this, item.value)}>
                                        <img src={item.image} />
                                        <span>{item.label}</span>
                                    </BMenuItem>
                                })}
                            </NavDropdown>
                            <NavItem eventKey={1} href="#"  onClick={this.toggleTheme}>
                                <span>{this.props.theme === "light" ? formatMessage(messages.themeLight): formatMessage(messages.themeDark)}</span>
                                <Glyphicon glyph="adjust" />
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>

                </Navbar>
                {/*<Form*/}
                    {/*onQueryChanged={this.onQueryChanged}*/}
                {/*/>*/}

            </div>
        )
    }
}
const mapStateToProps = state => ({
    theme: state.theme.theme,
    language: state.language.language,
});
const mapDispatchToProps = dispatch => ({
    changeTheme: (value) => dispatch(changeTheme(value)),
    changeLanguage: (value) => dispatch(changeLanguage(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Menu));