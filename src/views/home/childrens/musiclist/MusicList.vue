<template>
  <div id="musiclist">
    <search-header>
      <div class="option">
        <div class="sing-id">
          <span>歌曲编号：</span
          ><el-input
            v-model="search.musicid"
            size="mini"
            placeholder="请输入歌曲编号"
            style="width: 150px"
            @focus="inputchange('musicid')"
          />
        </div>
        <div class="sing-name">
          <span>歌曲名称：</span
          ><el-input
            v-model="search.musicname"
            size="mini"
            placeholder="请输入歌曲名称"
            style="width: 150px"
            @focus="inputchange('musicname')"
          />
        </div>
        <div class="sing-singer">
          <span>歌手名称：</span>
          <search-input
            :search="search.singer"
            :list="singerNameList"
            @sentSearch="getSearch"
            :singerContent="singerContent"
            @sentFocus="getFocus"
          ></search-input>
        </div>
        <div class="sing-musictype">
          <span>歌曲类型：</span>
          <el-select
            v-model="search.musictype"
            placeholder="请选择歌曲类型"
            style="width: 150px"
            size="mini"
            @change="Change('type', search.musictype)"
          >
            <el-option
              v-for="(item, index) in musicTypes"
              :label="item.musictypename"
              :value="item.musictypename"
              :key="index"
            ></el-option>
          </el-select>
        </div>
        <div class="btn">
          <music-add :music-type-list="musicTypes"></music-add>
          <music-delete :multiple-selection="multipleSelection"></music-delete>
          <div class="refresh">
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
    <el-table
      :data="getTableData"
      height="330"
      border
      style="width: 100%"
      stripe
      size="mini"
      :default-sort="{ prop: 'musicid', order: 'ascending' }"
      @selection-change="handleSelectionChange"
    >
      <template slot="empty">
        <p>{{ dataText }}</p>
      </template>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        prop="musicid"
        label="歌曲编号"
        width="100"
        align="center"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="musicname"
        label="歌曲名称"
        sortable
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="musicphotourl"
        label="歌曲图片"
        width="250"
        align="center"
      >
        <template slot-scope="scope">
          <img :src="scope.row.musicphotourl" alt="" />
        </template>
      </el-table-column>
      <el-table-column prop="musichot" label="热度" width="80" align="center">
      </el-table-column>
      <el-table-column
        prop="singer.singername"
        label="歌手名称"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="musictype.musictypename"
        label="歌曲类型"
        width="80"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="songurl"
        label="歌曲地址"
        width="350"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="lyricurl"
        label="歌词地址"
        width="80"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="time"
        label="创建时间"
        width="150"
        align="center"
        sortable
      >
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
import {
  musicTypeList,
  musicList,
  deleteMusicById,
  singerList
} from "network/home.js";

import SearchHeader from "components/common/header/SearchHeader.vue";
import SearchInput from "components/common/searchinput/SearchInput.vue";

import MusicAdd from "./musiclistchildrens/MusicAdd.vue";
import MusicDelete from "./musiclistchildrens/MusicDelete.vue";

import fmtDate from "common/js/Date.js";

export default {
  name: "MusicList",
  inject: ["reload"],
  components: { SearchHeader, SearchInput, MusicAdd, MusicDelete },
  data() {
    return {
      //音乐列表
      musicInfo: {
        musicName: null,
        musciType: null,
        musicPicture: null,
        musicHot: null,
        musicWordAdress: null,
        musicUrl: null,
        musicSonger: null
      },
      //音乐类型
      musicTypes: [],

      // 歌手列表
      singerList: [],
      //歌手名字列表
      singerNameList: [],
      //歌手搜索框的占位符
      singerContent: "请输入歌手名称",
      // 表单验证
      rules: {
        musicName: [
          { required: true, message: "请输入歌曲名称", trigger: "blur" }
        ],
        musicType: [
          { required: true, message: "请输入歌曲类型", trigger: "blur" }
        ],
        musicPicture: [
          { required: true, message: "请输入歌曲图片", trigger: "blur" }
        ],
        musicHot: [
          { required: true, message: "请输入歌曲热度", trigger: "blur" }
        ],
        musicWordAdress: [
          { required: true, message: "请输入歌词地址", trigger: "blur" }
        ],
        musicUrl: [
          { required: true, message: "请输入歌曲地址", trigger: "blur" }
        ],
        musicSonger: [
          { required: true, message: "请输入歌手名称", trigger: "blur" }
        ]
      },

      //表格数据
      tableData: [],
      //搜索框的属性
      search: { musicid: "", musicname: "", musictype: "", singer: "" },

      // 表格数据的总个数
      total: 0,
      //当前页数
      currentPage: 1,
      //1页10个数据
      pagesize: 10,

      //多选
      multipleSelection: [],

      //数据没加载前显示的文本
      dataText: ""
    };
  },
  created() {
    //获取音乐类型列表
    this.musicTypeList();
    // 获取音乐列表
    this.musicList();
    //获取歌手列表
    this.getSingerList();
  },
  methods: {
    checkClick(row) {
      this.$router.push({
        path: "/musiccheck",
        query: {
          mid: row.musicid
        }
      });
    },
    deleteClick(row) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteMusicById(row.musicid).then(res => {
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
    updateClick(row) {
      this.$router.push({
        path: "/musicupdate",
        query: {
          mid: row.musicid
        }
      });
    },

    //获得音乐类型列表
    musicTypeList() {
      musicTypeList().then(res => {
        this.musicTypes = res;
      });
    },
    //获取音乐列表
    musicList() {
      musicList().then(res => {
        // console.log(res);
        res.forEach(res => {
          res.time = this.dateFmt(res.time);
          res.musichot = this.hotFilter(res.musichot);
          res.musicphotourl =
            "http://localhost:8090/musicstatic/" + res.musicphotourl;
        });
        this.tableData = res;
        if (this.tableData.length === 0) {
          this.dataText = "暂无数据";
        }
      });
    },
    //获取歌手列表
    getSingerList() {
      singerList().then(res => {
        // console.log(res);
        this.singerList = res;
        for (var i = 0; i < res.length; i++) {
          //将其转化为value：singername的形式
          this.singerNameList.push({ value: res[i].singername });
        }
        // console.log(this.singerNameList);
      });
    },

    //从搜索框的子组件的事件获取search值
    getSearch(value) {
      this.search.singer = value;
    },
    //当表单下拉框有值时，消除其余的表单下拉框的值
    Change(param, val) {
      if (param === "type" && val != "") {
        this.search.musicid = "";
        this.search.musicname = "";
        this.search.singer = "";
      }
    },
    //当表单搜索框有值时，消除其余的表单搜索框的值
    inputchange(param) {
      if (param === "musicid") {
        this.search.musicname = "";
        this.search.musictype = "";
        this.search.singer = "";
      } else if (param === "musicname") {
        this.search.musicid = "";
        this.search.singer = "";
        this.search.musictype = "";
      }
    },
    //获取歌手搜索框的焦点
    getFocus() {
      this.search.musicid = "";
      this.search.musicname = "";
      this.search.musictype = "";
      this.search.singer = "";
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection);
    },

    //点击之后的当前页数
    handleCurrentChange(val) {
      // 当前页数
      this.currentPage = val;
    },

    hotFilter(val) {
      if (val < 10000) {
        return val;
      } else if (10000 <= val < 100000000) {
        return val / 10000 + "万";
      } else {
        return val / 100000000 + "亿";
      }
    },
    //时间转化
    dateFmt(date) {
      let d = new Date(date);
      return fmtDate(d, "yyyy-MM-dd hh:mm:ss");
    },
    //刷新
    refresh() {
      this.reload();
    }
  },
  computed: {
    getTableData() {
      if (this.search.musicid) {
        return this.tableData
          .filter(data => {
            if (data.musicid == this.search.musicid) {
              return data;
            }
          })
          .slice(
            (this.currentPage - 1) * this.pagesize,
            this.currentPage * this.pagesize
          );
      }
      if (this.search.musicname) {
        return this.tableData
          .filter(data => {
            if (
              data.musicname
                .toLowerCase()
                .includes(this.search.musicname.toLowerCase())
            ) {
              return data;
            }
          })
          .slice(
            (this.currentPage - 1) * this.pagesize,
            this.currentPage * this.pagesize
          );
      }
      if (this.search.singer) {
        return this.tableData
          .filter(data => {
            if (
              data.singer.singername
                .toLowerCase()
                .includes(this.search.singer.toLowerCase())
            ) {
              return data;
            }
          })
          .slice(
            (this.currentPage - 1) * this.pagesize,
            this.currentPage * this.pagesize
          );
      }
      if (this.search.musictype) {
        return this.tableData
          .filter(data => {
            if (
              data.musictype.musictypename
                .toLowerCase()
                .includes(this.search.musictype.toLowerCase())
            ) {
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
    getTotal() {
      if (this.search.musicid) {
        return this.tableData.filter(data => {
          if (data.musicid == this.search.musicid) {
            return data;
          }
        }).length;
      }
      if (this.search.musicname) {
        return this.tableData.filter(data => {
          if (
            data.musicname
              .toLowerCase()
              .includes(this.search.musicname.toLowerCase())
          ) {
            return data;
          }
        }).length;
      }
      if (this.search.singer) {
        return this.tableData.filter(data => {
          if (
            data.singer.singername
              .toLowerCase()
              .includes(this.search.singer.toLowerCase())
          ) {
            return data;
          }
        }).length;
      }
      if (this.search.musictype) {
        return this.tableData.filter(data => {
          if (
            data.musictype.musictypename
              .toLowerCase()
              .includes(this.search.musictype.toLowerCase())
          ) {
            return data;
          }
        }).length;
      }
      return this.tableData.length;
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
  margin-left: 770px;
  margin-top: 5px;
}

span {
  font-size: 12px;
}

.block {
  margin-top: 15px;
}

img {
  width: 50px;
  height: 50px;
}
</style>
