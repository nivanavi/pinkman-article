import React, {Component} from 'react';
import './article.css'
import {Link} from 'react-router-dom'

class Article extends Component{

    state = {
        editMode: false
    };

    // удаление статьи
    deleteArticle = () => {
        this.props.methods.methods.deleteArticle(this.props.articleData.id)
    };

    // включение мода изменения статьи
    editArticle = () => {
        this.setState({
            editMode: true
        })
    };

    // отмена реадактирования
    cancelEdit = () => {
        this.setState({
            editMode: false
        });
        this.errorValidation(this.props.articleData.id,false);
    };

    // сохранение изменений с валидацией
    saveChanges = () => {
        const title = this.refs.title.value;
        const description =this.refs.description.value;

        // проверка на пустое значение
        if (title.trim() && description.trim() !== '') {
            if (title !== this.props.articleData.title || description !== this.props.articleData.description) {
                this.props.methods.methods.saveArticleChanges({
                    articleId: this.props.articleData.id,
                    articleTitle: title,
                    articleDescription: description
                });
                this.setState({
                    editMode: false
                });

                // удаление стилей ошибки валидации
                this.errorValidation(this.props.articleData.id,false);
            } else {
                // добавление стилей ошибки валидации при попытке сохранить тот же заголовок и содержание
                this.errorValidation(this.props.articleData.id,true);
            }
        } else {
            // добавление стилей ошибки валидации при пустом значении
            this.errorValidation(this.props.articleData.id,true);
        }
    };

    // вызывать при ошибке валидации
    errorValidation = function(id ,bool) {
        const errorArticle = document.getElementById(id);

        if (bool === true) {
            errorArticle.classList.add('errorValidation')
        } else {
            errorArticle.classList.remove('errorValidation')
        }
    };

    // отображение мода редактирования статьи
    renderEditMode = () => {
        return(
            <div className='article' id={this.props.articleData.id}>
                <div className='title'>
                    <input className='editTitle' ref='title' defaultValue={this.props.articleData.title}/>
                    <div>
                    <i className="fas fa-save" onClick={this.saveChanges}/>
                    <i className="fas fa-edit" onClick={this.cancelEdit} />
                    <i className="fas fa-trash" onClick={this.deleteArticle}/>
                    </div>
                </div>
                    <textarea className='editDescription' ref='description' defaultValue={this.props.articleData.description}/>
            </div>
        )
    };

    // дефолтный вид статьи
    renderDefaultMode = () => {
        return(
            <div className='article' id={this.props.articleData.id}>
                <div className='title'>
                    <span><Link to={`/${this.props.articleData.id}`}>{this.props.articleData.title}</Link></span>
                    <div>
                    <i className="fas fa-edit" onClick={this.editArticle}/>
                    <i className="fas fa-trash" onClick={this.deleteArticle}/>
                    </div>
                </div>
                <div className='description'>
                <p>{this.props.articleData.description}</p>
                </div>
            </div>
        )
    };

    render () {
        return this.state.editMode === false ?
           this.renderDefaultMode() :
            this.renderEditMode()
    }

}

export default Article;
