import React from "react";
import PropTypes from "prop-types";

class Article extends  React.Component {
    static propTypes = {
        article: PropTypes.object.isRequired
    };
    render() {
        let { article } = this.props;
        if(!article) article = {};
        const { author, image, images } = article;
        return (
            <li className="article">
                <h1>{author}</h1>
                <div>
                    {image && <img src={image} />}
                    {images && (<ul>{images.map((image, index) => <li key={`image-${index}`}><img src={image} /></li>)}</ul>)}
                </div>
            </li>
        )
    }
}
export default Article;