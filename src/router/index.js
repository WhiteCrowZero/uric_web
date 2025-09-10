import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        meta: {
            title: "登录中心"
        },
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
    }, {
        meta: {
            title: "Uric运维平台"
        },
        path: "/uric",
        alias: "/",
        name: "Home",
        component: () => import("../views/Base.vue"),
        children: [
            {
                meta: {
                    title: "展示中心"
                },
                path: "workbench",
                name: "ShowCenter",
                component: () => import("../views/ShowCenter.vue"),
            },            {
                meta: {
                    title: "主机管理"
                },
                path: "host",
                name: "HostManager",
                component: () => import("../views/Host.vue"),
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

// 全局守卫：路由切换时设置标题
router.afterEach((to) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = 'Uric' // 可选
    }
})


export default router;