<template>
  <div class="login-wrapper">
    <!-- 背景图 -->
    <img class="bg-img" src="../assets/login.jpg" alt="">

    <!-- 登录框 -->
    <div class="login-container">
      <div class="login-title">
<!--        <img class="logo-img" src="../assets/login3.jpeg" alt="">-->
        <p>hello Uirc!</p>
      </div>

      <div class="login-card">
        <div class="title">
          <span>登录</span>
        </div>
        <div class="inp">
          <input v-model="username" type="text" placeholder="用户名" class="user">
          <input v-model="password" type="password" class="pwd" placeholder="密码">

          <div class="remember">
            <p>
              <input type="checkbox" class="no" v-model="remember"/>
              <span>记住密码</span>
            </p>
          </div>

          <button class="login-btn" @click="login">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      remember: false, // 是否记住登录
      username: "",
      password: "",
    }
  },
  methods: {
    login() {
      this.$axios.post(`/users/login/`, {
        username: this.username,
        password: this.password,
      }).then((response) => {
        // locatStorage或者sessionStorage中存储token
        // 先清空原有的token
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        if (this.remember) {
          // 记住登录
          localStorage.token = response.data.token;
        } else {
          sessionStorage.token = response.data.token;
        }
        // 跳转到首页
        let self = this;
        this.$success({
          title: 'uric系统提示',
          content: `登录成功！`,
          onOk() {
            self.$router.push("/uric");
          }
        })
        // 下一个页面，首页加载时验证token有效性
      }).catch(error => {
        this.$message.error('用户名或者密码有误，请重新输入！');
      });
    },
  },
}
</script>

<style scoped>
.login-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.bg-img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保证背景铺满但不变形 */
}

.login-container {
  position: absolute;
  width: 500px;
  height: auto;
  left: 0;
  right: 0;
  margin: auto;
  top: 20%;
}

.login-title {
  text-align: center;
}

.login-title .logo-img {
  width: 190px;
  height: auto;
}

.login-title p {
  font-size: 18px;
  color: #fff;
  padding: 10px 0 40px;
}

.login-card {
  width: 400px;
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 2px 8px rgba(0, 0, 0, .2);
  border-radius: 6px;
  margin: 0 auto;
  padding: 30px 30px 40px;
}

.login-card .title {
  font-size: 20px;
  color: #333;
  border-bottom: 1px solid #e6e6e6;
  text-align: center;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.inp {
  width: 100%;
  margin: 0 auto;
}

.inp input {
  width: 100%;
  height: 40px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  margin-bottom: 15px;
  padding: 0 12px;
  font-size: 14px;
}

.remember {
  display: flex;
  align-items: center;
  font-size: 13px;
  margin: 10px 0;
  color: #333;
}

.remember input {
  margin-right: 6px;
}

.login-btn {
  width: 100%;
  height: 42px;
  background: #396fcc;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  border: none;
  cursor: pointer;
  margin-top: 15px;
}

.login-btn:hover {
  background: #2f59a8;
}
</style>

