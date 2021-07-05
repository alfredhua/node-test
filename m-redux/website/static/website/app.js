import React,{lazy,Suspense} from "react";
import { Route,withRouter } from "react-router-dom";
const BannerList = withRouter(lazy(() => import("./view/BannerList")));

export default class App extends React.Component {

  
  render() {
    return (
      <div>
        <Suspense fallback={<div>loading...</div>}>
            <Route exact  path="/website/list-banner" component={BannerList} />
        </Suspense>
      </div>
    );
  }
}