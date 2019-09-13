import React, {Component} from 'react';
import './articlesArea.css'
import Article from '../article/article'


class ArticlesArea extends Component{

    state = {
        addArticleMode: false
    };

    addArticleHandler = (event) => {
        if (event.which === 13) {
            event.preventDefault();
            this.addArticle()
        }
    };

    // добавление статьи в базу с валидацией
    addArticle = () => {
        const title = this.refs.articleTitle.value;
        const description = this.refs.articleDescription.value;

        // проверка на пустое значение
        if (title.trim() && description.trim() !== '') {
            this.props.methods.addArticle({
                title: this.refs.articleTitle.value,
                description: this.refs.articleDescription.value
            });
            // обнуление значений после добавления статьи
            this.refs.articleTitle.value = '';
            this.refs.articleDescription.value = '';
            // обнуление ошибок валидации после добавления статьи
            this.validationStyle('addArticleTitle', false);
            this.validationStyle('addArticleDescription', false);
        } else {
            // добавление и снятие ошибки валидации у заголовка
            if (title.trim() === '') {
                this.validationStyle('addArticleTitle', true);
            } else {
                this.validationStyle('addArticleTitle', false);
            }

            // добавление и снятие ошибки валидации у содержания
            if (description.trim() === '') {
                this.validationStyle('addArticleDescription', true);
            } else {
                this.validationStyle('addArticleDescription', false);
            }
        }
    };

    // функция добавляющая стилизацию ошибкам валидации
    validationStyle = (className, bool) => {
        const formElem = document.getElementsByClassName(className)[0];
        if (bool === true) {
            formElem.classList.add('errorValidationInAddForm');
        } else {
            formElem.classList.remove('errorValidationInAddForm');
        }

    };

    // включение мода добавления статьи
    switchAddMode = () => {
        this.setState({
            addArticleMode: !this.state.addArticleMode
        });
    };

    // отображение мода добавления статьи
    renderAddMode = () => {
        return(
            <div>
                <div className='addArticle'>
                    <textarea className='addArticleTitle' onKeyPress={this.addArticleHandler} ref='articleTitle' placeholder='заголовок'/>
                    <textarea className='addArticleDescription' onKeyPress={this.addArticleHandler} ref='articleDescription' placeholder='содержание'/>
                    <i className="fas fa-plus" onClick={this.addArticle}/>
                </div>
                {this.renderDefaultMode()}
            </div>
        )
    };

    // дефолтный вид приложения
    renderDefaultMode = () => {
        return(
            <div className='area'>
                {this.props.articles.allArticles.articles.map((article) => {
                    return (
                        <Article className='article'
                                 articleData={article}
                                 methods={this.props}
                                 key={article.id}
                        />
                    )
                })
                }
            </div>
        )
    };

    render () {
        return (
        <div>
            <div className='switch'>
                <i className="fas fa-plus" onClick={this.switchAddMode}/>
            </div>
        {this.state.addArticleMode === false ?
            this.renderDefaultMode() :
            this.renderAddMode()
        }
        </div>
        )
    }
}

export default ArticlesArea;
