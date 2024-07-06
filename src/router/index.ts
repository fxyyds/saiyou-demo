import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "首页",
        component: () => import("../pages/HomePage/HomePage.vue"),
    },
    {
        path: "/my_info",
        name: "我的信息",
        component: () => import("../pages/MyInfoPage/MyInfoPage.vue"),
    }, {
        path: "/user/exit",
        name: "修改资料",
        component: () => import("../pages/user/ExitUserInfo.vue"),
    },
    {
        path: "/my/favour",
        name: "我的收藏",
        component: () => import("../pages/MyInfoPage/MyFavourPage.vue"),
    }, {
        path: "/my/competition",
        name: "我的竞赛",
        component: () => import("../pages/MyInfoPage/MyCompetitionPage.vue"),
    }, {
        path: "/my/compete",
        name: "我的比赛",
        component: () => import("../pages/MyInfoPage/MyCompetePage.vue"),
    }, {
        path: "/my/team",
        name: "我的队伍",
        component: () => import("../pages/MyInfoPage/MyTeamPage.vue"),
    }, {
        path: "/create/team",
        name: "创建队伍",
        component: () => import("../pages/HomePage/CreateTeam.vue"),
    }, {
        path: "/update/team/:id",
        name: "更新队伍",
        component: () => import("../pages/HomePage/UpdateTeam.vue"),
    }, {
        path: "/system",
        name: "管理页",
        component: () => import("../pages/Admin/AdminSystem.vue"),
    },
    {
        path: "/product/add",
        name: "添加商品",
        component: () => import("../pages/productInfo/productInfoAdd.vue"),
    },
    {
        path: "/product/update/:id",
        name: "更新商品",
        component: () => import("../pages/productInfo/productInfoUpdate.vue"),
    },
    {
        path: "/user/list",
        name: "扩列交友",
        component: () => import("../pages/user/UserListPage.vue"),
    },
    {
        path: "/user/:id",
        name: "用户详情",
        component: () => import("../pages/user/TaInfo.vue"),
    },
    {
        path: "/admin/exit/:id",
        name: "管理员更新用户信息",
        component: () => import("../pages/user/AdminExitUserInfo.vue"),
    },
    {
        path: "/questionBank/add",
        name: "添加题库",
        component: () => import("../pages/questionBank/QuestionBankAdd.vue"),
    },
    {
        path: "/questionBank/update/:id",
        name: "更新题库",
        component: () => import("../pages/questionBank/QuestionBankUpdate.vue"),
    },
    {
        path: "/exam/add",
        name: "创建考试",
        component: () => import("../pages/exam/ExamAdd.vue"),
    },
    {
        path: "/exam/update/:id",
        name: "更新考试",
        component: () => import("../pages/exam/ExamUpdate.vue"),
    },
    {
        path: "/compete",
        name: "比赛详情",
        component: () => import("../pages/compete/compete.vue"),
    },
    {
        path: "/compete/exam",
        name: "在线考试",
        component: () => import("../pages/compete/CompeteExam.vue"),
    },
    {
        path: "/question/:id",
        name: "题目列表",
        component: () => import("../pages/question/QuestionPage.vue"),
    },
    {
        path: "/question/add",
        name: "添加题目",
        component: () => import("../pages/question/QuestionAdd.vue"),
    },
    {
        path: "/paper/add",
        name: "添加试卷",
        component: () => import("../pages/paper/PaperAdd.vue"),
    },
    {
        path: "/paper/:id",
        name: "试卷",
        component: () => import("../pages/paper/Paper.vue"),
    },
    {
        path: "/question/update",
        name: "更新题目",
        component: () => import("../pages/question/QuestionUpdate.vue"),
    },
    {
        path: "/product",
        name: "积分商城",
        component: () => import("../pages/productInfo/productInfoList.vue"),
    },
    {
        path: "/dynamic",
        name: "社区",
        component: () => import("../pages/Dynamic/DynamicPage.vue"),
    },
    {
        path: "/dynamic/:id",
        name: "动态详情",
        component: () => import("../pages/Dynamic/components/DetailsOfThePost.vue"),
    },
    {
        path: "/add/post",
        name: "发布帖子",
        component: () => import("../pages/Dynamic/PostAdd.vue"),
    },
    {
        path: "/competition",
        name: "竞赛",
        component: () => import("../pages/Competition/CompetitionPage.vue"),
    },
    {
        path: "/competition/create",
        name: "创建竞赛",
        component: () => import("../pages/Competition/CreateCompetitionPage.vue"),
    },
    {
        path: "/competition/update/:id",
        name: "更新竞赛",
        component: () => import("../pages/Competition/UpdateCompetitionPage.vue"),
    },
    {
        path: "/order",
        name: "订单",
        component: () => import("../pages/order/OrderPage.vue"),
    },
    {
        path: "/team/:id",
        name: "队伍详情",
        component: () => import("../pages/HomePage/TeamInfo.vue"),
    },
    {
        path: "/competition/info/:id",
        name: "竞赛详情",
        component: () => import("../pages/Competition/components/CompetitionInfo.vue"),
    },
    {
        path: "/friends/chat/:id",
        name: "好友聊天",
        component: () => import("../pages/Chat/ChatPage.vue"),
    },
    {
        path: "/friends",
        name: "好友",
        component: () => import("../pages/Friends/FriendsPage.vue"),
    },{
        path: "/notice",
        name: "通知",
        component: () => import("../pages/notice/Notice.vue"),
    }, {
        path: "/login",
        name: "登录",
        component: () => import("../pages/user/Login.vue"),
    }, {
        path: "/email/login",
        name: "邮箱登录",
        component: () => import("../pages/user/EmailLogin.vue"),
    }, {
        path: "/email/register",
        name: "邮箱注册",
        component: () => import("../pages/user/EmailRegister.vue"),
    }, {
        path: "/register",
        name: "注册",
        component: () => import("../pages/user/Register.vue"),
    }, {
        path: "/set_up",
        name: "设置",
        component: () => import("../pages/user/SetUpPage.vue"),
    },
    {
        path: "/403",
        name: "403",
        meta: {
            title: "403",
        },
        component: () => import("../components/status/403.vue"),
    }, {
        path: "/500",
        name: "500",
        component: () => import("../components/status/500.vue"),
    },
    {
        path: "/404",
        name: "404",
        component: () => import("../components/status/404.vue"),
    },
    {
        path: "/:pathMatch(.*)",
        redirect: "/404",
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;
