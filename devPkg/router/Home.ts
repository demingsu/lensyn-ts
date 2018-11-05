/*********************************************************************
 * defined Home page router file
 * Created by deming-su on 2017/12/30
 *********************************************************************/

import { AsyncComponent } from "vue";
import { RouteConfig } from "vue-router";

/* 首页路由 */
const Home: AsyncComponent = (): any => {
    return import(/* webpackChunkName: "Home"*/"../pages/home/Index.vue");
};

/* 看板路由 */
const Dashboard: AsyncComponent = (): any => {
    return import(/* webpackChunkName: "Dashboard"*/"../pages/dashboard/Index.vue");
};

const routes: RouteConfig[] = [
    { path: "/home", component: Home, meta: {  layout: "ls-main-layout", requestLogin: true } },
    { path: "/dashboard", component: Dashboard, meta: {  layout: "ls-main-layout", requestLogin: true } }
];

export default routes;