<template>
  <div id="student">
    <el-row>
      <el-button type="primary" @click="getStudent">get参数</el-button>
      <el-button type="primary" @click="postStudent">Post参数</el-button>
      <el-input v-model="name" placeholder="请输入内容" style="margin-left: 5px; width:200px"></el-input>
    </el-row>
    <VueTable caption="学生信息表" :cols="cols" :rows="rows" />
  </div>
</template>

<script>
import axios from "@/utils/baseAxios";
import studentApi from "@/api/student";
import VueTable from "@components/VueTable";

export default {
  name: "Student",
  components: {
    VueTable
  },
  data() {
    return {
      cols: [],
      rows: [],
      name: "李连杰"
    };
  },
  created() {
    switch (
      process.env.NODE_ENV // 注意变量名是自定义的
    ) {
      case "development":
        axios.axiosBaseUrl("/consumer");
        break;
      case "production":
        axios.axiosBaseUrl("http://localhost:8055");
        break;
    }

    const _this = this;
    _this.cols = [
      {
        id: 1,
        prop: "name",
        label: "姓名",
        width: 120,
        sort: true,
        fixed: false
      },
      {
        id: 2,
        prop: "age",
        label: "年龄",
        width: 85,
        sort: false,
        fixed: false
      }
    ];

    studentApi
      .getStudents()
      .then(res => {
        _this.rows = res.data;
        _this.rows.push({ name: "甄子丹", age: 40 });
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    getStudent: function() {
      const _this = this;
      studentApi
        .getStudentByName(_this.name)
        .then(res => {
          _this.rows.push(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    postStudent: function() {
      const _this = this;
      studentApi
        .postRequestParam(_this.name)
        .then(res => {
          _this.rows = [];
          _this.rows.push(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="stylus">
#student {
  margin-top: 30px;
  margin-left:auto; margin-right:auto
  width:250px

}
</style>
