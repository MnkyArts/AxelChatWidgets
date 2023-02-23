import React from 'react';
import PropTypes from 'prop-types';

class ContentView extends React.Component {
    static propTypes = {
        content: PropTypes.object.isRequired,
    }

    static defaultProps = {
        content: null,
    }

    render() {
        const content = this.props.content;
        if (!content) {
            return (
                <div>null</div>
            )
        }

        const type = content.type;
        const data = content.data;
        
        if (type === "text") {
            const text = data.text;
            return (
                <span className="textContent">{text}</span>
            )
        }
        else if (type === "image") {
            return (
                <img className="imageContent" alt="" src={data.url}></img>
            )
        }
        else if (type === "hyperlink") {
            return (
                <a className="hyperlinkContent" href={data.url}>{data.text}</a>
            )
        }

        return (
            <div>Unknown content type '{type}'</div>
        )
    }
}

class AuthorName extends React.Component {
    static propTypes = {
        author: PropTypes.object.isRequired,
    }

    static defaultProps = {
        author: null,
    }

    render() {
        const author = this.props.author;
        if (!author) {
            return (
                <span>Author is null</span>
            )
        }

        const name = author.name;
        const color = author.color;
        const backgroundColor = author.backgroundColor;

        var style = {};

        if (color !== "") {
            style.color = color;
        }

        if (backgroundColor !== "") {
            style.backgroundColor = backgroundColor;
        }

        return (
            <span className="authorName" style={style}>{name}</span>
        )
    }
}

export class MessageView extends React.Component {
    static propTypes = {
        message: PropTypes.object.isRequired,
    }

    static defaultProps = {
        message: null,
    }
    
    render() {
        const message = this.props.message;
        if (!message) {
            return (
                <div>Message is null</div>
            )
        }

        const author = message.author;
        if (!author) {
            return (
                <div>Author is null</div>
            )
        }

        return (
            <div className='message'>
                <a className='messageAuthorLink' href="#">
                    <img className="badge" alt="" src={"./images/" + author.serviceId + "-icon.svg"}></img>
                    
                    <img className="avatar" alt="" src={author.avatar}></img>

                    {author.leftBadges.map((badgeUrl, idx) => (
                        <img key={idx} className="badge" alt="" src={badgeUrl}></img>
                    ))}

                    <AuthorName author={author} />
                </a>

                {author.rightBadges.map((badgeUrl, idx) => (
                    <img key={idx} className="badge" alt="" src={badgeUrl}></img>
                ))}

                {message.contents.map((content, idx) => (
                    <ContentView key={idx} content={content} />
                ))}
            </div>
        )
    }
}

export class MessagesListView extends React.Component {
    static propTypes = {
        messages: PropTypes.array.isRequired,
    }

    static defaultProps = {
        messages: [],
    }

    scrollToBottom = () => {
        if (this.messagesEnd !== undefined) {
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        if (this.props.messages.length === 0) {
            return (
                <img className="dummyAnimation" alt="" src="./images/cool_200_transparent.gif"></img>
            )
        }
        else {
            return (
                <div>
                    {this.props.messages.map(message => (
                        <div key={message.id}><MessageView message={message} /></div>
                    ))}
    
                    <div style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>
            )
        }
    }
}