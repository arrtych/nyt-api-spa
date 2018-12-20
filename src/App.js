import React from "react";
import axios from 'axios';
import Form from "./components/Form";
import Menu from "./components/Menu";
import { buildUrl } from "./utils";
import ArticlesList from "./components/ArticlesList";

const DEFAULT_FORM_SEARCH_MENU_INDEX = 0;
const API_KEY = "6ba1190f0cd84209b031da93e7a7cb6e";
//newsapi key
const api_key = "6a69c275de374ca7a1aa07bb4ce6c2f2"
const root = document.getElementById("root");

class App extends React.Component {
    state = {
        menuItems: undefined,
        title: undefined,
        fragment: undefined,
        link: undefined,
        query: '',
        articles : undefined
    };

    onMenuClick = (href) => {
        this.getData(href);
    };

    prepareArticles(json) {
        let articles = [];
        if(json.articles) {
            articles = json.articles.map((article) => ({
                author: article.author,
                image: article.urlToImage
            }));
        } else if(json.results) {
            articles = json.results.map((article) => ({
                author: article.byline.replace("by ", ""),
                images: article.multimedia.map((item) => item.url)
            }));
        }
        return articles
    }

    async getData(query) {
        // const api_call = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=3585775f387b0d0cba6c5b3dc41b8167&q=design`);
        // const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${API_KEY}&q=${query}`;
        // const url = `https://jsonplaceholder.typicode.com/users`;
        // const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=6ba1190f0cd84209b031da93e7a7cb6e`;


        // https://newsapi.org/v2/top-headlines?sources=the-washington-times&apiKey=6a69c275de374ca7a1aa07bb4ce6c2f2
        const res = await fetch (query);
        const json = await res.json();
        console.log(json);
        this.setState({
            articles: this.prepareArticles(json)
        });
    }
    async fetchMenu() {
        const res = await fetch (`/menu.json`);
        const menu = await res.json();
        const { items } = menu;
        this.setState({
            menuItems: items
        });
    }

    onQueryChanged = (e) => {
        this.setState({ query: e.target.value })
    };

    prepareFormQuery(query) {
        let { menuItems } = this.state;
        let newQuery = menuItems && menuItems[DEFAULT_FORM_SEARCH_MENU_INDEX].query;
        newQuery.params.q = query;
        return newQuery;
    }

    onSubmit = (e) => {
        if(e) e.preventDefault();
        const { query } = this.state;
        this.getData(buildUrl(this.prepareFormQuery(query)));
    };

    loadArticles() {
        this.getData(buildUrl(this.prepareFormQuery(null)));
    }

    componentDidMount() {
        this.fetchMenu().then(() => this.loadArticles());
    }


    render() {
        const { articles, menuItems } = this.state;
        console.log("articles", articles);
        return (
            <div>
                <Menu items={menuItems} onClick={this.onMenuClick} />
                <Form
                    onSubmit={this.onSubmit}
                    query={this.state.query}
                    onQueryChanged={this.onQueryChanged}
                />
                <ArticlesList articles={articles} />
            </div>
        );
    }
};
export default App;