<!-- 筛选 -->
<template>
  <div class="filterCon" :class="size">
    <div class="content-box">
      <div class="item" v-for="item in filterList" :key="item.key">
        <div class="left-label">{{ item.label }}:</div>
        <div class="right-list">
          <div class="item-list"  @click="handleCheck(item.key, '')" :class="{ active: filterValues[item.key] === '' }">
            全部
          </div>
          <div
            class="item-list"
            v-for="option in item.options"
            :key="option.id"
            :class="{ active: filterValues[item.key] === option.id }"
            @click="handleCheck(item.key, option.id)"
          >
            {{ option.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "singleFilter",
  model: {
    prop: "filterData",
    event: "change",
  },
  props: {
    filterList: Array,
    filterData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    size: String
  },
  data() {
    return {
      filterValues: {},
    };
  },
  created() {
    this.filterValues = this.filterData;
  },

  methods: {
    getCheckedIds() {},
    handleCheck(key, id) {
      this.filterValues[key] = id;
      this.$emit("change", this.filterValues);
      this.$emit("search");
    },
  },

  watch: {
    filterData: {
      handler(value) {
        this.filterValues = value;
      },
    },
  },
};
</script>
<style lang="less" scoped>
.small {
  font-size: 14px;
}
.filterCon {
  background: #fff;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .content-box {
    .item {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 20px;
      border-top: 1px solid #eaeaea;
      .right-list {
        display: flex;
        align-items: center;
        .item-list {
          padding: 3px 10px 4px;
          border-radius: 3px;
          color: #666;
          border-radius: 4px;
          cursor: pointer;
        }
        .active {
          background: rgba(22, 125, 243, 0.1);
          color: var(--color-main);
        }
      }
      .left-label {
        padding-right: 10px;
      }
    }
  }
}
</style>
