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
        filteredArticles: undefined,
        sources : undefined,
        search: '',
        data: null
    };


    onMenuClick = async (href) => {
        const articles = await this.getData(href);
        this.setState({
            articles,
            filteredArticles: articles
        });
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
        return this.prepareArticles(json);
        //
        // const t = await fetch(`http://newsapi.org/v1/sources`);
        // const js = await t.json();
        // console.log("test newsapi", js);
        // this.setState({
        //     sources: js
        // });
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
        const query = e.target.value;
        this.setState({ query });
        if(query === "") {
            this.setState((state) => ({
                filteredArticles: state.articles
            }));
        } else {
            // const articles = await this.getData(buildUrl(this.prepareFormQuery(query)));
            this.setState((state) => ({
                filteredArticles: state.articles.filter(this.filterArticles)
            }));
        }
    };


    prepareFormQuery(query) {
        let { menuItems } = this.state;
        let newQuery = menuItems && menuItems[DEFAULT_FORM_SEARCH_MENU_INDEX].query;
        if(query) newQuery.params.q = query;
        return newQuery;
    }

    filterArticles = (article, index, array) => {
        const { query } = this.state;
        if(!article) return false;

        const keys = ["author","title","description","url","urlToImage","publishedAt","content"];
        for (const key of keys) {
            if(!article[key]) continue;
            if(article[key].indexOf(query) !== -1) {
                return true;
            }
        }
    };

    onSubmit = async (e) => {
        if(e) e.preventDefault();

    };

    async loadArticles() {
        const articles = await this.getData(buildUrl(this.prepareFormQuery(null)));
        this.setState({
            articles,
            filteredArticles: articles
        });
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
    }



    render() {
        const { filteredArticles, menuItems,  } = this.state;
        return (
            <div>
                <Menu items={menuItems} onClick={this.onMenuClick} />
                <Form
                    onSubmit={this.onSubmit}
                    // query={this.state.query}
                    onQueryChanged={this.onQueryChanged}
                />

                <ArticlesList articles={filteredArticles} />
            </div>
        );
    }
};
export default App;