<template>
  <div id="rsingers">
    <div class="title">
      <h3>
        <span>{{ title }}</span>
      </h3>
      <div class="singer-info">
        <div
          class="singer-img"
          v-for="(item, index) in singerInfo"
          :key="index"
        >
          <a href="javascript:void(0);" @click="itemClick(item.singerid)">
            <img :src="item.singerphotourl" alt="" />
            <div class="singer-name">
              <span>{{ item.singername }}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Rsingers",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      deafult: ""
    },
    singerInfo: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {},
  methods: {
    itemClick(sid) {
      this.$router.push({
        path: "/singer",
        query: {
          sid
        }
      });
    }
  }
};
</script>

<style scoped>
#rsingers {
  display: flex;
  flex-direction: column;
}

#rsingers .title {
  height: 40px;
  border-bottom: 2px solid #c20c0c;
}

#rsingers .title h3 {
  padding: 0;
  margin: 0;
  font-size: 24px;
  font-weight: normal;
}

#rsingers .singer-info {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

#rsingers .singer-info a {
  color: #000;
  font-size: 12px;
  text-decoration: none;
}

#rsingers .singer-info a span:hover {
  border-bottom: 1px solid #000;
}

#rsingers .singer-info img {
  width: 130px;
  height: 130px;
}

#rsingers .singer-info .singer-img {
  margin-bottom: 20px;
  margin-right: 18px;
}
</style>
