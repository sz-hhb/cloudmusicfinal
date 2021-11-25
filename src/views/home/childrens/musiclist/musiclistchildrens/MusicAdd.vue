<template>
  <div id="add">
    <el-button type="primary" size="small" @click="dialogFormVisible = true"
      >添加</el-button
    >
    <el-dialog title="添加歌曲" :visible.sync="dialogFormVisible">
      <el-form :model="music">
        <el-form-item label="歌曲名称" :label-width="formLabelWidth">
          <el-input
            v-model="music.musicName"
            autocomplete="off"
            placeholder="请输入歌曲名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="歌曲类型" :label-width="formLabelWidth">
          <el-select v-model="music.musicType" placeholder="请选择歌曲类型">
            <el-option
              v-for="(item, index) in musicTypeList"
              :key="index"
              :label="item.musictypename"
              :value="item.musictypename"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="歌曲热度" :label-width="formLabelWidth">
          <el-input
            v-model="music.musicHot"
            autocomplete="off"
            placeholder="请输入歌曲热度"
          ></el-input>
        </el-form-item>
        <el-form-item label="歌曲歌手" :label-width="formLabelWidth">
          <el-input
            v-model="music.musicSinger"
            autocomplete="off"
            placeholder="请输入歌手名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="歌词地址" :label-width="formLabelWidth">
          <el-input
            v-model="music.musicLric"
            autocomplete="off"
            placeholder="请输入歌词地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="歌曲图片" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            :on-change="handleChange"
            :on-remove="handleRemove"
            :limit="1"
            action=""
            :headers="headers"
            :file-list="fileList"
            accept=".jpg,.png"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <span slot="tip" class="el-upload__tip">
              只能上传1张jpg/png文件，且不超过500kb
            </span>
          </el-upload>
        </el-form-item>
        <el-form-item label="歌曲地址" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            :on-change="handleChange1"
            :on-remove="handleRemove1"
            :limit="1"
            action=""
            :headers="headers"
            :file-list="fileList"
            accept=".mp3"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <span slot="tip" class="el-upload__tip">
              只能上传1张mp3文件
            </span>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MusicAdd",
  inject: ["reload"],
  data() {
    return {
      music: {
        musicName: "",
        musicType: "",
        musicPicture: "",
        musicHot: "",
        musicSinger: "",
        musicAdress: "",
        musicLric: ""
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      fileList: [],
      param: {}
    };
  },
  props: {
    musicTypeList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  created() {
    this.param = new FormData();
  },
  methods: {
    refresh() {
      this.reload();
    },
    //有变化时调用的函数
    handleChange(file, fileList) {
      this.param.append("img", file.raw);
      console.log(this.param.get("img"));
    },
    handleRemove(file, filesList) {
      this.param.delete("img");
    },
    handleChange1(file, fileList) {
      this.param.append("music", file.raw);
      console.log(this.param.get("music"));
    },
    handleRemove1(file, filesList) {
      this.param.delete("music");
    },
    confirm() {
      //利用表单数据传值，后端用RequestParam接收表单的值
      // 注意 headers: {
      //   "Content-Type": "multipart/form-data"
      // }
      //下面append的东西就会到form表单数据的fields中；
      //然后通过下面的方式把内容通过axios来传到后台
      var musicName = this.music.musicName;
      var musicType = this.music.musicType;
      var musicHot = this.music.musicHot;
      var musicSinger = this.music.musicSinger;
      var musicLric = this.music.musicLric;
      this.param.append("musicname", musicName);
      this.param.append("musictypename", musicType);
      this.param.append("musichot", musicHot);
      this.param.append("singername", musicSinger);
      this.param.append("lyricurl", musicLric);
      const instance = this.axios.create({
        withCredentials: true
      });
      instance
        .post("http://localhost:8090/music/insertMusic", this.param)
        .then(res => {
          // console.log(res);
          if (res.data === "success") {
            this.$message({
              message: "添加成功！",
              type: "success"
            });
          } else {
            this.$message.error("添加失败！");
          }
          this.dialogFormVisible = false;
          this.refresh();
        })
        .catch(() => {
          this.dialogFormVisible = true;
          this.$message.error("请输入完整信息！");
        });
    }
  }
};
</script>

<style scoped></style>
