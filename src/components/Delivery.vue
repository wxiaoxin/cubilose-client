<template>
  <div>

    <div class="opt-panel">
      <el-row>

        <el-col :span="4">
          <el-input placeholder="搜索" icon="search"
                    v-model="keywords" @keyup.enter.native="search">
          </el-input>
        </el-col>

        <el-col :span="2" :offset="1">
          <el-button @click="add">新增券</el-button>
        </el-col>

        <el-col :span="2">
          <el-button>批量处理</el-button>
        </el-col>

      </el-row>

    </div>

    <el-card class="box-card">

      <el-table :data="couponData" style="width: 100%">

        <el-table-column prop="id" label="ID">
        </el-table-column>

        <el-table-column prop="code" label="编码">
        </el-table-column>

        <el-table-column prop="endTime" label="有效日期">
        </el-table-column>

        <el-table-column prop="status" label="状态">
          <template scope="scope">
            <el-tag type="primary" v-if="scope.row.status === 1">有效</el-tag>
            <el-tag type="gray" v-if="scope.row.status === 2">已使用</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="操作">
          <template scope="scope">
            <el-button :plain="true" type="danger" size="small" @click="del(scope.row.id)">禁用</el-button>
          </template>
        </el-table-column>

      </el-table>

    </el-card>

    <el-dialog title="新增优惠券" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="100px">
        <el-form-item label="编码" >
          <el-input v-model="form.code" auto-complete="off" style="width: 320px"></el-input>
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCoupon">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'delivery',
    data () {
      return {
        couponData: [],
        page: {
          pageNum: 1,
          pageSize: 10
        },
        keywords: '',
        dialogFormVisible: false,
        form: {
          code: '',
          endTime: ''
        }
      }
    },
    methods: {
      listCouponData () {
        this.$http.get('http://localhost:10086/coupon/list', {
          params: {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize
          }
        }).then((response) => {
          let respData = response.data
          if (respData.code === 0) {
            this.couponData = respData.data
          }
        })
      },
      search () {
        this.$http.get('http://localhost:10086/coupon/query', {
          params: {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize,
            keywords: this.keywords
          }
        }).then((response) => {
          let respData = response.data
          if (respData.code === 0) {
            this.couponData = respData.data
          }
        })
      },
      add () {
        this.dialogFormVisible = true
      },
      saveCoupon () {
        this.$http.post('http://localhost:10086/coupon/save', {
          params: {
            code: this.form.code,
            endTime: this.form.endTime
          }
        }).then((response) => {
          let respData = response.data
          if (respData.code === 0) {
            this.dialogFormVisible = false
            this.listCouponData()
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
          }
        })
      },
      del (id) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '是的',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log('del ' + id)
          this.$http.get('http://localhost:10086/coupon/del/' + id)
            .then((response) => {
              let respData = response.data
              if (respData.code === 0) {
                this.listCouponData()
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              }
            })
        })
      },
      getStatus (status) {
        if (status === 1) {
          return '有效'
        } else if (status === 2) {
          return '已使用'
        }
      }
    },
    created () {
      this.listCouponData()
    }
  }
</script>
