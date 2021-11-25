<template>
  <div id="home">
    <div class="header">
      <i class="el-icon-monitor"></i>
      <h3>云音乐后台管理系统</h3>
      <span class="user">欢迎你！{{ this.$store.state.saveUserName }}</span>
      <el-button type="text" class="out" @click="out">退出系统</el-button>
    </div>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              router
              :unique-opened="true"
              ref="menu"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-service"></i>
                  <span>音乐管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/musiclist">音乐列表</el-menu-item>
                  <el-menu-item index="/musictype">音乐类型</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-microphone"></i>
                  <span slot="title">歌手管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/singerlist">歌手列表</el-menu-item>
                  <el-menu-item index="/singertype">歌手类型</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-video-camera"></i>
                  <span slot="title">视频管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="videolist">视频列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-user"></i>
                  <span slot="title">用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/user">用户列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>

      <el-container>
        <el-main>
          <keep-alive
            exclude="User,Check,Add,Update,MusicList,MusicAdd,MusicType,MusicCheck,MusicUpdate,SingerType,SingerAdd,SingerList,SingerCheck,SingerUpdate,VideoList,VideoAdd,VideoCheck,VideoUpdate"
          >
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  created() {},
  methods: {
    out() {
      this.$confirm("是否退出系统?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.header {
  display: flex;
  position: relative;
  align-items: center;
  height: 80px;
  background-color: #eaeaea;
  background-image: url("../../assets/ulogin.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.header i {
  margin: 0 20px;
}

.header .user {
  position: absolute;
  right: 20px;
  top: 10px;
  font-size: 13px;
}

.out {
  position: absolute;
  right: 20px;
  bottom: 0px;
}

.el-col-12 {
  width: 100%;
}
</style>
