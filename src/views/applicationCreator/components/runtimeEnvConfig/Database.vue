<template>
  <div class="database">
    <Card :title="title" :addBtn="addBtn" :btnDiabled="database.disabled" :cardName="cardName" @on-submit="submitForm" @on-reset="resetForm">
      <el-form
        :model="database"
        :rules="rules"
        ref="database"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="资源配额"
          required
        >
          <el-radio-group>
            <el-radio-button>自定义</el-radio-button>
          </el-radio-group>
          <el-form-item
            style="min-width: 300px;"
            class="inlineBlock"
            v-for="(item) in database.sliderData"
            :key="item.name"
            prop="defaultNum"
          >
            <el-slider
              :marks="{0:`${item.name}`}"
              :max="item.max"
              class="slider"
              v-model.number="item.defaultNum"
            ></el-slider>
            <el-input
              style="width:50px;"
              v-model="item.defaultNum"
            ></el-input>{{item.unit}}
          </el-form-item>

        </el-form-item>
        <el-form-item
          label="镜像"
          required
        >
          <el-col :span="6">
            <el-form-item prop="typeOption">
              <el-select
                v-model="database.typeOption"
                placeholder="请选择镜像类别"
              >
                <el-option
                  v-for="item in database.option.types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="versionsOption">
              <el-select
                v-model="database.versionsOption"
                placeholder="请选择镜像版本"
              >
                <el-option
                  v-for="item in database.option.versions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item
          label="账号"
          prop="name"
          :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]"
        >
          <el-input
            style="width: 50%;"
            v-model="database.name"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            style="width: 50%;"
            v-model="database.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
    </Card>
  </div>
</template>

<script type="text/ecmascript-6">
import Card from '@/components/card'

const formName = 'database'

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
      title: '数据库',
      cardName: 'database',
      addBtn: '添加数据库',
      database: {
        name: '',
        password: '',
        sliderData: [
          { max: 20, defaultNum: 0, unit: '核', name: 'CPU' },
          { max: 20, defaultNum: 0, unit: 'G', name: '内存' },
          { max: 20, defaultNum: 0, unit: 'G', name: '存储' }
        ],
        option: {
          types: [
            {
              value: '选项1',
              label: '1'
            },
            {
              value: '选项2',
              label: '2'
            }
          ],
          versions: [
            {
              value: '选项1',
              label: '1'
            },
            {
              value: '选项2',
              label: '2'
            }
          ]
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
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 16, validator: password, trigger: 'blur' }
        ]
      }
    }
  },

  components: {
    Card
  },
  methods: {
    submitForm () {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.database.disabled = false
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.$refs[formName].model.sliderData.forEach(function (v, i) {
        v.defaultNum = 0
      })
      this.$refs[formName].resetFields()
      this.database.disabled = true
    }
  }
}
</script>

<style lang="less" scoped>
</style>
