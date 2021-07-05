import dateFilter from 'nunjucks-date-filter';
import {request} from './view';

export default function(env){
  env.addFilter('money', function(num){
    return env.filters.safe(
        num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    );
  });
  
  env.addFilter('includeurl', function(path){
  	let {url} = request;
  	if(url == "/" && path == "/"){
  		return "active"
    }
    return path != "/" && url.includes(path) ? "active" :"";;
  });
  env.addFilter('date', dateFilter);
}