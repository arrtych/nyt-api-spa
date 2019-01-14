import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import {Button, Panel, Col} from "react-bootstrap";
import {injectIntl, defineMessages} from "react-intl";

const messages = defineMessages({
    readMore: {
        id: 'button.read-more',
        defaultMessage: 'Read more ...'
    },
    title: {
        id: 'article.title',
        defaultMessage: 'Title'
    },
    author: {
        id: 'article.author',
        defaultMessage: 'Author'
    },
    date: {
        id: 'article.date',
        defaultMessage: 'Date'
    },
    source: {
        id: 'article.source',
        defaultMessage: 'Source'
    },
    description: {
        id: 'article.description',
        defaultMessage: 'Description'
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
            source,
            image,
            images,
            title,
            url,
            publishedAt,
        } = article;

        var articleDate = publishedAt;
        let modifiedDate;
        let content;
        if(articleDate){
            modifiedDate = moment(articleDate).format("MMMM Do YYYY, h:mm:ss a");
        }
        if(article.description){
            content = article.description;
        } else if(article.content){
            content = article.content;
        }

        // var contentNew = content;
        // var modifiedContent = contentNew.substring(0,5);
        return (
            <Panel className="article">
                <Panel.Heading>
                    <h3 dangerouslySetInnerHTML={{__html: title}}></h3>
                </Panel.Heading>
                <Panel.Body>
                    {author && (<p>
                        <b>{formatMessage(messages.author)}</b> <div dangerouslySetInnerHTML={{__html: author}}></div>
                    </p>)}
                    {source && (<p>
                        <b>{formatMessage(messages.source)}</b> <div dangerouslySetInnerHTML={{__html: source}}></div>
                    </p>)}
                    <p><b>{formatMessage(messages.date)}</b> {modifiedDate}</p>
                    <div>
                        {image && <img src={image} />}
                        {images && (<ul>{images.map((image, index) => <li key={`image-${index}`}><img src={image} /></li>)}</ul>)}
                        <p className="description"><b>{formatMessage(messages.description)}</b> <div dangerouslySetInnerHTML={{__html: content}}></div></p>
                    </div>

                    <Button className="read-more-btn pull-right" bsStyle="warning" bsSize="small">
                        <a href={url} target="_blank" rel="noopener noreferrer">{formatMessage(messages.readMore)}</a>
                    </Button>
                </Panel.Body>
            </Panel>
        )
    }
}
export default injectIntl(Article);