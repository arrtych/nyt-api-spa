import React from "react";
import PropTypes from "prop-types";
import {Button, Panel, Col} from "react-bootstrap";
import {injectIntl, defineMessages} from "react-intl";

const messages = defineMessages({
    readMore: {
        id: 'button.read-more',
        defaultMessage: 'Read more ...'
    },
});

class Article extends  React.Component {
    static propTypes = {
        article: PropTypes.object
    };
    render() {
        let { article, intl:{formatMessage} } = this.props;
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
            <Panel className="article">
                <Panel.Heading>
                    <div dangerouslySetInnerHTML={{__html: title}}></div>
                </Panel.Heading>
                <Panel.Body>
                    <p><b>Author:</b> <div dangerouslySetInnerHTML={{__html: author}}></div></p>
                    <p><b>Date:</b> {modifiedDate}</p>
                    <div>
                        {image && <img src={image} />}
                        {images && (<ul>{images.map((image, index) => <li key={`image-${index}`}><img src={image} /></li>)}</ul>)}
                        <p className="description"><b>Description:</b> <div dangerouslySetInnerHTML={{__html: description}}></div></p>
                    </div>

                    <Button className="read-more-btn pull-right" bsStyle="warning" bsSize="small">
                        <a href={url}>{formatMessage(messages.readMore)}</a>
                    </Button>
                </Panel.Body>
            </Panel>
        )
    }
}
export default injectIntl(Article);