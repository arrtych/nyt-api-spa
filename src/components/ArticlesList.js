import React from "react";
import PropTypes from 'prop-types';
import Article from './Article';
import {Col, Grid, Row} from "react-bootstrap";

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

        console.log("article list",articles);
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
                <Row className="show-grid">
                    {articles && (<Col md={12}  className="articles-list col" id="articles-list" >{articles.map((article, index) =>
                        <Article key={`article-${index}`}  article={article}/>)}</Col>)}
                </Row>

            </Grid>

        )

    }

}
export default ArticlesList;