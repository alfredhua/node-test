import React from 'react';
import ArticleApp from './article/App';
import AuthApp from './auth/App';
import DictionaryApp from './dictionary/App';
import LoginApp from './auth/LoginApp';
import Navigation from 'common-admin/src/naviagte/Navigation';

export default class AllApp extends React.Component{
    render(){
        return (
            <div>
                <LoginApp/>
                {/* <Navigation>
                    <ArticleApp/>
                    <AuthApp/>
                    <DictionaryApp/>
                </Navigation>     */}
             </div>
        );
    }
}