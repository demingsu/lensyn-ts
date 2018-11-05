/*********************************************************************
 * Vue private main layout file
 * Created by deming-su on 2017/12/30
 *********************************************************************/

<template>
    <div class="application-container">
        <!-- 顶部导航菜单 ---start--- -->
        <ls-navigator @clickNav="onClickNav"
                      :activeMenu="activeMenu"
                      :menuCollapse="menuCollapse"
                      :navObj="navObj"/>
        <!-- 顶部导航菜单 ---end--- -->

        <!-- 左侧菜单 ---start--- -->
        <ls-menu ref="mainMenuNode"
                 @menuEvent="menuEvent"
                 :menuList="menuObj"
                 :menuCollapse="menuCollapse"
                 brand="THREE-JS"/>
        <!-- 左侧菜单 ---end--- -->

        <!-- 主体路由样式 ---start--- -->
        <div class="view-container" :class="[{'menu-collapse': menuCollapse}]">
            <router-view></router-view>
        </div>
        <!-- 主体路由样式 ---end--- -->
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from "vue-property-decorator";
    import { Navigator, Menu } from "../../components";
    import { findItemInTree } from "../../util/tool";

    import { Action, Getter } from "vuex-class";
    import { UserInfo } from "../../types/common";

    @Component({
        components: {
            "ls-navigator": Navigator,
            "ls-menu": Menu
        }
    })
    export default class MainLayout extends Vue {
        /**
         * 页面变量定义
         * @define navObj              导航栏数据对象
         * @define menuObj             左侧树数据对象
         * @define brandObj            左侧系统logo对象
         * @define menuCollapse        菜单树是否收起
         * @define activeMenu          菜单树是否收起
         */
        private navObj: any = {userName: "", infoNum: 12} as any;
        private menuObj: any[] = [];
        private brandObj: any = {img: '../images/common/brand.png', name: 'THREE-JS'} as any;
        private menuCollapse: boolean = false;
        private activeMenu: any = {id: 'activeMenuPrimaryKey'};

        /* 设置用户信息 */
        @Action("setUserInfo", { namespace: 'common' })
        private setNowUser: (info: UserInfo) => void;
        /* 获取用户信息 */
        @Getter("getUserInfo", { namespace: 'common' })
        private uInfo: UserInfo;
        /* 监听用户路径变化 */
        @Watch("$route.path")
        private onRoutePathChanged(val: string): void {
            if(this.activeMenu.id !== 'activeMenuPrimaryKey') this.resetActive();
        }

        protected mounted() {
            let currentUser: string = sessionStorage.getItem("currentUser") as string;

            this.setNowUser({id: currentUser, name: currentUser} as UserInfo);

            this.navObj = {userName: currentUser, infoNum: 12} as any;
            try {
                this.menuObj = JSON.parse(sessionStorage.getItem("menus") || "[]") as any[];
            } catch (e) {
                console.log(e);
            }

            this.$nextTick(() => {
                this.resetActive();
            });
        }

        /* navigator 点击事件 */
        private onClickNav(action: string, d?: any) {
            switch (action) {
                case "logout":
                    this.$router.push({path: '/login'});
                    break;
                case "collapse":
                    this.menuCollapse = !this.menuCollapse;
                    break;
                case "emptyMenu":
                    this.$router.push({path: '/home'});
                    break;
                case "resetMenu":
                    this.$router.push({path: d.link});
                    break;
                default:
                    break;
            }
        }

        /* menu 点击事件 */
        private menuEvent(item: any) {
            if(item.type === 'brandClick') {
                this.$router.push({path: '/home'});
            }
            if(!item.children || item.children.length < 1) {
                this.$router.push({path: item.link});
            }
        }

        /* 重置选中状态 */
        private resetActive(): void {
            let menus = JSON.parse(sessionStorage.getItem('menus') || '[]');
            let list: any[] = findItemInTree({link: this.$route.path}, menus, 'link');
            if(list.length > 0) {
                this.activeMenu = list.pop();
                (this.$refs.mainMenuNode as any).resetActiveMenu(this.activeMenu);
            }
        }
    };
</script>