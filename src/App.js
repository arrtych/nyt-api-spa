import React from "react";
import axios from 'axios';
import Form from "./components/Form";
import Article from "./components/Article";

const API_KEY = "3585775f387b0d0cba6c5b3dc41b8167";
const QUERY = "design";


class App extends React.Component {
    state = {
        title: undefined,
        fragment: undefined,
        link: undefined,
        query: ''
    };

    getData = async (e) => {
        e.preventDefault();

        const query = this.state.query;
        // const api_call = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=3585775f387b0d0cba6c5b3dc41b8167&q=design`);
        // const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${API_KEY}&q=${query}`;
        // const url = `https://jsonplaceholder.typicode.com/users`;
        const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=6ba1190f0cd84209b031da93e7a7cb6e`;

        axios.get(url, {
            headers: { 'Access-Control-Allow-Origin': '*' }
        })
            .then(data => {
                console.log('DATA:', data);
            })
            .catch(err => console.log('ERR:', err));

        return;
        try {
            // 'Access-Control-Allow-Origin':'*',
            const api_call = await fetch(
                `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${API_KEY}&q=${query}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                }
            );
            const data = await api_call.json();
            // var title = data.response.docs.headline.main;
            const found = data.response.docs.find(function(e) {
                return e;
            });
            console.log(found.headline.main);
            this.setState({
                title: found.headline.main,
                fragment: found.snippet,
                link: found.web_url
            });
        } catch (err) {
            console.log(err);
        }



    };

    onQueryChanged = (e) => {
        this.setState({ query: e.target.value })
    };

    render() {
        return (
            <div>
                <Form
                    getData={this.getData}
                    query={this.state.query}
                    onQueryChanged={this.onQueryChanged}
                />
                <Article
                    title={this.state.title}
                    fragment={this.state.fragment}
                    link={this.state.link}
                />
            </div>
        );
    }
};
export default App;