<template>
  <a-layout style="min-height: 100vh">
    <!-- 侧边栏 -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">
        <span>Uric运维平台</span>
      </div>
      <a-menu
          :selectedKeys="selectedKeys"
          :default-open-keys="['3']"
          mode="inline"
          theme="dark"
          :inline-collapsed="collapsed"
      >
        <template v-for="menu in menu_list" :key="menu.id">
          <!-- 没有子菜单 -->
          <a-menu-item v-if="!menu.children || menu.children.length === 0" :key="menu.id">
            <router-link :to="menu.menu_url">
              <component :is="icons[menu.icon]"/>
              <span>{{ menu.title }}</span>
            </router-link>
          </a-menu-item>

          <!-- 有子菜单 -->
          <a-sub-menu v-else :key="menu.id">
            <template #title>
              <component :is="icons[menu.icon]"/>
              <span>{{ menu.title }}</span>
            </template>
            <a-menu-item
                v-for="child in menu.children"
                :key="child.id"
            >
              <router-link :to="child.menu_url">
                <span>{{ child.title }}</span>
              </router-link>
            </a-menu-item>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>

    <!-- 主体 -->
    <a-layout>
      <a-layout-header
          style="background: #fff; padding: 0 16px; display: flex; justify-content: space-between; align-items: center;">
        <!-- 面包屑 -->
        <a-breadcrumb>
          <a-breadcrumb-item>运维平台</a-breadcrumb-item>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
        </a-breadcrumb>

        <!-- 注销按钮 -->
        <a-button type="primary" danger @click="handleLogout">注销</a-button>
      </a-layout-header>


      <!-- 内容 -->
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
<!--          <a-breadcrumb-item>User</a-breadcrumb-item>-->
<!--          <a-breadcrumb-item>Bill</a-breadcrumb-item>-->
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view/>
        </div>
      </a-layout-content>

      <a-layout-footer style="text-align: center">
        Uric运维平台 ©2018 Created by WZW
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup>
import {ref} from "vue";
import {
  AppstoreOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
  CodeOutlined,
  ClockCircleOutlined,
  SettingOutlined,
  MonitorOutlined,
  AlertOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons-vue";

const collapsed = ref(false);
const selectedKeys = ref(["1"]);

// 图标映射
const icons = {
  appstore: AppstoreOutlined, // 展示中心
  database: DatabaseOutlined, // 资产管理
  deployment: DeploymentUnitOutlined, // 批量任务
  code: CodeOutlined, // 代码发布
  clock: ClockCircleOutlined, // 定时计划
  setting: SettingOutlined, // 配置管理
  monitor: MonitorOutlined, // 监控
  alert: AlertOutlined, // 报警
  user: UserOutlined, // 用户管理
};

// 菜单数据
const menu_list = ref([
  {id: 1, icon: "appstore", title: "展示中心", menu_url: "/uric/workbench", children: []},
  {id: 2, icon: "database", title: "资产管理", menu_url: "/uric/host", children: []},
  {
    id: 3,
    icon: "deployment",
    title: "批量任务",
    menu_url: "/uric/workbench",
    children: [
      {id: 10, icon: "deployment", title: "执行任务", menu_url: "/uric/multi_exec"},
      {id: 11, icon: "deployment", title: "命令管理", menu_url: "/uric/template_manage"},
    ],
  },
  {
    id: 4,
    icon: "code",
    title: "代码发布",
    menu_url: "/uric/workbench",
    children: [
      {id: 12, title: "应用管理", menu_url: "/uric/release"},
      {id: 13, title: "发布申请", menu_url: "/uric/release_apply"},
    ],
  },
  {id: 5, icon: "clock", title: "定时计划", menu_url: "/uric/workbench", children: []},
  {
    id: 6,
    icon: "setting",
    title: "配置管理",
    menu_url: "/uric/workbench",
    children: [
      {id: 14, title: "环境管理", menu_url: "/uric/environment"},
      {id: 15, title: "服务配置", menu_url: "/uric/workbench"},
      {id: 16, title: "应用配置", menu_url: "/uric/workbench"},
    ],
  },
  {id: 7, icon: "monitor", title: "监控", menu_url: "/uric/workbench", children: []},
  {
    id: 8,
    icon: "alert",
    title: "报警",
    menu_url: "/uric/workbench",
    children: [
      {id: 17, title: "报警历史", menu_url: "/uric/workbench"},
      {id: 18, title: "报警联系人", menu_url: "/uric/workbench"},
      {id: 19, title: "报警联系组", menu_url: "/uric/workbench"},
    ],
  },
  {
    id: 9,
    icon: "user",
    title: "用户管理",
    menu_url: "/uric/workbench",
    children: [
      {id: 20, title: "账户管理", menu_url: "/uric/workbench"},
      {id: 21, title: "角色管理", menu_url: "/uric/workbench"},
      {id: 22, title: "系统设置", menu_url: "/uric/workbench"},
    ],
  },
]);

const handleLogout = () => {
  // 清理本地 token / session
  localStorage.removeItem("token");
  // 跳转到登录页
  window.location.href = "/";
};

</script>

<style scoped>
.logo {
  font-style: italic;
  text-align: center;
  font-size: 18px;
  color: #ffffff;
  line-height: 32px;
  font-family: "Times New Roman";
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.trigger {
  font-size: 18px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
</style>
