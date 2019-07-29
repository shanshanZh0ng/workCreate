<template>
  <div class="storage" v-bind="storages">
    <div class="margBot15 pad_t10" v-show="smallStorage">
      <i class="el-icon-s-management baseBlue"></i>
      <span>{{title}}</span>
    </div>
    <!-- <div v-for="storage in storages" :key="storage.id"> -->
      <el-collapse-transition>
        <Card v-show="!smallStorage" :title="title" :cardName="cardName" :addBtn="addBtn" :btnDiabled="storage.disabled" @on-submit="submitForm" @on-reset="resetForm" @on-add="addForm" :nameIndex="$attrs.nameIndex">
          <el-form
            :model="storage"
            ref="storage"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="存储名称" prop="ueserName" :rules="rules.name">
              <el-input style="width: 50%;" v-model="storage.ueserName"></el-input>
              <span class="tip-text">名称为1-64个字符，只能包含数字、英文字符，或 “_”</span>
            </el-form-item>
            <el-form-item
              label="挂载目录"
              prop="name"
              :rules="[{ required: true, message: '请输入挂载目录', trigger: 'blur' }]"
            >
              <el-input
                style="width: 50%;"
                v-model="storage.name"
                placeholder="请输入挂载目录"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="资源配额"
              required
            >
              <el-radio-group>
                <el-radio-button>自定义</el-radio-button>
              </el-radio-group>
              <el-slider
                v-bind:marks="storage.marks"
                :max="storage.max"
                class="slider"
                v-model.number="storage.resouceQuota"
              ></el-slider>
              <el-input
                style="width:50px;"
                v-model="storage.resouceQuota"
              ></el-input>{{storage.sliderUnit}}
            </el-form-item>
            <el-form-item
              label="副本数量"
              prop="optionValue"
              :rules="[{ required: true, message: '请输入挂载目录', trigger: 'blur' }]"
            >
              <el-select
                v-model="storage.optionValue"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in storage.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="访问属性"
              prop="accessAttributes"
              required
            >
              <el-radio
                v-model="storage.accessAttributes"
                label="1"
              >读写</el-radio>
              <el-radio
                v-model="storage.accessAttributes"
                label="2"
              >只读</el-radio>
              <el-tooltip
                class="item"
                effect="dark"
                content="提示文字"
                placement="right"
              >
                <i
                  class="el-icon-question icon-q"
                ></i>
              </el-tooltip>
            </el-form-item>
          </el-form>
        </Card>
      </el-collapse-transition>
      <div v-show="smallStorage">
        <div class="smallStorage">
          <span>{{storage.ueserName}}</span>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <i class="el-icon-circle-close iconSize pointer" @click="resetForm"></i>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <i class="el-icon-edit-outline iconSize pointer" @click="smallStorage = !smallStorage"></i>
          </el-tooltip>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script type="text/ecmascript-6">
import Card from '@/components/card'
// import {ueserName} from '@/views/validator'

let formName = 'storage'
// const defaultStorage = Object.create(null)

export default {
  name: 'Storage',
  // props: {
  //   nameIndex: {
  //     type: Number,
  //     default: 1
  //   }
  // },
  data () {
    let ueserName = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9|_]{1,64}$/
      if (!reg.test(value)) {
        callback(new Error('名称为1-64个字符，只能包含数字、英文字符，或 “_”'))
      } else {
        callback()
      }
    }
    return {
      title: '存储',
      cardName: 'storage',
      addBtn: '添加存储',
      rules: {
        name: [
          { required: true, message: '请输入应用名称', trigger: 'blur' },
          { validator: ueserName, trigger: 'blur' }
        ]
      },
      smallStorage: false,
      storage: {
        ueserName: '',
        name: '',
        resouceQuota: 0,
        max: 20,
        marks: {
          0: '存储',
          20: '20G'
        },
        sliderUnit: 'G',
        accessAttributes: '1',
        options: [
          {
            value: '选项1',
            label: '1'
          },
          {
            value: '选项2',
            label: '2'
          }
        ],
        optionValue: '',
        disabled: true
      },
      storages: [{
        id: 1,
        ueserName: '',
        name: '',
        resouceQuota: 0,
        max: 20,
        marks: {
          0: '存储',
          20: '20G'
        },
        sliderUnit: 'G',
        accessAttributes: '1',
        options: [
          {
            value: '选项1',
            label: '1'
          },
          {
            value: '选项2',
            label: '2'
          }
        ],
        optionValue: '',
        disabled: true
      }]
    }
  },
  components: {
    Card
  },
  mounted () {
    // console.log(this.storage)
    // this.storages.push(this.storage)
    let id = this.storage.id
    let _add = false
    let _index = 0
    let _len = this.storages.length
    this.storages.push(this.storage)
    console.log(this.storages)
    this.storages.map((val, index) => {
      console.log(val)
      if (id === val.id) {
        _add = _add || true
        _index = index
      }
    })
    if (_add) {
      this.storages[_index] = this.storage
    } else {
      // this.storages.insert(_len - 2, this.storage)
      // this.storages[_len - 2].id = this.storages.length
    }
  },
  methods: {
    submitForm () {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.storage.disabled = false
          this.editName = this.storage.ueserName
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.$refs[formName].model.resouceQuota = 0
      this.$refs[formName].resetFields()
      this.storage.disabled = true
      // this.defaultStorage = this.storage
    },
    addForm () {
      this.smallStorage = true
      // console.log(this.storage)
      // let id = this.storage.id
      // let _add = false
      // let _index = 0
      // let _len = this.storages.length
      // this.storages.push(this.storage)
      // this.storages.forEach((val, index) => {
      //   if (id === val.id) {
      //     _add = _add || true
      //     _index = index
      //   }
      // })
      // if (_add) {
      //   this.storages[_index] = this.storage
      // } else {
      //   this.storages.insert(_len - 2, this.storage)
      // }
      console.log(this.storages)
    },
    editForm () {
      this.smallStorage = false
    }
  },
  watch: {
    'storage': function (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="less" scoped>
  .smallStorage {
    padding: 10px;
    height: 20px;
    width: 300px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
</style>
