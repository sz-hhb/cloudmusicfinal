<template>
  <div id="update">
    <h2 style="text-align: center">用户信息</h2>
    <el-form
      class="userfrom"
      ref="form"
      :model="form"
      label-width="80px"
      inline
    >
      <el-form-item label="ID">
        <el-input v-model="form.uid" disabled=""></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="住址">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.createTime"
            style="width: 100%;"
            disabled
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            type="date"
            placeholder="选择时间"
            v-model="form.createTime"
            style="width: 100%;"
            disabled
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="form.status" placeholder="请选择用户状态">
          <el-option label="正常" value="1"></el-option>
          <el-option label="封禁" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" style="margin-right: 50px">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button type="primary" @click="back">退出</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { updateUserList, findUserById } from "network/home.js";
export default {
  name: "Update",
  inject: ["reload"],
  data() {
    return {
      form: {},
      uid: this.$route.query.uid
    };
  },
  created() {
    this.findUserById(this.uid);
  },
  methods: {
    refresh() {
      this.reload();
    },
    back() {
      this.$confirm("此操作将会退出, 请确认是否保存修改,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$router.back();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    findUserById(uid) {
      //向后端发送请求并接受数据库中的指定ID的用户列表
      findUserById(uid).then(res => {
        console.log(res);
        //返回的是一个数组，去index=0并直接赋值
        if (res[0].status === 1) {
          res[0].status = "正常";
        } else {
          res[0].status = "封禁";
        }
        this.form = res[0];
      });
    },
    onSubmit() {
      this.updateUserList(
        this.form.uid,
        this.form.userName,
        this.form.email,
        this.form.password,
        this.form.phone,
        this.form.address,
        this.form.createTime,
        this.form.status,
        this.form.remark
      );
    },
    updateUserList(
      uid,
      userName,
      email,
      password,
      phone,
      address,
      createTime,
      status,
      remark
    ) {
      //发送请求更新用户
      if (status === "正常") {
        status = 1;
      } else {
        status = 0;
      }
      updateUserList(
        uid,
        userName,
        email,
        password,
        phone,
        address,
        createTime,
        status,
        remark
      )
        .then(res => {
          if (res === "success") {
            this.$message({
              type: "success",
              message: "更新成功！"
            });
            this.refresh();
          } else {
            this.$message.error("更新失败！");
          }
          this.refresh();
        })
        .catch(() => {
          this.$message.error("请输入完整信息！");
        });
    }
  }
};
</script>

<style scoped>
#update {
  border: 1px solid #eaeaea;
}

.el-col-2 {
  text-align: center;
}
</style>
