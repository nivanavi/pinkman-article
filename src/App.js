import React, { Component } from 'react';
import './App.css';
import ArticlesArea from './client/components/articlesArea/articlesArea'
import {connect} from "react-redux";
import {BrowserRouter, Route} from 'react-router-dom'
import ArticleById from './client/components/articleById/articleById'


class App extends Component {

    // запрос на получение всех статей из базы
    componentDidMount() {
        fetch('/getArticles')
            .then(res => res.json())
            .then(articles => this.props.getArticles({allArticles: articles}))
            .catch((err) => {
                if (err) {
                    console.log(err)
                }
            });
    }



    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Route exact path='/' component={() => {return (
                        <ArticlesArea
                            articles={this.props}
                            methods={this.props}
                        />
                    )}}/>
                    <Route path='/:id' component={ArticleById}/>
                </div>
            </BrowserRouter>
        );
    }

}

function mapStateToProps(state) {
    return {
        allArticles: state.articles
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteArticle: (articleId) => dispatch({
            type: 'deleteArticle',
            payload: articleId
        }),
        addArticle: (article) => dispatch({
            type: 'addArticle',
            payload: article
        }),
        saveArticleChanges: (articleData) => dispatch({
            type: 'saveArticleChanges',
            payload: articleData
        }),
        getArticles: (articles) => dispatch({
            type: 'getArticles',
            payload: articles
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
