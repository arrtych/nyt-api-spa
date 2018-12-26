import React from "react";
import Form from "./components/Form";
import Menu from "./components/Menu";
import { buildUrl } from "./utils";
import ArticlesList from "./components/ArticlesList";
import load from './load';
import PropTypes from "prop-types";


const DEFAULT_FORM_SEARCH_MENU_INDEX = 3;
const API_KEY = "6ba1190f0cd84209b031da93e7a7cb6e";
//newsapi key
const api_key = "6a69c275de374ca7a1aa07bb4ce6c2f2"
const root = document.getElementById("root");

// // const sourceSelector = document.querySelector("#sourceSelector");
// const dropdown = document.getElementById('sourceSelector');

class App extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired

    };
    state = {
        menuItems: undefined,
        title: undefined,
        query: '',
        articles : undefined,
        sources : undefined,
        search: '',
        data: null
    };


    onMenuClick = (href) => {
        this.getData(href);
    };

    prepareArticles(json) {
        let articles = [];
        if(json.articles) {
            articles = json.articles.map((article) => ({
                author: article.author,
                image: article.urlToImage,
                title: article.title,
                description: article.description,
                url: article.url
            }));
        } else if(json.results) {
            articles = json.results.map((article) => ({
                author: article.byline.replace("by ", ""),
                images: article.multimedia.map((item) => item.url),
                title: article.title
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
        console.log("json",json);
        this.setState({
            articles: this.prepareArticles(json)
        });

        const t = await fetch(`http://newsapi.org/v1/sources`);
        const js = await t.json();
        console.log("test newsapi", js);
        this.setState({
            sources: js
        });
        // document.getElementById("sourceSelector").innerHTML= js.sources.map(src => <option value="${src.id}">${src.name}</option>);

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
        if(query) newQuery.params.q = query;
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
    loadData() {
        load(this.props.data).then(users => {
            this.setState({
                data: JSON.parse(users)
            });
        });
    }



    componentDidMount() {
        this.fetchMenu().then(() => this.loadArticles());
        // this.loadData();
        // console.log("data",this.state.sources);
        // {this.state.sources.map((article) => <option key={article.id} value={article.name}>{article.name}</option>)}
    }



    render() {
        const { articles, menuItems,  } = this.state;
        console.log("articles", articles);
        return (
            <div>
                <Menu items={menuItems} onClick={this.onMenuClick} />
                <Form
                    onSubmit={this.onSubmit}
                    // query={this.state.query}
                    onQueryChanged={this.onQueryChanged}
                />

                <ArticlesList articles={articles} />
            </div>
        );
    }
};
export default App;