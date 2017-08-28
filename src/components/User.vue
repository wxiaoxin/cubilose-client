<template>
  <div>

    <div class="opt-panel">
      <el-row>

        <el-col :span="4">
          <el-input placeholder="搜索" icon="search"
                    v-model="keyword" @keyup.enter.native="search">
          </el-input>
        </el-col>

        <el-col :span="2" :offset="1">
          <el-button @click="pullUserList">拉取用户列表</el-button>
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
            <el-tag type="danger" v-if="scope.row.sex === 2">女</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="wid" label="头像" width="180">
          <template scope="scope">
            <img :src="scope.row.wimg" width="32px" height="32px">
          </template>
        </el-table-column>

        <el-table-column prop="subscribeTime" label="关注时间" width="240">
          <template scope="scope">
            {{scope.row.subscribeTime.substr(0, 19)}}
          </template>
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
        this.$http.get('/user/list', {
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
        this.$http.get('/user/query', {
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
      },
      // 拉取最新用户列表
      pullUserList () {
        this.$http.get('/user/pull_user_list')
          .then((response) => {
            let respData = response.data
            if (respData.code === 0) {
              this.listUserData()
              this.$message({
                message: '用户列表拉取成功!',
                type: 'success'
              })
            }
          })
      }
    },
    created () {
      this.listUserData()
    }
  }
</script>
