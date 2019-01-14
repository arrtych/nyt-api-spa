import React from "react";
import Form from "./components/Form";
import Menu from "./components/Menu";
import { buildUrl } from "./utils";
import ArticlesList from "./components/ArticlesList";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import load from './load';
import PropTypes from "prop-types";
import {Button, Grid, Row} from "react-bootstrap";
import translations from "./i18n/locales"
import {injectIntl, IntlProvider} from 'react-intl';
import {changeLanguage} from "./actions/language";
import {connect} from "react-redux";
import {changeTheme} from "./actions/theme";
import {query} from "./actions/query";
import menuJson from "./menu.json";


const DEFAULT_FORM_SEARCH_MENU_INDEX = 3;
const DEFAULT_PER_PAGE = 20;
const API_KEY = "6ba1190f0cd84209b031da93e7a7cb6e";
//newsapi key
const api_key = "6a69c275de374ca7a1aa07bb4ce6c2f2"
const root = document.getElementById("root");

// // const sourceSelector = document.querySelector("#sourceSelector");
// const dropdown = document.getElementById('sourceSelector');
class App extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired,
        query: PropTypes.string,
    };
    constructor(props) {
        super(props);
        const menuItems = menuJson.items;
        this.filterMenu(menuItems);
        this.state = {
            menuItems: menuItems,
            title: undefined,
            articles : undefined,
            filteredArticles: undefined,
            sources : undefined,
            search: '',
            lastUrl: '',
            currentPage: 1,
            pagesNum: 1,
            loading: false,
            perPage: DEFAULT_PER_PAGE,
            data: null,
        };
    }
    onMenuClick = async (href) => {
        const articles = await this.getData(href);
        this.setState({
            articles,
            lastUrl: href,
            filteredArticles: articles
        });
    };

    prepareArticles(json) {
        let articles = [];
        const { perPage } = this.state;
        let resultsNum = json.num_results || json.totalResults;
        let pagesNum = null;
        if(json.articles) {
            articles = json.articles.map((article) => ({
                author: article.author,
                source: article.source.name,
                image: article.urlToImage,
                title: article.title,
                description: article.description,
                url: article.url,
                publishedAt: article.publishedAt,
                content: article.content

            }));
        } else if(json.results) {
            articles = json.results.map((article) => ({
                author: article.byline.replace("by ", ""),
                images: article.multimedia.map((item) => item.url),
                title: article.title
            }));
        } else if(json.response) {
            if(json.response.docs) {
                articles = json.response.docs.map((article) => ({
                    author: article.source,
                    images: article.multimedia.map((item) => item.url),
                    title: article.headline.main,
                    description: article.snippet,
                }));
            }
            if(json.response.meta) {
                resultsNum = json.response.meta.hits;
            }
        }
        if(articles.length === resultsNum) {
            pagesNum = 1;
        }
        if(resultsNum) {
            if(pagesNum !== 1) {
                pagesNum = Math.ceil(resultsNum / perPage)
            }
            this.setState({
                pagesNum
            });
        }
        return articles
    }

    async getData(query) {
        try {
            // copyright: "Copyright (c) 2018 The New York Times Company. All Rights Reserved."
            // response: {docs: [{web_url: "https://www.nytimes.com/2018/12/26/opinion/letters/trump-santa.html",…},…],…}
            // docs: [{web_url: "https://www.nytimes.com/2018/12/26/opinion/letters/trump-santa.html",…},…]
            // 0: {web_url: "https://www.nytimes.com/2018/12/26/opinion/letters/trump-santa.html",…}
            // 1: {web_url: "https://topics.nytimes.com/top/news/business/companies/santa-lucia-bancorp/index.html",…}
            // 2: {,…}
            // 3: {,…}
            // 4: {web_url: "https://www.nytimes.com/2018/12/25/us/politics/trump-santa-claus-believer.html",…}
            // 5: {,…}
            // 6: {web_url: "https://topics.nytimes.com/topic/company/santa-fe-gold-corporation",…}
            // 7: {,…}
            // 8: {,…}
            // 9: {web_url: "https://www.nytimes.com/2018/05/19/us/texas-school-shooting-victims.html",…}
            // meta: {hits: 153159, offset: 10, time: 34}
            // status: "OK"


            // const api_call = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=3585775f387b0d0cba6c5b3dc41b8167&q=design`);
            // const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${API_KEY}&q=${query}`;
            // const url = `https://jsonplaceholder.typicode.com/users`;
            // const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=6ba1190f0cd84209b031da93e7a7cb6e`;
            // https://newsapi.org/v2/top-headlines?sources=the-washington-times&apiKey=6a69c275de374ca7a1aa07bb4ce6c2f2
            this.setState({
                loading: true
            });
            const res = await fetch(query);
            const json = await res.json();
            this.setState({
                loading: false
            });
            return this.prepareArticles(json);
        } catch (err) {
            console.error(err);
            this.setState({
                loading: false
            });
            return [];
        }
        //
        // const t = await fetch(`http://newsapi.org/v1/sources`);
        // const js = await t.json();
        // console.log("test newsapi", js);
        // this.setState({
        //     sources: js
        // });
        // document.getElementById("sourceSelector").innerHTML= js.sources.map(src => <option value="${src.id}">${src.name}</option>);

    }




    // async fetchMenu() {
    //     const res = await fetch (`/menu.json`);
    //     const menu = await res.json();
    //     const { items } = menu;
    //     this.filterMenu(items);
    //     // this.setState({
    //     //     menuItems: items
    //     // });
    // }

    onQueryChanged = (e) => {
        const { articles } = this.state;
        let query;
        if(e && e.target && e.target.value) {
            query = e.target.value;
            this.setState({ query });
        } else {
            query = e;
        }
        console.log("onQueryChanged", query);
        if(query === "") {
            this.setState((state) => ({
                filteredArticles: state.articles
            }));
        } else {
            const filteredArticles = articles.map(this.filterArticles).filter(Boolean);
            // const articles = await this.getData(buildUrl(this.prepareFormQuery(query)));
            console.log("SEARCH filteredArticles", filteredArticles);
            this.setState((state) => ({
                filteredArticles
            }));
        }
    };


    prepareFormQuery(query, page = 0) {
        let { menuItems } = this.state;
        let newQuery = menuItems && menuItems[DEFAULT_FORM_SEARCH_MENU_INDEX].query;
        if(query) newQuery.params.q = query;
        if(page >= 0) newQuery.params.page = page;
        return newQuery;
    }


    wordHighlight = (text, searchText) => {
        let innerHTML = searchText;
        const index = innerHTML.toLowerCase().indexOf(text);
        if (index >= 0) {
            innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
            searchText = innerHTML;
        }
        return searchText;
    };

    filterArticles = (article, index, array) => {
        let newArticle = {...article};
        const { query } = this.props;
        if(!article) return false;
        const keys = ["author","title","description","content"];
        let notFound = true;
        for (const key of keys) {
            newArticle[key] = article[key];
            if(!article[key] || !query) {
                continue;
            }
            if(article[key].toLowerCase().indexOf(query.toLowerCase()) !== -1) {
                newArticle[key] = this.wordHighlight(query.toLowerCase(), article[key]);
                notFound = false;
            }
        }
        if(notFound) return null;
        return newArticle;
    };

    onSubmit = async (e) => {
        if(e) e.preventDefault();
        this.onQueryChanged();
    };

    refetchArticles = async () => {
        const { lastUrl, currentPage } = this.state;
        let href = lastUrl;
        if (currentPage) href = `${href}&page=${currentPage}`
        const articles = await this.getData(href);
        this.setState({
            articles,
            filteredArticles: articles
        });
    };

    async loadArticles() {
        const articles = await this.getData(buildUrl(this.prepareFormQuery(null)));
        this.setState({
            articles,
            filteredArticles: articles
        });
        // this.isotope = new Isotope( '.articles-list', { // eslint-disable-line
        //     itemSelector: '.article',
        //     layoutMode: 'fitRows'
        // });
    }

    loadData() {
        load(this.props.data).then(users => {
            this.setState({
                data: JSON.parse(users)
            });
        });
    }

    onPageChanged = (page, e) => {
        this.setState({
            currentPage: page,
        });
        this.refetchArticles().then(() => {

        });
    };
    setTheme = () => {
        const { theme } = this.props;
        if(theme) document.body.className = `${this.props.theme}-theme`;
    };
    componentDidMount() {
        // this.fetchMenu().then(() => this.loadArticles());
        this.loadArticles();
        // this.onThemeChange(theme);
        this.setTheme();
        this.filterMenu();
    }

    filterMenu = (menuItems = false) => {
        if(!menuItems) menuItems = this.state.menuItems;
        this.setState((state, props) => ({
            ...menuItems && { menuItems: menuItems.map((menuItem) => ({
                ...menuItem,
                ...props.language === "ru" && menuItem.label_ru && {
                    label: menuItem.label_ru,
                    label_en: menuItem.label,
                },
                ...props.language === "en" && {
                    label: menuItem.label_en || menuItem.label
                }
            })) }
        }));
    };

    componentDidUpdate(prevProps) {
        if (this.props.theme !== prevProps.theme) {
            this.setTheme();
        }
        if (this.props.query !== prevProps.query) {
            this.onQueryChanged(this.props.query);
        }
        if (this.props.language !== prevProps.language) {
            this.filterMenu();
        }
    }

    render() {
        const { filteredArticles, menuItems, currentPage, pagesNum, loading } = this.state;
        const { language } = this.props;
        const locale = language || "en";
        const messages = translations[locale];
        console.log("LANGUAGE", locale);
        return (
            <IntlProvider locale={locale} key={locale} messages={messages}>
                <div>
                    <Grid className="menu-style" id="menu-style">
                        <Menu items={menuItems} onClick={this.onMenuClick}>
                            <Form
                                onSubmit={this.onSubmit}
                                // query={this.state.query}
                                onQueryChanged={this.onQueryChanged}
                            />
                        </Menu>
                        <div className="sub-header">
                            <Pagination current={currentPage} pages={pagesNum} onPageChanged={this.onPageChanged} />
                            <Loader loading={loading} />
                        </div>
                    </Grid>
                    <ArticlesList articles={filteredArticles} />
                    {filteredArticles && filteredArticles.length && (<Grid>
                        <Pagination current={currentPage} pages={pagesNum} onPageChanged={this.onPageChanged} />
                    </Grid>)}
                </div>
            </IntlProvider>
        );
    }
}
const mapStateToProps = state => ({
    language: state.language.language,
    theme: state.theme.theme,
    query: state.query.query,
});
const mapDispatchToProps = dispatch => ({
    makeQuery: (value) => dispatch(query(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);