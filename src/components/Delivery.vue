<template>
  <div>

    <div class="opt-panel">
      <el-row>

        <el-col :span="2">
          <el-select v-model="searchTypeValue" filterable clearable placeholder="请选择">
            <el-option
              v-for="item in searhTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>

        <el-col :span="4" :offset="1">
          <el-input placeholder="搜索" icon="search"
                    v-model="keyword" @keyup.enter.native="listUserCouponsData">
          </el-input>
        </el-col>

      </el-row>

    </div>

    <el-card class="box-card">

      <el-table :data="userCouponsData" style="width: 100%">

        <el-table-column prop="id" label="ID">
        </el-table-column>

        <!--<el-table-column prop="userId" label="用户主键">-->
        <!--</el-table-column>-->

        <el-table-column prop="wName" label="用户名">
        </el-table-column>

        <!--<el-table-column prop="couponId" label="券主键">-->
        <!--</el-table-column>-->

        <el-table-column prop="code" label="券码">
        </el-table-column>

        <el-table-column prop="price" label="价钱">
        </el-table-column>

        <el-table-column prop="phoneNumber" label="手机">
        </el-table-column>

        <el-table-column prop="address" label="地址">
        </el-table-column>

        <el-table-column prop="logisticsNumber" label="物流">
          <template scope="scope">
            <a :href="getUrl(scope.row.logisticsNumber)" target="_blank">
            {{getExpressageInfo(scope.row.logisticsNumber)}}
            </a>
          </template>
        </el-table-column>

        <el-table-column prop="getTime" label="领取时间">
          <template scope="scope">
            {{formatDateTime(scope.row.getTime)}}
          </template>
        </el-table-column>

        <el-table-column prop="deliveryTime" label="发货时间">
          <template scope="scope">
            {{formatDateTime(scope.row.deliveryTime)}}
          </template>
        </el-table-column>

        <el-table-column prop="status" label="操作">
          <template scope="scope">
            <el-button :plain="true" type="primary" size="small"
                       @click="showDeliverDialog(scope.row.id, scope.row.logisticsNumber)">发货</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-button type="text" @click="pre" :disabled="page.pageNum <= 1">< 上一页</el-button>
      <el-button type="text" @click="next">下一页 ></el-button>

    </el-card>

    <el-dialog title="发货" :visible.sync="deliverDialogVisible">
      <el-form :model="form" label-width="100px">
        <el-form-item label="主键" v-show="false">
          <el-input v-model="form.id" style="width: 320px"></el-input>
        </el-form-item>
        <el-form-item label="快递公司" >
          <el-select v-model="form.expressageCompany" filterable clearable placeholder="请选择">
            <el-option v-for="item in expressages" :key="item.code"
                       :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递单号" >
          <el-input v-model="form.expressageNumber" type="number" style="width: 320px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deliverDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deliver">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'delivery',
    data () {
      return {
        searchTypeValue: '',
        searhTypes: [
          {
            label: '手机号',
            value: 1
          }, {
            label: '微信名',
            value: 2
          }, {
            label: '优惠码',
            value: 3
          }
        ],
        userCouponsData: [],
        page: {
          pageNum: 1,
          pageSize: 10
        },
        keyword: '',
        deliverDialogVisible: false,
        form: {
          id: '',
          expressageCompany: '',
          expressageNumber: ''
        },
        expressages: [
          {
            'code': 'yunda',
            'name': '韵达快运'
          },
          {
            'code': 'shunfeng',
            'name': '顺丰'
          },
          {
            'code': 'yuantong',
            'name': '圆通速递'
          },
          {
            'code': 'debangwuliu',
            'name': '德邦物流'
          },
          {
            'code': 'shentong',
            'name': '申通'
          },
          {
            'code': 'zhongtong',
            'name': '中通速递'
          },
          {
            'code': 'ems',
            'name': 'ems快递'
          },
          {
            'code': 'guotongkuaidi',
            'name': '国通快递'
          },
          {
            'code': 'quanfengkuaidi',
            'name': '全峰快递'
          },
          {
            'code': 'rufengda',
            'name': '如风达'
          },
          {
            'code': 'zhaijisong',
            'name': '宅急送'
          },
          {
            'code': 'zhimakaimen',
            'name': '芝麻开门'
          },
          {
            'code': 'tiantian',
            'name': '天天快递'
          }
        ]
      }
    },
    methods: {
      // 加载首页数据
      listUserCouponsData () {
        this.$http.get('/uc/list', {
          params: {
            type: this.searchTypeValue,
            keyword: this.keyword,
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize
          }
        }).then((response) => {
          let respData = response.data
          if (respData.code === 0) {
            this.userCouponsData = respData.data
          }
        })
      },
      // 上一页
      pre () {
        if (this.page.pageNum > 1) {
          this.page.pageNum--
          this.listUserCouponsData()
        }
      },
      // 下一页
      next () {
        this.page.pageNum++
        this.listUserCouponsData()
      },
      showDeliverDialog (id, logisticsNumber) {
        this.form.id = id
        if (logisticsNumber !== undefined && logisticsNumber !== '') {
          let split = logisticsNumber.split('-')
          this.form.expressageCompany = split[0]
          this.form.expressageNumber = split[1]
        }
        this.deliverDialogVisible = true
      },
      // 发货
      deliver () {
        this.$http.get('/uc/deliver', {
          params: {
            id: this.form.id,
            logisticsNumber: this.form.expressageCompany + '-' + this.form.expressageNumber
          }
        }).then((response) => {
          let respData = response.data
          if (respData.code === 0) {
            this.deliverDialogVisible = false
            this.listUserCouponsData()
          }
        })
      },
      // 获取物流信息
      getExpressageInfo (value) {
        if (value !== undefined && value !== '') {
          let split = value.split('-')
          let expressageCode = split[0]
          let expressageNum = split[1]
          for (let i = 0; i < this.expressages.length; i++) {
            let e = this.expressages[i]
            if (e['code'] === expressageCode) {
              return e['name'] + '-' + expressageNum
            }
          }
        } else {
          return ''
        }
      },
      getUrl (logisticsNumber) {
        if (logisticsNumber !== undefined && logisticsNumber !== '') {
          let split = logisticsNumber.split('-')
          return 'https://m.kuaidi100.com/result.jsp?com=' + split[0] + '&nu=' + split[1]
        } else {
          return ''
        }
      },
      // 格式化时间
      formatDateTime (time) {
        if (time === undefined || time === '') {
          return ''
        }
        let date = new Date(time)
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = date.getDate() + ' '
        let h = date.getHours() + ':'
        let m = date.getMinutes()
        return M + D + h + m
      }
    },
    created () {
      this.listUserCouponsData()
    }
  }
</script>
