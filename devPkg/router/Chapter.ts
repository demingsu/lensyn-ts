/*********************************************************************
 * defined Home page router file
 * Created by deming-su on 2017/12/30
 *********************************************************************/

import { AsyncComponent } from "vue";
import { RouteConfig } from "vue-router";

/* 线条绘制路由 */
const ChapterLine: AsyncComponent = (): any => {
    return import(/* webpackChunkName: "ChapterLine"*/"../pages/chapter/Chapter001-Line.vue");
};

/* 文字绘制路由 */
const ChapterText: AsyncComponent = (): any => {
    return import(/* webpackChunkName: "chapterText*/"../pages/chapter/Chapter001-Text.vue");
};

/* 文字绘制路由 */
const ChapterThree: AsyncComponent = (): any => {
    return import(/* webpackChunkName: "ChapterThree*/"../pages/chapter/Chapter001-Three.vue");
};

/* 文字绘制路由 */
const ChapterTwoOne: AsyncComponent = (): any => {
    return import(/* webpackChunkName: "ChapterTwoOne*/"../pages/chapter/Chapter002-One.vue");
};

/* 文字绘制路由 */
const ChapterTwoTOne: AsyncComponent = (): any => {
    return import(/* webpackChunkName: "ChapterTwoTOne*/"../pages/chapter/Chapter002-Two.vue");
};

/* 文字绘制路由 */
const ChapterTwoTTwo: AsyncComponent = (): any => {
    return import(/* webpackChunkName: "ChapterTwoTOne*/"../pages/chapter/Chapter002-Three.vue");
};

/* 文字绘制路由 */
const ChapterTwoTThree: AsyncComponent = (): any => {
    return import(/* webpackChunkName: "ChapterTwoTThree*/"../pages/chapter/Chapter002-Fourth.vue");
};

const routes: RouteConfig[] = [
    { path: "/chapter001/line", component: ChapterLine, meta: {  layout: "ls-main-layout", requestLogin: true } },
    { path: "/chapter001/text", component: ChapterText, meta: {  layout: "ls-main-layout", requestLogin: true } },
    { path: "/chapter001/three", component: ChapterThree, meta: {  layout: "ls-main-layout", requestLogin: true } },
    { path: "/chapter002/one/one", component: ChapterTwoOne, meta: {  layout: "ls-main-layout", requestLogin: true } },
    { path: "/chapter002/two/one", component: ChapterTwoTOne, meta: {  layout: "ls-main-layout", requestLogin: true } },
    { path: "/chapter002/two/two", component: ChapterTwoTTwo, meta: {  layout: "ls-main-layout", requestLogin: true } },
    { path: "/chapter002/three", component: ChapterTwoTThree, meta: {  layout: "ls-main-layout", requestLogin: true } }
];

export default routes;