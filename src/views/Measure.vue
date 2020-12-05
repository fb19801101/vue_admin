<template>
  <div id="measure">
    <el-row>
      <el-button type="primary" @click="insertCurveElement"
        >添加曲线要素</el-button
      >
      <el-button type="primary" @click="modifyCurveElement"
        >修改曲线要素</el-button
      >
      <el-button type="primary" @click="deleteCurveElement"
        >删除曲线要素</el-button
      >
      <el-button type="primary" @click="selectCurveLine"
        >获取曲线信息</el-button
      >
      <el-button type="primary" @click="selectCurveElement"
        >获取曲线要素</el-button
      >
      <el-button type="primary" @click="countCurveElement"
        >统计曲线要素</el-button
      >
      <el-button type="primary" @click="searchCurveElement"
        >查找曲线要素</el-button
      >
      <el-button type="primary" @click="clearCurveElement"
        >清空曲线要素</el-button
      >
    </el-row>
    <el-row>
      <el-button type="success" plain @click="initCurveElement"
        >初始化曲线要素</el-button
      >
      <el-button type="success" plain @click="importExcelCurveElement"
        >导入曲线要素</el-button
      >
      <el-button type="success" plain @click="exportExcelCurveElement"
        >导出曲线要素</el-button
      >
      <el-button type="success" plain @click="calculateCoordinate"
        >计算曲线坐标</el-button
      >
    </el-row>
    <CurveElement caption="曲线要素表" :columns="cols" :rows="rows" />
  </div>
</template>

<script>
import axios from "@/utils/baseAxios";
import CurveElementApi from "@/api/CurveElement";
import CurveElement from "@/components/CurveElement";

export default {
  name: "Measure",
  components: {
    CurveElement
  },
  data() {
    return {
      cols: [],
      rows: []
    };
  },
  created() {
    switch (
      process.env.NODE_ENV // 注意变量名是自定义的
    ) {
      case "development":
        axios.axiosBaseUrl("/curve-element");
        break;
      case "production":
        axios.axiosBaseUrl(process.env.VUE_APP_REQUEST_URL);
        break;
    }

    const _this = this;
    _this.cols = [
      {
        id: 1,
        prop: "ceId",
        label: "序号",
        width: 60,
        sort: true,
        fixed: false
      },
      {
        id: 2,
        prop: "ceJd",
        label: "交点编号",
        width: 100,
        sort: true,
        fixed: false
      },
      {
        id: 3,
        prop: "ceDk",
        label: "交点里程",
        width: 100,
        sort: true,
        fixed: false
      },
      {
        id: 4,
        prop: "ceEx",
        label: "交点坐标",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 5,
        prop: "ceNy",
        label: "交点坐标",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 6,
        prop: "ceT1",
        label: "前切线长",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 7,
        prop: "ceT2",
        label: "后切线长",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 8,
        prop: "ceR1",
        label: "前缓和曲线半径",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 9,
        prop: "ceR2",
        label: "后缓和曲线半径",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 10,
        prop: "ceA1",
        label: "前缓和曲线参数",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 11,
        prop: "ceA2",
        label: "后缓和曲线参数",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 12,
        prop: "ceLs1",
        label: "前缓和曲线长",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 13,
        prop: "ceLs2",
        label: "后缓和曲线长",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 14,
        prop: "ceRc",
        label: "圆曲线半径",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 15,
        prop: "ceLc",
        label: "圆曲线长",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 16,
        prop: "ceLz",
        label: "夹直线长",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 17,
        prop: "ceE",
        label: "外失距",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 18,
        prop: "cePj",
        label: "偏角",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 19,
        prop: "ceFwj",
        label: "方位角",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 20,
        prop: "ceQd",
        label: "起点里程",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 21,
        prop: "ceZh",
        label: "直缓里程",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 22,
        prop: "ceHy",
        label: "缓圆里程",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 23,
        prop: "ceYh",
        label: "圆缓里程",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 24,
        prop: "ceHz",
        label: "缓直里程",
        width: 100,
        sort: false,
        fixed: false
      },
      {
        id: 25,
        prop: "ceZd",
        label: "终点里程",
        width: 100,
        sort: false,
        fixed: false
      }
    ];

    CurveElementApi.selectCurveElement()
      .then(res => {
        _this.rows = res.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    insertCurveElement: function() {
      CurveElementApi.insertCurveElement({})
        .then(res => {
          alert(res.data.code);
        })
        .catch(err => {
          console.log(err);
        });
    },
    modifyCurveElement: function() {
      CurveElementApi.modifyCurveElement({})
        .then(res => {
          alert(res.data.code);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteCurveElement: function() {
      CurveElementApi.deleteCurveElement("", "")
        .then(res => {
          alert(res.data.code);
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectCurveLine: function() {
      CurveElementApi.selectCurveLine()
        .then(res => {
          alert(res.data.code);
        })
        .catch(err => {
          console.log(err);
        });
    },
    selectCurveElement: function() {
      CurveElementApi.selectCurveElement()
        .then(res => {
          alert(res.data.code);
        })
        .catch(err => {
          console.log(err);
        });
    },
    countCurveElement: function() {
      CurveElementApi.countCurveElement()
        .then(res => {
          alert(res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    searchCurveElement: function() {
      CurveElementApi.searchCurveElement("ce_JD", "JD22", 1, 10)
        .then(res => {
          alert(res.data.code);
        })
        .catch(err => {
          console.log(err);
        });
    },
    clearCurveElement: function() {
      CurveElementApi.clearCurveElement()
        .then(res => {
          alert(res.data.code);
        })
        .catch(err => {
          console.log(err);
        });
    },
    initCurveElement: function() {
      CurveElementApi.initCurveElement("", 0, 0)
        .then(res => {
          alert(res.data.code);
        })
        .catch(err => {
          console.log(err);
        });
    },
    importExcelCurveElement: function() {
      CurveElementApi.importExcelCurveElement("")
        .then(res => {
          alert(res.data.code);
        })
        .catch(err => {
          console.log(err);
        });
    },
    exportExcelCurveElement: function() {
      CurveElementApi.exportExcelCurveElement()
        .then(res => {
          alert(res.data.code);
        })
        .catch(err => {
          console.log(err);
        });
    },
    calculateCoordinate: function() {
      CurveElementApi.calculateCoordinate(0, "", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
        .then(res => {
          alert(res.data.code);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="stylus">
#measure {
  margin-top: 30px;
  margin-left:auto; margin-right:auto
  width:95%
}

button {
  margin-left: 5px;
}
div {
  margin-top: 5px;
}
</style>
