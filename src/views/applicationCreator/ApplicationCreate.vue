<template>
  <div class="application">
    <BaseConfig></BaseConfig>
    <RuntimeEnv></RuntimeEnv>
    <el-row class="mainBtnD">
      <el-button>取消</el-button>
      <el-button type="primary">创建</el-button>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
import BaseConfig from './components/baseConfig/BaseConfig'
import RuntimeEnv from './components/runtimeEnvConfig/index'

export default {
  name: 'ApplicationCreate',
  data () {
    return {
    }
  },
  components: {
    BaseConfig,
    RuntimeEnv
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.application {
  padding-bottom: 60px;
  margin: 20px;
}
.baseBlue {
  color:#409eff
}
.margBot15 {
  margin-bottom: 15px;
}
.pad_t10 {
  padding-top: 10px;
}
.el-checkbox {
  margin: 0 10px;
}
.title {
  text-align:right;
  float:right;
  position:relative;
  z-index:9999;
}
.inlineBlock {
  display: inline-block;
}
.left {
  float: left;
}
.right {
  float: right;
}
.icon-q {
  color:#999;
  margin-left:10px;
  font-size: 16px;
}
.tip-text {
  color:#999;
  font-size: 12px;
}
.pointer {
  cursor: pointer;
}
.mainBtnD {
  text-align:right;
  position: fixed;
  bottom:0;right:0;
  width:100%;
  height:80px;
  background:#fff;
  z-index:99999;
  border-top:2px solid #ccc;
  overflow:hidden;
  padding:20px;
}
</style>
