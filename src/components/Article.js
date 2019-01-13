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
            url,
            publishedAt,
            content
        } = article;

        var articleDate = publishedAt;
        if(articleDate){
            var modifiedDate = articleDate.substring(0, 10) + " "+ articleDate.substring(11, 19);
        }

        // var contentNew = content;
        // var modifiedContent = contentNew.substring(0,5);
        return (
            <li className="article article-st-light">
                {/*<Col xs={6} md={6}>*/}

                    <h4>{title}</h4>
                    <p><b>Author:</b> {author}</p>
                    <p><b>Date:</b> {modifiedDate}</p>
                    <div>
                        {image && <img src={image} />}
                        {images && (<ul>{images.map((image, index) => <li key={`image-${index}`}><img src={image} /></li>)}</ul>)}
                        <p className="description"><b>Description:</b> {description}</p>
                    </div>

                    <Button className="read-more-btn pull-right" bsStyle="warning" bsSize="small">
                        <a href={url}>Read more ...</a>
                    </Button>
                {/*</Col>*/}
            </li>
        )
    }
}
export default Article;