<template>
  <div class="storage">
    <div class="margBot15">
      <i class="el-icon-s-management" style="color:#409eff"></i>
      <span>存储</span>
    </div>
    <el-card class="box-card margBot15">
      <div slot="header" class="clearfix">
        <span>应用名-Storage1</span>
        <el-tooltip class="item" effect="dark" content="清空" placement="top">
          <i class="el-icon-circle-close" style="float:right;color:#999;margin-left:10px;font-size:20px;" @click="resetForm('storage')"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="保存" placement="top">
          <i class="el-icon-circle-check" style="float:right;color:#999;margin-left:10px;font-size:20px;" @click="submitForm('storage')"></i>
        </el-tooltip>
      </div>
      <el-form :model="storage" ref="storage" label-width="100px" class="demo-ruleForm">
        <el-form-item label="挂载目录" prop="name" :rules="[{ required: true, message: '请输入挂载目录', trigger: 'blur' }]">
          <el-input style="width: 60%;" v-model="storage.name" placeholder="请输入挂载目录"></el-input>
        </el-form-item>
        <el-form-item label="资源配额" prop="resouceQuota" required>
          <el-radio-group>
            <el-radio-button>自定义</el-radio-button>
          </el-radio-group>
          <el-slider v-bind:marks="storage.marks" :max="storage.max" class="slider" v-model.number="storage.resouceQuota"></el-slider>
          <el-input style="width:50px;" v-model="storage.resouceQuota"></el-input>{{storage.sliderUnit}}
        </el-form-item>
        <el-form-item label="副本数量" prop="optionValue" :rules="[{ required: true, message: '请输入挂载目录', trigger: 'blur' }]">
          <el-select v-model="storage.optionValue" placeholder="请选择">
            <el-option
              v-for="item in storage.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="访问属性" prop="accessAttributes" required>
          <el-radio v-model="storage.accessAttributes" label="1">读写</el-radio>
          <el-radio v-model="storage.accessAttributes" label="2">只读</el-radio>
          <el-tooltip class="item" effect="dark" content="提示文字" placement="right">
            <i class="el-icon-question" style="color:#999;margin-left:10px;"></i>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </el-card>
    <el-button type="primary" :disabled="storage.disabled">添加存储</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Storage',
  data () {
    return {
      storage: {
        name: '',
        resouceQuota: 0,
        max: 20,
        marks: {
          0: '存储',
          20: '20G'
        },
        sliderUnit: 'G',
        transcript: '',
        accessAttributes: '1',
        options: [{
          value: '选项1',
          label: '1'
        }, {
          value: '选项2',
          label: '2'
        }, {
          value: '选项3',
          label: '3'
        }],
        optionValue: '',
        disabled: true
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.storage.disabled = false
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.storage.disabled = true
    }
  }
}
</script>

<style lang="less" scoped>
  .margBot15{
    margin-bottom: 15px;
  }
  .slider{
    width: 300px;
    display:inline-block;
    vertical-align:middle;
    height:50px;
    margin:0 30px;
  }
</style>
