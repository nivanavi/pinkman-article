import React, { Component } from 'react';
import './articleById.css'

class ArticleById extends Component {

    state = {
       article: ''
    };

    // запрос на получение одной статьи по id
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(`/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                article: data[0]
            })})
            .catch((err) => {
                if (err) {
                    console.log(err)
                }
            });
    }



    render() {
        return (
            <div className='oneArticle'>
                <span className='oneArticleTitle'>{this.state.article.title}</span>
                <p className='oneArticleDescription'>{this.state.article.description}</p>
            </div>
        );
    }

}


export default ArticleById;
