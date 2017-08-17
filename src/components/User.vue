<template>
  <div>

    <div class="opt-panel">
      <el-row>
        <!--<el-col :span="2">-->
          <!--<el-button>新增券</el-button>-->
        <!--</el-col>-->

        <el-col :span="4">
          <el-input placeholder="搜索" icon="search"
                    v-model="keywords" @keyup.enter.native="search">
          </el-input>
        </el-col>

      </el-row>

    </div>

    <el-card class="box-card">
      <el-table :data="userData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>

        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>

        <el-table-column prop="address" label="地址">
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
      userData: []
    }
  }
}
</script>
