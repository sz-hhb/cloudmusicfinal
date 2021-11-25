<template>
  <div id="user">
    <!-- 头部 -->
    <search-header>
      <div class="option">
        <div class="user-id">
          <span>用户编号：</span
          ><el-input
            v-model="search.uid"
            size="mini"
            placeholder="请输入用户编号"
            style="width: 150px"
            @focus="inputchange('uid')"
          />
        </div>
        <div class="user-name">
          <span>用户名称：</span
          ><el-input
            v-model="search.userName"
            size="mini"
            placeholder="请输入用户名称"
            style="width: 150px"
            @focus="inputchange('userName')"
          />
        </div>
        <div class="user-adress">
          <span>用户地址：</span
          ><el-input
            v-model="search.address"
            size="mini"
            placeholder="请输入用户地址"
            style="width: 150px"
            @focus="inputchange('address')"
          />
        </div>
        <div class="user-status">
          <span>用户状态：</span>
          <el-select
            v-model="search.status"
            placeholder="请选择用户状态"
            style="width: 150px"
            size="mini"
            @change="Change('status', search.status)"
          >
            <el-option label="封禁" value="封禁"></el-option>
            <el-option label="正常" value="正常"></el-option>
          </el-select>
        </div>
        <div class="btn">
          <div>
            <el-button type="primary" @click="insertUser" size="small"
              >增加</el-button
            >
          </div>
          <delete :multiple-selection="multipleSelection"></delete>
          <div>
            <el-button
              type="info"
              @click="refresh"
              size="small"
              icon="el-icon-refresh"
            ></el-button>
          </div>
        </div>
      </div>
    </search-header>
    <!-- 表格 -->
    <el-table
      :data="getTableData"
      height="330"
      border
      style="width: 100%"
      stripe
      :default-sort="{ prop: 'uid', order: 'ascending' }"
      size="mini"
      @selection-change="handleSelectionChange"
    >
      <template slot="empty">
        <p>{{ dataText }}</p>
      </template>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="uid" label="id" width="80" align="center" sortable>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户名"
        width="120"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column prop="password" label="密码" width="120" align="center">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="150" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机" width="120" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="120" align="center">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="160"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        width="160"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="200" align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button @click="checkClick(scope.row)" type="text" size="mini"
            >查看</el-button
          >
          <el-button type="text" size="mini" @click="updateClick(scope.row)"
            >修改</el-button
          >
          <el-button type="text" size="mini" @click="deleteClick(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        background
        :total="getTotal"
        style="textAlign: center"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { userList, deleteUser } from "network/home.js";
import fmtDate from "common/js/Date.js";
import SearchHeader from "components/common/header/SearchHeader.vue";
import Delete from "./userchildrens/Delete.vue";
export default {
  name: "User",
  inject: ["reload"],
  data() {
    return {
      // 表格数据
      tableData: [],
      // 搜索框
      search: { uid: "", userName: "", status: "", address: "", type: "" },
      // 表格数据的总个数
      total: 0,
      //当前页数
      currentPage: 1,
      //1页10个数据
      pagesize: 10,
      dataText: "",
      multipleSelection: []
    };
  },
  components: {
    SearchHeader,
    Delete
  },
  created() {
    //加载用户列表
    this.findUserInfo();
  },
  methods: {
    //查找用户列表
    findUserInfo() {
      //向后端发送请求并接受数据库中的用户列表
      userList().then(res => {
        // console.log(res);
        res.forEach(item => {
          //改变时间日期的格式
          item.createTime = this.dateFmt(item.createTime);
          item.updateTime = this.dateFmt(item.updateTime);
          // 将用户状态和类型做转换
          if (item.status === 1) {
            item.status = "正常";
          } else {
            item.status = "封禁";
          }
        });
        this.tableData = res;
        if (this.tableData.length === 0) {
          this.dataText = "暂无数据";
        }
      });
    },
    //查看
    checkClick(row) {
      // console.log(row.uid);
      //row是一个对象，里面保存所选行的所有信息
      //使用路由传参，参数为对象时，需要先将其转化为JSON字符串
      this.$router.push({
        path: "/usercheck",
        query: {
          // row: JSON.stringify(row)
          uid: row.uid
        }
      });
    },
    //更新
    updateClick(row) {
      this.$router.push({
        path: "/userUpdate",
        query: {
          // row: JSON.stringify(row)
          uid: row.uid
        }
      });
    },
    deleteClick(row) {
      // console.log(row);
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteUser(row.uid).then(res => {
            // console.log(res);
            if (res === "success") {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
          this.refresh();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //添加
    insertUser() {
      this.$router.push("/userinsert");
    },
    //查询的结果
    handleSearch() {
      //利用正则表达式的构造方法去判断是否为一个单词
      var reg = new RegExp("^\\b" + this.form.name + "\\b$");
      //利用数组的filter方法，过滤该数组里每个对象的userName是否和查询表单里的name对应，如果对应
      // 最后返回的是一个数组
      return this.tableData.filter(item => {
        if (reg.test(item.userName)) {
          // 字符串索引有关键字值,返回true
          return item;
        }
      });
    },
    //刷新
    refresh() {
      this.reload();
    },
    //时间转化
    dateFmt(date) {
      let d = new Date(date);
      return fmtDate(d, "yyyy-MM-dd hh:mm:ss");
    },
    //点击之后的当前页数
    handleCurrentChange(val) {
      // 当前页数
      this.currentPage = val;
    },
    //当表单下拉框有值时，消除其余的表单下拉框的值
    Change(param, val) {
      if (param === "status" && val != "") {
        this.search.type = "";
        this.search.uid = "";
        this.search.userName = "";
        this.search.address = "";
      }
      if (param === "type" && val != "") {
        this.search.status = "";
        this.search.uid = "";
        this.search.userName = "";
        this.search.address = "";
      }
    },
    //当表单搜索框有值时，消除其余的表单搜索框的值
    inputchange(param) {
      if (param === "uid") {
        this.search.userName = "";
        this.search.address = "";
        this.search.status = "";
        this.search.type = "";
      } else if (param === "userName") {
        this.search.uid = "";
        this.search.address = "";
        this.search.status = "";
        this.search.type = "";
      } else if (param === "address") {
        this.search.uid = "";
        this.search.userName = "";
        this.search.status = "";
        this.search.type = "";
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  computed: {
    //筛选之后的表格数据
    getTableData() {
      //不为空的时候做
      if (this.search.uid) {
        return (
          this.tableData
            //筛选符合条件的数据
            .filter(data => {
              if (data.uid == this.search.uid) {
                return data;
              }
            })
            .slice(
              (this.currentPage - 1) * this.pagesize,
              this.currentPage * this.pagesize
            )
        );
      }
      if (this.search.userName) {
        return this.tableData
          .filter(data => {
            if (
              data.userName
                .toLowerCase()
                .includes(this.search.userName.toLowerCase())
            ) {
              return data;
            }
          })
          .slice(
            (this.currentPage - 1) * this.pagesize,
            this.currentPage * this.pagesize
          );
      }
      if (this.search.address) {
        return this.tableData
          .filter(data => {
            if (
              data.address
                .toLowerCase()
                .includes(this.search.address.toLowerCase())
            ) {
              return data;
            }
          })
          .slice(
            (this.currentPage - 1) * this.pagesize,
            this.currentPage * this.pagesize
          );
      }
      if (this.search.status) {
        console.log(this.currentPage);
        return this.tableData
          .filter(data => {
            if (data.status == this.search.status) {
              return data;
            }
          })
          .slice(
            (this.currentPage - 1) * this.pagesize,
            this.currentPage * this.pagesize
          );
      }

      return this.tableData.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    //获取筛选过后的表格数据长度
    getTotal() {
      if (this.search.uid) {
        return this.tableData.filter(data => {
          if (data.uid == this.search.uid) {
            return data;
          }
        }).length;
      }
      if (this.search.userName) {
        return this.tableData.filter(data => {
          if (data.userName.includes(this.search.userName)) {
            return data;
          }
        }).length;
      }
      if (this.search.address) {
        return this.tableData.filter(data => {
          if (data.address.includes(this.search.address)) {
            return data;
          }
        }).length;
      }
      if (this.search.status) {
        return this.tableData.filter(data => {
          if (data.status == this.search.status) {
            return data;
          }
        }).length;
      }
      return this.tableData.length;
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
.option {
  display: flex;
  flex-wrap: wrap;
}

.option div {
  margin-left: 20px;
  margin-top: 5px;
}

.option .btn {
  display: flex;
  justify-content: space-around;
  margin-left: 750px;
  margin-top: 5px;
}

span {
  font-size: 12px;
}

.block {
  margin-top: 15px;
}
</style>
