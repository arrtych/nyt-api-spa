import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {FormattedMessage, defineMessages, injectIntl} from 'react-intl';
import MenuItem from './MenuItem';
import { changeTheme } from './../actions/theme';
import { changeLanguage } from './../actions/language';
import {
    Button,
    ButtonToolbar,
    Nav,
    Navbar,
    NavDropdown,
    MenuItem as BMenuItem,
} from "react-bootstrap";
import Form from "./Form";

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
        }, {
            value: "en",
            label: "English",
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
        const themeStyle = document.getElementById("theme-style");
        var articles = document.querySelectorAll("#articles-list > .article");
        console.log("themeStyle", themeStyle);
        if(theme === "dark") {
            themeStyle.href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
            newTheme = "light";
            for (var i =0; i< articles.length;i++){
                articles[i].classList.add("article-st-light");
                articles[i].classList.remove("article-st-dark");
            }
            document.body.className = "body-light";
            console.log("themeStyle", "light");

        } else if (theme === "light") {
            themeStyle.href = "https://bootswatch.com/3/darkly/bootstrap.min.css";
            newTheme = "dark";
            for (var i =0; i< articles.length;i++){
                articles[i].classList.add("article-st-dark");
                articles[i].classList.remove("article-st-light");
            }
            document.body.className = document.body.className.replace("body-light","");
            console.log("themeStyle", "dark");
            // document.body.style.setProperty('background-color', '#222');
            // document.body.style.setProperty('color', 'white');
            // for (var i =0; i< articles.length;i++){
            //     articles[i].style.backgroundColor = "#303030";
            //     articles[i].style.borderColor = "#303030";
            // }

        }
        this.props.changeTheme(newTheme);
    };

    changeLanguage = (language, e) => {
        console.log("language, e", language, e);
        e.preventDefault();
        this.props.changeLanguage(language);
    };
    render() {
        const { items, children, intl:{formatMessage} } = this.props;
        const { languages } = this.state;
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
                            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
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
                                    <img src={`/assets/img/flag-${this.props.language}.png`} />
                                    <span>{formatMessage(messages.lang)}</span>
                                </span>}
                                id="basic-nav-dropdown"
                            >
                                {languages && languages.map((item)=> {
                                    return <BMenuItem onClick={this.changeLanguage.bind(this, item.value)}>
                                        <img src={`/assets/img/flag-${item.value}.png`} />
                                        <span>{item.label}</span>
                                    </BMenuItem>
                                })}
                            </NavDropdown>
                        </Nav>
                        <Button id="theme-btn" className={`theme-btns ${this.props.theme}-th`} onClick={this.toggleTheme}>
                            {this.props.theme === "light" ? formatMessage(messages.themeLight): formatMessage(messages.themeDark)}
                        </Button>
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