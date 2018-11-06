import React from "react";
import Form from "./components/Form";
import Article from "./components/Article";

const API_KEY = "3585775f387b0d0cba6c5b3dc41b8167";
const QUERY = "design";


class App extends React.Component {
    state = {
        title: undefined,
        fragment: undefined,
        link: undefined
    }
    getData = async (e) => {
        // e.preventDefault();
        // const query = e.target.elements.query.value;
        const api_call = await fetch("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=6ba1190f0cd84209b031da93e7a7cb6e&q=design");
        // await fetch(https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${API_KEY}&q=${QUERY});
        const data = await api_call.json();
        // var title = data.response.docs.headline.main;
        var found = data.response.docs.find(function(e) {
            return e;
        });
        console.log(found.headline.main);
        this.setState({
            title: found.headline.main,
            fragment: found.snippet,
            link: found.web_url
        });

    }
    render() {
        return (
            <div>
                <Form getData={this.getData()}/>
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