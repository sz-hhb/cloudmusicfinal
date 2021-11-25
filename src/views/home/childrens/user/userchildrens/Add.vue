<template>
  <div id="add">
    <h1 style="text-align: center">用户信息</h1>
    <el-form
      class="userfrom"
      ref="form"
      :model="form"
      label-width="80px"
      inline
      :rules="rules"
    >
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="form.userName" ref="ipt"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="住址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
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
import { insertUser } from "network/home.js";
export default {
  name: "Add",
  inject: ["reload"],
  data() {
    return {
      form: {
        userName: null,
        email: null,
        password: null,
        phone: null,
        address: null,
        createTime: null,
        updateTime: null,
        status: null,
        remark: null
      },
      rules: {
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        password: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur" }
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        status: [{ required: true, message: "请输入状态", trigger: "blur" }],
        type: [{ required: true, message: "请输入类型", trigger: "blur" }],
        createTime: [
          { required: true, message: "请输入创建时间", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "请输入更新时间", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.$nextTick(() => {
      this.$refs.ipt.focus();
    });
  },
  methods: {
    back() {
      this.$confirm("此操作将会退出, 请确认是否保存,是否继续?", "提示", {
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
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.insertUser();
        } else {
          this.$message.error("请输入完整的用户信息!");
        }
      });
    },
    //刷新
    refresh() {
      this.reload();
    },
    insertUser() {
      //发送请求更新用户
      insertUser(
        this.form.uid,
        this.form.userName,
        this.form.email,
        this.form.password,
        this.form.phone,
        this.form.address,
        this.form.status,
        this.form.type,
        this.form.remark
      )
        .then(res => {
          if (res === "success") {
            this.$message({
              type: "success",
              message: "添加成功！"
            });
          }
        })
        .catch(() => {
          this.$message.error("请输入完整信息！");
        });
    }
  }
};
</script>

<style scoped></style>
