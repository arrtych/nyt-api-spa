import React from "react";
import PropTypes from "prop-types";
import {Button, Col} from "react-bootstrap";

class Article extends  React.Component {
    static propTypes = {
        article: PropTypes.object.isRequired
    };
    render() {
        let { article } = this.props;
        if(!article) article = {};
        const {
            author,
            image,
            images,
            description,
            title,
            url
        } = article;
        return (
            <li className="article">
                <h2>{title}</h2>
                <p><b>Author:</b> {author}</p>
                <div>
                    {image && <img src={image} />}
                    {images && (<ul>{images.map((image, index) => <li key={`image-${index}`}><img src={image} /></li>)}</ul>)}
                    <p className="description">{description}</p>
                </div>
                <Button className="read-more-btn" bsStyle="primary" bsSize="large">
                    <a href={url}>Read more</a>
                </Button>

            </li>
        )
    }
}
export default Article;