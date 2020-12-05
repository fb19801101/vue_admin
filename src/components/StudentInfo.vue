<template>
  <div id="student">
    <el-tag style="font-size:20px">{{ caption }}</el-tag>

    <el-table
      :data="
        rows.filter(
          data =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      border
      stripe
      @selection-change="handleSelectionChange"
      :header-row-class-name="tableRowClassName"
      :row-class-name="tableRowClassName"
      style="margin-top:10px; width: 100%;"
    >
      <el-table-column type="selection" width="50"> </el-table-column>

      <el-table-column
        v-for="col in cols"
        :key="col.id"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :sortable="col.sort"
        :fixed="col.fixed"
      >
      </el-table-column>

      <el-table-column prop="tel" label="电话" width="120">
        <template v-slot="scope">
          12345678900
        </template>
      </el-table-column>

      <el-table-column width="200" align="right">
        <template v-slot:header="scope">
          <el-input
            v-model="search"
            size="mini"
            width="80px"
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
  name: "StudentInfo",
  data() {
    return {
      multipleSelection: [],
      search: ""
    };
  },
  props: {
    caption: String,
    cols: Array,
    rows: Array
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    tableRowClassName({ row, rowIndex }) {
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
  background: #c0c0c0 !important;
}

.el-table .single-row td {
  background: #dadada !important;
}

.el-table .double-row td {
  background: #eeeeee !important;
}
</style>
