<template>
  <div class="application">
    <el-card class="box-card margBot15">
      <div class="margBot15">
        <i class="el-icon-s-management" style="color:#409eff"></i>
        <span>基础设置</span>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name">
          <el-input style="width: 60%;" v-model="ruleForm.name"></el-input>
          <span style="color:#999;font-size:12px;">名称为1-64个字符，只能包含数字、英文字符，或 “_”</span>
        </el-form-item>
        <el-form-item label="可用区" required>
          <el-button type="primary">可用区A</el-button>
          <el-tooltip class="item" effect="dark" content="提示文字" placement="right">
            <i class="el-icon-question" style="color:#999;margin-left:10px;"></i>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div class="margBot15">
        <i class="el-icon-s-management" style="color:#409eff"></i>
        <span>运行环境设置</span>
        <el-tooltip class="item" effect="dark" content="提示文字" placement="right">
          <i class="el-icon-question" style="color:#999;margin-left:10px;"></i>
        </el-tooltip>
      </div>
      <div style="text-align:right;float:right;position:relative;z-index:9999;">
        <el-button
          size="small"
          @click="addTab(running.tab.editableTabsValue)"
        >
          添加运行环境
        </el-button>
      </div>
      <el-tabs v-model="running.tab.editableTabsValue" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
          :key="item.name"
          v-for="(item) in running.tab.editableTabs"
          :label="item.title"
          :name="item.name"
        >
          <!-- {{item.content}} -->
          <el-row class="margBot15" style="padding-left:16px;">
            <i class="el-icon-setting"></i>
            <span style="margin-right:20px;font-size:14px;">选择配置项</span>
            <el-checkbox v-model="running.configuration.storage" label="存储" border size="medium"></el-checkbox>
            <el-checkbox v-model="running.configuration.database" label="数据库" border size="medium"></el-checkbox>
            <i class="el-icon-info" style="color:#E6A23C;"></i>
            <span style="color:#999;font-size:14px;">根据实际情况，创建数据库或存储实例，系统会为您自动绑定应用。</span>
          </el-row>
          <div class="margBot15">
            <i class="el-icon-s-management" style="color:#409eff"></i>
            <span>环境设置</span>
          </div>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>应用名-Ret1</span>
            </div>
            <el-form label-width="140px" class="demo-ruleForm">
              <el-form-item label="选择模板/镜像" required>
                <el-tabs v-model="environment.activeName" style="display:inline-block;float:left;">
                  <el-tab-pane label="运行时" name="running">
                    <el-radio-group v-model="environment.template">
                      <el-radio-button label="tomcat">tomcat</el-radio-button>
                      <el-radio-button label="apache">apache</el-radio-button>
                      <el-radio-button label="golang">golang</el-radio-button>
                      <el-radio-button label="nginx">nginx</el-radio-button>
                      <el-radio-button label="node">node</el-radio-button>
                      <el-radio-button label="python">python</el-radio-button>
                      <el-radio-button label="rudy">rudy</el-radio-button>
                      <el-radio-button label="dotnet">dotnet</el-radio-button>
                    </el-radio-group>
                  </el-tab-pane>
                  <el-tab-pane label="我的镜像" name="mirroring">我的镜像</el-tab-pane>
                </el-tabs>
              </el-form-item>
              <el-form-item label="选择版本" required>
                <el-radio-group v-model="environment.versions">
                  <el-radio-button label="版本号1">版本号1</el-radio-button>
                  <el-radio-button label="版本号2">版本号2</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="资源配置" required>
                <el-radio-group v-model="environment.resource" style="float:left;">
                  <el-radio-button label="1核2G" class="margin-r20 noradius border">1核2G</el-radio-button>
                  <el-radio-button label="2核4G" class="margin-r20 noradius border">2核4G</el-radio-button>
                  <el-radio-button label="4核8G" class="noradius border">4核8G</el-radio-button>
                </el-radio-group>
                <el-tooltip class="item" effect="dark" content="提示文字" placement="right">
                  <i class="el-icon-question" style="color:#999;margin-left:10px;"></i>
                </el-tooltip>
              </el-form-item>
              <el-form-item label="子域名" required>
                <el-row style="display:inline-block;width:85%; float:left;">
                  <el-col :span="18">
                    <div style="text-align:center;">
                      <el-input placeholder="请输入内容" v-model="environment.domain">
                        <template slot="prepend">Http://</template>
                        <template slot="append">inatance.paas.casicloud.com</template>
                      </el-input>
                    </div>
                  </el-col>
                  <el-col style="width: 70px;">
                    <div class="bg-purple-light" style="text-align:center;">
                      <div style="border: 1px solid #ccc; border-left:none; color:#909399; height:38px; line-height:38px; background:#F5F7FA;">27017</div>
                    </div>
                  </el-col>
                  <el-col style="width: 70px;">
                    <el-tooltip class="item" effect="dark" content="提示文字" placement="right">
                      <i class="el-icon-question" style="color:#999;margin-left:10px;"></i>
                    </el-tooltip>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'ApplicationCreate',
  data () {
    let validCode = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9|_]{1,64}$/
      if (!reg.test(value)) {
        callback(new Error('名称为1-64个字符，只能包含数字、英文字符，或 “_”'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入应用名称', trigger: 'blur' },
          { validator: validCode, trigger: 'blur' }
        ]
      },
      running: {
        tab: {
          editableTabsValue: '1',
          editableTabs: [{
            title: 'Tab 1',
            name: '1',
            content: 'Tab 1 content'
          }],
          tabIndex: 1
        },
        configuration: {
          storage: false,
          database: false
        }
      },
      environment: {
        activeName: 'running',
        template: 'tomcat',
        versions: '版本号1',
        resource: '1核2G',
        domain: ''
      }
    }
  },
  methods: {
    _show () {
      const a = x => {
        console.log(x)
      }
      a(4)
    },
    addTab (targetName) {
      let newTabName = ++this.running.tab.tabIndex + ''
      this.running.tab.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content'
      })
      this.running.tab.editableTabsValue = newTabName
    },
    removeTab (targetName) {
      let tabs = this.running.tab.editableTabs
      let activeName = this.running.tab.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.running.tab.editableTabsValue = activeName
      this.running.tab.editableTabs = tabs.filter(tab => tab.name !== targetName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.margBot15 {
  margin-bottom: 15px;
}
.pad_t10 {
  padding-top: 10px;
}
.el-checkbox {
  margin: 0 10px;
}
</style>
