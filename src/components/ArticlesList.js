import React from "react";
import PropTypes from 'prop-types';
import Article from './Article';

class ArticlesList extends React.Component {
    static propTypes = {
        articles: PropTypes.array.isRequired
    };
    render() {
        const { articles } = this.props;
        return (
            <div className="articles-list">
                {articles && (<ul>{articles.map((article, index) => <Article key={`article-${index}`} article={article}/>)}</ul>)}
            </div>
        )

    }

}
export default ArticlesList;