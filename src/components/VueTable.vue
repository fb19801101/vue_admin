<template>
  <div id="vue-table">
    <el-row type="flex" justify="space-between">
      <el-col :span="4">
        <el-button-group v-if="toolbar.left">
          <el-button
            v-for="(btn, idx) in buttons.left"
            :key="idx"
            :size="btn.size"
            :icon="btn.icon"
            @click="handleRow(btn.param, btn.event)"
          ></el-button>
        </el-button-group>
      </el-col>
      <el-col :span="4">
        <el-input
          v-model="input"
          placeholder="请输入搜索内容"
          @input="handleInput"
          size="mini"
          v-if="toolbar.search"
        ></el-input>
      </el-col>
      <el-col :span="8">
        <el-tag>{{ caption }}</el-tag>
      </el-col>
      <el-col :span="5"> </el-col>
      <el-col :span="3">
        <el-button-group v-if="toolbar.right">
          <el-button
            v-for="(btn, idx) in buttons.right"
            :key="idx"
            :size="btn.size"
            :icon="btn.icon"
            @click="handleRow(btn.param, btn.event)"
          ></el-button>
        </el-button-group>
      </el-col>
    </el-row>

    <el-table
      header-row-class-name="table-header"
      :data="input.length === 0 ? rows : tables"
      :key="refresh"
      border
      stripe
      :show-summary="summary"
      :summary-method="handleSummary"
      :span-method="handleSpan"
      @sort-change="handleSort"
      style="width: 100%"
      empty-text=" "
    >
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column
        v-for="(col, index) in cols"
        :v-if="col.hide ? Boolean(false) : Boolean(true)"
        :key="index"
        :prop="col.prop"
        :align="col.center ? 'center' : 'left'"
        :align-header="col.center ? 'center' : 'left'"
        :label="col.label"
        :show-overflow-tooltip="col.overflow ? Boolean(true) : Boolean(false)"
        :sortable="col.sort"
        min-width="50"
        :width="col.width"
        :filters="col.filters"
        :filter-method="col.filters != null ? handleFilter : null"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <span :class="renderClass(scope.row[col.prop], col.render)">{{
            scope.row[col.prop]
          }}</span>
          <el-button-group v-for="(it, idx) in col.slot" :key="idx">
            <el-button
              @click="handleRow(scope.row, it.type)"
              type="primary"
              size="mini"
              plain
              >{{ it.name }}</el-button
            >
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <div class="feedback" v-show="feedback">
      <i
        v-show="feedback === 'loading'"
        class="load-icon-item el-icon-loading"
      ></i>
      <span v-if="feedback === 'error' || feedback === 'empty'">{{
        feedback === "error"
          ? "获取数据失败"
          : feedback === "empty"
          ? "暂无数据"
          : ""
      }}</span>
    </div>

    <div class="page-box" v-if="page.size !== 1000">
      <el-pagination
        @current-change="handlePage"
        :current-page.sync="page.cur"
        :page-size="page.size"
        layout="total, prev, pager, next"
        :total="page.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "VueTable",
  props: {
    caption: {
      type: String,
      default: ""
    },
    /*
     *   表格配置【cols】：接受一个<<对象数组>>
     *   字段说明：
     *   【hide】 => Boolean（非必填）=> default: false，为<true>时该列隐藏
     *   【label】 => String（必填） => 表头名称
     *   【prop】 => String（非必填） => 对应单元格的字段 => 有【slot】时不填，否则必填
     *   【render】 => Array（非必填） => 根据单元格内容给出对应的类名
     *              接受一个<<对象数组>>
     *              字段说明：
     *             【myTarget】 => String/Number（必填） => 比较的对象
     *             【myClass】 => String（必填） => 满足条件时的类名
     *             【mode】 => String（非必填） => 比较方法:
     *                                           'more' => 大于【myTarget】的值
     *                                           'less' => 小于【myTarget】的值
     *                                           不填【mode】 => 等于【myTarget】的值
     *    【slot】 => Array（非必填） => 对应单元格的操作
     *              接受一个<<对象数组>>
     *              字段说明：
     *              【type】 => String（必填） => 操作类型
     *              【name】 => String（必填） => 名字
     *    【filters】 => Array（非必填） => 对应列的筛选操作
     *              接受一个<<对象数组>>
     *              字段说明：
     *              【text】 => String（必填） => 筛选文字
     *              【value】 => String（必填） => 筛选变量值
     *     【sort】 => String => 排序 custom
     *     【center】 => Boolean => default: false => 为<true>时该列居中对齐, 默认局左对齐
     *     【overflow】 => Boolean => default: false => 为<true>时内容溢出隐藏
     */
    cols: {
      type: Array,
      default: () => {
        return [];
      }
    },
    rows: {
      // 表格数据
      type: Array,
      default: () => {
        return [];
      }
    },
    page: {
      // 页数配置
      type: Object,
      default: () => {
        return {
          total: 0, // 数据量
          size: 20, // 每页数据量
          cur: 1 // 当前页
        };
      }
    },
    feedback: {
      // 用户体验反馈 => 'loading'-加载中， 'empty'-暂无数据,  'error'-获取数据失败
      type: String,
      default: ""
    },
    toolbar: {
      // 是否有工具啦
      type: Object,
      default: () => {
        return {
          search: false,
          left: false,
          right: false
        };
      }
    },
    buttons: {
      // 是否有工具啦
      type: Object,
      default: () => {
        return {
          left: [
            {
              size: "mini",
              icon: "el-icon-setting",
              event: "click",
              param: null
            },
            {
              size: "mini",
              icon: "el-icon-search",
              event: "click",
              param: null
            },
            {
              size: "mini",
              icon: "el-icon-refresh",
              event: "click",
              param: null
            },
            {
              size: "mini",
              icon: "el-icon-upload2",
              event: "click",
              param: null
            },
            {
              size: "mini",
              icon: "el-icon-download",
              event: "click",
              param: null
            }
          ],
          right: [
            { size: "mini", icon: "el-icon-edit", event: "click", param: null },
            {
              size: "mini",
              icon: "el-icon-delete",
              event: "click",
              param: null
            },
            {
              size: "mini",
              icon: "el-icon-share",
              event: "click",
              param: null
            },
            {
              size: "mini",
              icon: "el-icon-printer",
              event: "click",
              param: null
            }
          ]
        };
      }
    },
    filters: {
      type: Array,
      default: () => {
        return [{ prop: "ceJd" }, { prop: "ceDk" }];
      }
    },
    summary: {
      type: Boolean,
      default: false
    },
    refresh: {
      type: String,
      default: ""
    }
  },
  data() {
    return { input: "", tables: [] };
  },
  methods: {
    // 操作
    handleRow(row, type) {
      this.$emit("handleRow", row, type);
    },
    // 排序
    handleSort({ prop, order }) {
      this.$emit("handleSort", prop, order);
    },
    // 类名
    renderClass(target, renderList) {
      let myClass = "",
        firstRender = false;
      if (!renderList) return;
      renderList.forEach(item => {
        if (!item.mode && item.myTarget === target) {
          if (firstRender) {
            myClass += " " + item.myClass;
          } else {
            myClass += item.myClass;
            firstRender = true;
          }
        } else if (item.mode === "more" && target > item.myTarget) {
          if (firstRender) {
            firstRender = true;
            myClass += " " + item.myClass;
          } else {
            myClass += item.myClass;
            firstRender = true;
          }
        } else if (item.mode === "less" && target < item.myTarget) {
          if (firstRender) {
            myClass += " " + item.myClass;
          } else {
            myClass += item.myClass;
            firstRender = true;
          }
        }
      });
      return myClass;
    },
    // 切换页数
    handlePage(value) {
      this.$emit("handlePage", value);
    },
    // 合计行
    handleSummary(param) {
      this.$emit("handlePage", param);
    },
    // 合计行
    handleSpan(param) {
      this.$emit("handleSpan", param);
    },
    // 过滤行
    handleFilter(value, row, column) {
      this.$emit("handleFilter", value, row, column);
    },
    // 过滤行
    handleInput(value) {
      this.$emit("handleInput", value);
    }
  },
  watch: {
    //computed/watch
    // eslint-disable-next-line no-unused-vars
    input: function(val, oldVal) {
      let _this = this;
      _this.tables = _this.rows.filter(item => {
        // return ~item.ceJd.indexOf(val);
        let ret = false;
        for (let i = 0; i < _this.filters.length; i++) {
          let _ret = item[_this.filters[i].prop].toString().includes(val);
          ret = ret || _ret;
        }

        return ret;
      });
    }
  }
};
</script>

<style>
#vue-table {
  position: relative;
}
#vue-table .table-header {
  background-color: #f5f7fa;
  font-size: 13px;
  color: #6f7683;
  font-weight: bold;
}
#vue-table .el-table {
  border: 1px solid #e6ebf5;
  border-bottom: none;
}
#vue-table .el-table th,
#vue-table .el-table td {
  padding: 8px 0;
}
#vue-table .el-table th {
  background-color: #f5f7fa;
}
#vue-table .el-table th:first-child .cell {
  padding-left: 20px;
}
#vue-table .el-table tbody tr td:first-child .cell {
  padding-left: 20px;
}
#vue-table .caret-wrapper {
  height: 19px;
}
#vue-table .sort-caret.ascending {
  top: -3px;
}
#vue-table .sort-caret.descending {
  bottom: 0;
}
#vue-table .el-table:before {
  z-index: 0;
}
#vue-table .el-button--text {
  font-size: 13px;
  color: #60c0bd;
}
#vue-table .el-button--small,
#vue-table .el-button--small.is-round {
  padding: 0;
}
#vue-table .feedback {
  height: 60px;
  line-height: 60px;
  position: absolute;
  top: 40px;
  width: 100%;
  text-align: center;
}
#vue-table .feedback i {
  font-size: 20px;
}
#vue-table .feedback span {
  font-size: 14px;
  color: #909399;
}
#vue-table .page-box {
  height: 70px;
  padding-top: 30px;
  position: relative;
}
#vue-table .page-box .el-pagination {
  float: right;
}
#vue-table .page-box .el-pagination .el-pagination__total {
  position: absolute;
  left: 10px;
}
#vue-table .page-box .el-pagination .el-pager li {
  min-width: 24px;
  height: 24px;
  line-height: 24px;
  padding: 0 6px;
  font-size: 12px;
  color: #555;
  border-radius: 4px;
  text-align: center;
  margin: 0 5px;
}
#vue-table .page-box .el-pagination .el-pager li.active {
  color: #60c0bd;
  background-color: #e7f6f5;
}
#vue-table .page-box .el-pagination button .el-icon {
  margin-top: -2px;
}
#vue-table .page-box .el-pagination button .el-icon:before {
  font-size: 18px;
  color: #555;
  font-weight: normal;
}
#vue-table .page-box .el-pagination button:disabled .el-icon:before {
  color: #e5e5e5;
}
#vue-table .el-table .header-row th {
  background-color: #009688 !important;
  color: #fff !important;
}
#vue-table .el-table .single-row td {
  background: #dadada !important;
}
#vue-table .el-table .double-row td {
  background: #eeeeee !important;
}
/* 背景颜色 */
#vue-table .bg-red {
  background-color: #ff5722 !important;
  color: #fff !important;
} /*赤*/
#vue-table .bg-orange {
  background-color: #ffb800 !important;
  color: #fff !important;
} /*橙*/
#vue-table .bg-green {
  background-color: #009688 !important;
  color: #fff !important;
} /*绿*/
#vue-table .bg-cyan {
  background-color: #2f4056 !important;
  color: #fff !important;
} /*青*/
#vue-table .bg-blue {
  background-color: #1e9fff !important;
  color: #fff !important;
} /*蓝*/
#vue-table .bg-black {
  background-color: #393d49 !important;
  color: #fff !important;
} /*黑*/
#vue-table .bg-gray {
  background-color: #eee !important;
  color: #666 !important;
} /*灰*/
</style>
