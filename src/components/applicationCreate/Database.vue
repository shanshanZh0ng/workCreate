<template>
  <div class="database">
    <div class="margBot15">
      <i class="el-icon-s-management" style="color:#409eff"></i>
      <span>数据库</span>
    </div>
    <el-card class="box-card margBot15">
      <div slot="header" class="clearfix">
        <span>应用名-database1</span>
        <el-tooltip class="item" effect="dark" content="清空" placement="top">
          <i class="el-icon-circle-close" style="float:right;color:#999;margin-left:10px;font-size:20px;" @click="resetForm('database')"></i>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="保存" placement="top">
          <i class="el-icon-circle-check" style="float:right;color:#999;margin-left:10px;font-size:20px;" @click="submitForm('database')"></i>
        </el-tooltip>
      </div>
      <el-form :model="database" :rules="rules" ref="database" label-width="100px" class="demo-ruleForm">
        <el-form-item label="资源配额" prop="resouceQuota" required>
          <el-radio-group>
            <el-radio-button>自定义</el-radio-button>
          </el-radio-group>
          <el-slider v-bind:marks="database.marks" :max="database.max" class="slider" v-model.number="database.resouceQuota"></el-slider>
          <el-input style="width:50px;" v-model="database.resouceQuota"></el-input>{{database.sliderUnit}}
        </el-form-item>
        <el-form-item label="镜像" required>
          <el-col :span="6">
            <el-form-item prop="typeOption">
              <el-select v-model="database.typeOption" placeholder="请选择镜像类别">
                <el-option
                  v-for="item in database.option.types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="versionsOption">
              <el-select v-model="database.versionsOption" placeholder="请选择镜像版本">
                <el-option
                  v-for="item in database.option.versions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="账号" prop="name" :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]">
          <el-input style="width: 50%;" v-model="database.name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input style="width: 50%;" v-model="database.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <el-button type="primary" :disabled="database.disabled">添加存储</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'Database',
  data () {
    let password = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9]{8,16}$/
      if (!reg.test(value)) {
        callback(new Error('名称为8-16字符，只能包含数字、大小写英文字符'))
      } else {
        callback()
      }
    }
    return {
      database: {
        name: '',
        password: '',
        resouceQuota: 0,
        max: 20,
        marks: {
          0: '存储',
          20: '20G'
        },
        sliderUnit: 'G',
        transcript: '',
        accessAttributes: '1',
        option: {
          types: [{
            value: '选项1',
            label: '1'
          }, {
            value: '选项2',
            label: '2'
          }, {
            value: '选项3',
            label: '3'
          }],
          versions: [{
            value: '选项1',
            label: '1'
          }, {
            value: '选项2',
            label: '2'
          }, {
            value: '选项3',
            label: '3'
          }]
        },
        typeOption: '',
        versionsOption: '',
        disabled: true
      },
      rules: {
        typeOption: [
          { required: true, message: '请选择镜像类别', trigger: 'blur' }
        ],
        versionsOption: [
          { required: true, message: '请选择镜像版本', trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 8, max: 16, validator: password, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.database.disabled = false
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.database.disabled = true
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
