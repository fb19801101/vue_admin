<template>
  <div id="curve-element">
    <h3>{{ caption }}</h3>

    <el-table
      :data="
        rows.filter(
          data =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      border
      stripe
      height="950px"
      @selection-change="handleSelectionChange"
      :header-row-class-name="tableHeaderClassName"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column
        v-for="col in columns"
        :key="col.id"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :sortable="col.sort"
        :fixed="col.fixed"
      >
      </el-table-column>

      <el-table-column width="160" align="right">
        <template v-slot:header="scope">
          <el-input
            v-model="search"
            size="mini"
            width="100%"
            placeholder="输入关键字搜索"
          />
        </template>
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CurveElement",
  data() {
    return {
      multipleSelection: [],
      search: ""
    };
  },
  props: {
    caption: String,
    columns: Array,
    rows: Array
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    tableHeaderClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "header-row";
      } else {
        if (rowIndex % 2 === 1) {
          return "single-row";
        } else {
          return "double-row";
        }
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style>
.el-table .header-row th {
  background-color: #009688 !important;
  color: #fff !important;
}
.el-table .single-row td {
  background: #dadada !important;
}
.el-table .double-row td {
  background: #eeeeee !important;
}
/* 背景颜色 */
.bg-red {
  background-color: #ff5722 !important;
  color: #fff !important;
} /*赤*/
.bg-orange {
  background-color: #ffb800 !important;
  color: #fff !important;
} /*橙*/
.bg-green {
  background-color: #009688 !important;
  color: #fff !important;
} /*绿*/
.bg-cyan {
  background-color: #2f4056 !important;
  color: #fff !important;
} /*青*/
.bg-blue {
  background-color: #1e9fff !important;
  color: #fff !important;
} /*蓝*/
.bg-black {
  background-color: #393d49 !important;
  color: #fff !important;
} /*黑*/
.bg-gray {
  background-color: #eee !important;
  color: #666 !important;
} /*灰*/
</style>
