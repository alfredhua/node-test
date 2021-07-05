import React from 'react';
import ArticleApp from './article/App';
import AuthApp from './auth/App';
import DictionaryApp from './dictionary/App';
import LoginApp from './login/LoginApp';

export default class AllApp extends React.Component{
    render(){
        return (
            <div>
                    <LoginApp/>
                    <ArticleApp/>
                    <AuthApp/>
                    <DictionaryApp/> 
             </div>
        );
    }
}