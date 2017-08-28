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
          <el-button @click="exportCodes">导出优惠券码</el-button>
        </el-col>

      </el-row>

    </div>

    <el-card class="box-card">

      <el-table :data="couponData" style="width: 100%">

        <el-table-column prop="id" label="ID">
        </el-table-column>

        <el-table-column prop="code" label="编码">
        </el-table-column>

        <el-table-column prop="price" label="价格">
        </el-table-column>

        <el-table-column prop="endTime" label="有效日期">
          <template scope="scope">
            {{scope.row.endTime.substr(0, 19)}}
          </template>
        </el-table-column>

        <el-table-column prop="status" label="状态">
          <template scope="scope">
            <el-tag type="danger" v-if="scope.row.status === -1">禁用</el-tag>
            <el-tag type="primary" v-if="scope.row.status === 1">有效</el-tag>
            <el-tag type="gray" v-if="scope.row.status === 2">已使用</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="status" label="操作">
          <template scope="scope">
            <el-button v-if="scope.row.status === 1"
                       :plain="true" type="danger"
                       size="small" @click="del(scope.row.id)">禁用
            </el-button>

            <el-button v-if="scope.row.status === -1"
                       :plain="true" type="primary"
                       size="small" @click="use(scope.row.id)">启用
            </el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-button type="text" @click="pre" :disabled="page.pageNum <= 1">< 上一页</el-button>
      <el-button type="text" @click="next">下一页 ></el-button>

      <!--<el-pagination-->
        <!--@size-change="handleSizeChange" @current-change="handleCurrentChange"-->
        <!--:page-sizes="[10, 20, 50, 100, 300, 400]" :page-size="page.pageSize"-->
        <!--layout="sizes, prev, pager, next" :total="99">-->
      <!--</el-pagination>-->

    </el-card>

    <el-dialog title="新增优惠券" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="100px">
        <el-form-item label="个数">
          <el-input v-model="form.size" auto-complete="off" style="width: 220px" type="number"></el-input>
        </el-form-item>
        <el-form-item label="券码长度">
          <el-input v-model="form.length" auto-complete="off" style="width: 220px" type="number"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price" auto-complete="off" style="width: 220px" type="number"></el-input>
        </el-form-item>
        <el-form-item label="有效期">
          <el-date-picker v-model="form.endTime" placeholder="选择日期时间"
                          type="datetime" format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCoupon">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog
      title="提示"
      :visible.sync="codesDialogVisible" size="tiny">
      <span white-space="pre-wrap">
        {{codes}}
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">复制到剪切板</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'coupon',
    data () {
      return {
        couponData: [],
        page: {
          pageNum: 1,
          pageSize: 10
        },
        keywords: '',
        codes: '',
        dialogFormVisible: false,
        codesDialogVisible: false,
        form: {
          size: 10,
          length: 5,
          price: 0,
          endTime: '2017-09-30 23:59:59'
        }
      }
    },
    methods: {
      listCouponData () {
        this.$http.get('http://www.birdnesket.com/coupon/list', {
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
      // 上一页
      pre () {
        if (this.page.pageNum > 1) {
          this.page.pageNum--
          this.listCouponData()
        }
      },
      // 下一页
      next () {
        this.page.pageNum++
        this.listCouponData()
      },
      search () {
        this.$http.get('http://www.birdnesket.com/coupon/query', {
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
        if (this.form.size <= 0 || this.form.length <= 0 || this.form.price <= 0) {
          this.$notify.error({
            title: '错误',
            message: '优惠券码的个数、长度、价格不能小于0'
          })
        } else {
          let date = new Date(this.form.endTime)
          let Y = date.getFullYear() + '-'
          let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
          let D = date.getDate() + ' '
          let h = date.getHours() + ':'
          let m = date.getMinutes() + ':'
          let s = date.getSeconds()
          let endTime = Y + M + D + h + m + s
          this.$http.get('http://www.birdnesket.com/coupon/generate', {
            params: {
              codeLength: this.form.length,
              codeSize: this.form.size,
              price: this.form.price,
              endTime: endTime
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
        }
      },
      // 禁用
      del (id) {
        this.$confirm('确认禁用?', '提示', {
          confirmButtonText: '是的',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get('http://www.birdnesket.com/coupon/del/' + id)
            .then((response) => {
              let respData = response.data
              if (respData.code === 0) {
                this.listCouponData()
                this.$message({
                  type: 'success',
                  message: '好的，已禁用!'
                })
              }
            })
        })
      },
      // 启用
      use (id) {
        this.$http.get('http://www.birdnesket.com/coupon/enable/' + id)
          .then((response) => {
            let respData = response.data
            if (respData.code === 0) {
              this.listCouponData()
              this.$message({
                type: 'success',
                message: '好的，已启用!'
              })
            }
          })
      },
      exportCodes () {
        window.location.href = 'http://www.birdnesket.com/coupon/export'
      },
      getStatus (status) {
        if (status === 1) {
          return '有效'
        } else if (status === 2) {
          return '已使用'
        } else if (status === -1) {
          return '禁用'
        }
      }
    },
    created () {
      this.listCouponData()
    }
  }
</script>
