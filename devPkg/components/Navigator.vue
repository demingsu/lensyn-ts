/*********************************************************************
* Vue private navigator file
* Created by deming-su on 2017/12/30
*********************************************************************/

<template>
    <div class="navigator-container" :class="[{'menu-collapse': menuCollapse}]">
        <div class="box">
            <div class="collapse-btn" @click="navClickEvt('collapse')"></div>
            <ul class="sys-opt">
                <li class="item" @click="navClickEvt('logout')"><i>&#xe601;</i><span>{{navObj.userName}}</span></li>
                <li class="item" @click="navClickEvt('info')"><i>&#xe611;</i><em v-if="navObj.infoNum > 0">{{navObj.infoNum}}</em></li>
            </ul>
        </div>
        <!-- 打开的标签页面标题 -->
        <div class="nav-tab">
            <div class="item" v-for="item in currentMenus" :class="[{'active': item.checked}]">
                <!-- 是否当前显示页面 -->
                <i class="state">&#xe602;</i>
                <span @click="pickupTab(item)">{{item.name}}</span>
                <!-- 主页面不能有删除图标，删除图标-->
                <i v-if="!item.primary" class="close" @click="closeTab(item)">&#xe749;</i>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {Vue, Component, Prop, Emit, Watch} from "vue-property-decorator";

    @Component({})
    export default class extends Vue {
        /**
         * 页面参数释义
         * @param currentMenus                    暂停状态对象
         */
        private currentMenus: any[] = [];

        /* 导航条数据 */
        @Prop({type: Object, required: true})
        private navObj: any;
        /* 是否收起侧边栏 */
        @Prop({type: Boolean, default: false})
        private menuCollapse: boolean;
        /* 当前选中展示数据 */
        @Prop({type: Object, required: true})
        private activeMenu: any;
        /* 导航条展示目录 */
        @Emit("clickNav")
        private navClickEvt(type: string, d?: any): void{};
        /* 监听当前选中menu对象 */
        @Watch('activeMenu')
        private onActiveMenuChanged(val: any) {
            this.contrastCache();
        }

        /* 对比缓存数据然后做一个展示数据拼接 */
        private contrastCache(): void {
            let cacheList: any[] = JSON.parse(localStorage.getItem('activeMenuData') || '[]');
            if(cacheList.length > 0) {
                let idx: number = cacheList.findIndex((oo: any) => oo.id === this.activeMenu.id);
                if(idx === -1) cacheList.push(this.activeMenu);
                cacheList.map((it: any) => {
                    it.checked = it.id === this.activeMenu.id;
                });
                this.currentMenus = cacheList;
                localStorage.setItem('activeMenuData', JSON.stringify(this.currentMenus));
            } else {
                this.currentMenus.push(this.activeMenu);
                this.currentMenus[0].checked = true;
                localStorage.setItem('activeMenuData', JSON.stringify(this.currentMenus));
            }
        }

        /* 关闭标签页面 */
        private closeTab(item: any): void {
            /* 如果主页面返回不操作 */
            if(item.primary) return;
            /* 如果有缓存数据需要进一步处理 */
            if(this.currentMenus.length > 1) {
                /* 获取到当前关闭页面menu对象并设置缓存 */
                let idx: number = this.currentMenus.findIndex((oo: any) => oo.id === item.id);
                this.currentMenus.splice(idx, 1);
                localStorage.setItem('activeMenuData', JSON.stringify(this.currentMenus));
                /* 如果当前页面是被展示页面，需要重新设置展示页面，按向前一位查找原则，没有则后一位，如果不是则重新设置本页面为选中页面 */
                if(item.checked) {
                    this.navClickEvt('resetMenu', this.currentMenus[idx > 0 ? idx -1 : idx]);
                } else {
                    this.navClickEvt('resetMenu', this.currentMenus[this.currentMenus.findIndex((oo: any) => oo.checked)]);
                }
            } else {
                this.currentMenus = [];
                localStorage.setItem('activeMenuData', '[]');
                this.navClickEvt('emptyMenu');
            }
        }

        /* 选择标签页 */
        private pickupTab(item: any): void {
            let idx: number = this.currentMenus.findIndex((oo: any) => oo.id === item.id);
            this.navClickEvt('resetMenu', this.currentMenus[idx]);
        }
    }
</script>