<template>
  <div>

    <div class="opt-panel">
      <el-row>

        <el-col :span="4">
          <el-input placeholder="搜索" icon="search"
                    v-model="keyword" @keyup.enter.native="search">
          </el-input>
        </el-col>

      </el-row>

    </div>

    <el-card class="box-card">
      <el-table :data="userData" style="width: 100%">

        <el-table-column prop="id" label="主键" width="180">
        </el-table-column>

        <el-table-column prop="wname" label="微信昵称">
        </el-table-column>

        <el-table-column prop="sex" label="性别" width="180">
          <template scope="scope">
            <el-tag type="primary" v-if="scope.row.sex === 1">男</el-tag>
            <el-tag type="info" v-if="scope.row.sex === 2">女</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="wid" label="头像" width="180">
          <template scope="scope">
            <img :src="scope.row.wimg" width="32px" height="32px">
          </template>
        </el-table-column>

        <el-table-column prop="subscribeTime" label="关注时间" width="240">
        </el-table-column>

        <el-table-column prop="couponSize" label="优惠券" width="180">
        </el-table-column>

      </el-table>

    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'user',
    data () {
      return {
        userData: [],
        keyword: '',
        page: {
          pageNum: 1,
          pageSize: 10
        }
      }
    },
    methods: {
      listUserData () {
        this.$http.get('http://localhost:10086/user/list', {
          params: {
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize
          }
        }).then((response) => {
          let respData = response.data
          if (respData.code === 0) {
            this.userData = respData.data
          }
        })
      },
      search () {
        this.$http.get('http://localhost:10086/user/query', {
          params: {
            keyword: this.keyword,
            pageNum: this.page.pageNum,
            pageSize: this.page.pageSize
          }
        }).then((response) => {
          let respData = response.data
          if (respData.code === 0) {
            this.userData = respData.data
          }
        })
      }
    },
    created () {
      this.listUserData()
    }
  }
</script>
