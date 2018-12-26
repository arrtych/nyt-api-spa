import React from "react";
import PropTypes from 'prop-types';
import Article from './Article';
import {Grid, Row} from "react-bootstrap";

class ArticlesList extends React.Component {
    static propTypes = {
        articles: PropTypes.array.isRequired

    };
    constructor(){
        super();
        this.state = {
            search: ''
        };
    }


    updateSearch(e) {
        this.setState({
            search: e.target.value
        });
        console.log("s ",this.state.search);
    }
    render() {
        let arr = [];
        const { articles } = this.props;
        arr = [
            {
                color: "red",
                value: "#f00"
            },
            {
                color: "green",
                value: "#0f0"
            },
            {
                color: "blue",
                value: "#00f"
            },
            {
                color: "cyan",
                value: "#0ff"
            },
            {
                color: "magenta",
                value: "#f0f"
            },
            {
                color: "yellow",
                value: "#ff0"
            },
            {
                color: "black",
                value: "#000"
            }
        ];
        // console.log("arrr",arr);
        console.log("f ar",articles);
        // let filteredArticles = articles.filter(
        //     (article) => {
        //         return article.title.toLowerCase().indexOf(this.state.search) !=-1;
        //         // return article.author.startsWith("S");
        //     }
        // );
        // console.log("filter", filteredArticles);

        return (
            <Grid>
                {/*<div className="search-input">*/}
                    {/*<input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)}/>*/}
                {/*</div>*/}
                <Row className="articles-list">

                    {articles && (<ul>{articles.map((article, index) =>
                        <Article key={`article-${index}`} article={article}/>)}</ul>)}
                </Row>

            </Grid>

        )

    }

}
export default ArticlesList;