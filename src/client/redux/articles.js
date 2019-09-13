const initionState = {
    articles: []
};

export default function articles(state = initionState, action) {
    let cloneArticles = [...state.articles];

    function requestGenerator(link, method, body={}) {
        fetch(link, {
            method: method,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .catch((err) => {
                if (err) {
                    console.log(err)
                }
            });
    }

    switch (action.type) {
        case 'getArticles':
            cloneArticles = action.payload.allArticles;
            return {
                articles: cloneArticles
            };
        case 'deleteArticle':
            cloneArticles.map((article) => {
                if (article.id === action.payload) {
                    cloneArticles.splice(cloneArticles.indexOf(article), 1);
                    requestGenerator(`/deleteArticle/${article.id}`, 'DELETE');
                }
                return null;
            });
            return {
                articles: cloneArticles
            };

        case 'addArticle':
            let randomId = new Date().getTime().toString(20) + Math.floor(Math.random() * 1000).toString(20);
            cloneArticles.push({
                id: randomId,
                title: action.payload.title,
                description: action.payload.description
            });

            requestGenerator('/addArticle', 'POST', {
                id: randomId,
                title: action.payload.title,
                description: action.payload.description
            });

            return {
                articles: cloneArticles
            };

        case 'saveArticleChanges':
            cloneArticles.map((article) => {
                if (article.id === action.payload.articleId) {
                    article.title = action.payload.articleTitle;
                    article.description = action.payload.articleDescription;
                }
                requestGenerator('/editArticle', 'POST', {
                    id: action.payload.articleId,
                    title: action.payload.articleTitle,
                    description: action.payload.articleDescription
                });
                return null;
            });
            return {
                articles: cloneArticles
            };

        default:
            return state;
    }
}
