<template>
  <div id="check">
    <el-radio-group v-model="size">
      <el-radio label="">默认</el-radio>
      <el-radio label="medium">中等</el-radio>
      <el-radio label="small">小型</el-radio>
      <el-radio label="mini">超小</el-radio>
      <el-button class="backbtn" type="primary" @click="back">返回</el-button>
    </el-radio-group>
    <el-descriptions
      class="margin-top"
      title="用户信息"
      :column="3"
      :size="size"
      border
    >
      <!-- ID -->
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-postcard"></i>
          ID
        </template>
        {{ info.uid }}
      </el-descriptions-item>
      <!-- 姓名 -->
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          姓名
        </template>
        {{ info.userName }}
      </el-descriptions-item>
      <!-- 邮箱 -->
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-message"></i>
          邮箱
        </template>
        {{ info.email }}
      </el-descriptions-item>
      <!-- 密码 -->
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-key"></i>
          密码
        </template>
        {{ info.password }}
      </el-descriptions-item>
      <!-- 手机号 -->
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        {{ info.phone }}
      </el-descriptions-item>
      <!-- 住址 -->
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          住址
        </template>
        {{ info.address }}
      </el-descriptions-item>
      <!-- 创建时间 -->
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-time"></i>
          创建时间
        </template>
        {{ info.createTime | dateFmt }}
      </el-descriptions-item>
      <!-- 更新时间 -->
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-time"></i>
          更新时间
        </template>
        {{ info.updateTime | dateFmt }}
      </el-descriptions-item>
      <!-- 状态 -->
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-setting"></i>
          状态
        </template>
        {{ info.status }}
      </el-descriptions-item>
      <!-- 备注 -->
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          备注
        </template>
        {{ info.remark }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import { findUserById } from "network/home.js";
import fmtDate from "common/js/Date.js";
export default {
  name: "Check",
  data() {
    return {
      size: "",
      //接收参数时，将JSON字符串转换为对象
      // row: JSON.parse(this.$route.query.row)
      uid: this.$route.query.uid,
      info: ""
    };
  },
  created() {
    this.findUserById(this.uid);
  },
  methods: {
    back() {
      this.$router.back();
    },
    findUserById(uid) {
      findUserById(uid).then(res => {
        // console.log(res[0]);
        //直接赋值{}
        if (res[0].status === 1) {
          res[0].status = "正常";
        } else {
          res[0].status = "封禁";
        }
        this.info = res[0];
      });
    }
  },
  filters: {
    dateFmt(date) {
      let d = new Date(date);
      return fmtDate(d, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>

<style scoped>
.backbtn {
  position: absolute;
  right: 30px;
}

.margin-top {
  margin: 20px 0;
}
</style>
