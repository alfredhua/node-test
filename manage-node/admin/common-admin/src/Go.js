import {createBrowserHistory} from 'history';

export  function  go(value){
  const history=createBrowserHistory();
  history.push(value);
  history.go();
}

export function flush(){
  createBrowserHistory().go();
}

export function go_back(){
  createBrowserHistory().goBack();
}