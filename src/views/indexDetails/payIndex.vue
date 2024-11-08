<template>
  <div>
    <headerWorld></headerWorld>
    <div class="concat">
      <div>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-weight: 700;">请填写支付信息</span>
          </div>
          <div style="width: 400px;">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="课程套餐" style="font-weight:800;">
           
            </el-form-item>
            <el-form-item label="订单编号" style="font-weight:800;">
              <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item label="添加备注" style="font-weight:800;">
              <el-input v-model="formLabelAlign.type"></el-input>
            </el-form-item>
          </el-form>
          </div>
        </el-card>
      </div>
      <div style="margin-top: 50px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-weight: 700;">请选择支付方式</span>
          </div>
          <div class="fangs">
            <div v-for="(item,index) in payfang" :key="index" @click="payIndess(index)" :class="{ 'payStayle': payIndex === index }">
              <img :src="item" alt="" style="width:117px;height:40px">
            </div>
          </div>
          <div style="display: flex;margin:30px 0 30px 30px">
            <div style="display: flex; justify-content: space-around; align-items: center;">
              <div style="display: flex; justify-content: space-around;width:350px;  align-items: center;">
              <div style="width:50px;font-weight:700">金额:</div>
            <el-input v-model="formLabelAlign.money"></el-input>
            <div style="width:50px;font-weight:700;margin-left:10px">元</div>
            </div>
               <div class="studysSS">现在支付</div>
            </div>
         
          </div>
        </el-card>
      </div>
    </div>
    <footWorld></footWorld>
  </div>
</template>

<script>
import headerWorld from '@/components/headerWorld.vue'
import footWorld from '@/components/footWorld'
export default {
  components: {
    headerWorld,
    footWorld
  },
  data() {
    return {
      formLabelAlign: {
          name: '',
          region: '',
          type: '',
          money:''
        },
        // 支付方式选中
        payIndex:null,
        payfang:['https://www.haixingkt.com/Public/Default/images/alipay.png','https://www.haixingkt.com/Public/Default/images/yinlianalipay.png','https://www.haixingkt.com/Public/Default/images/wxpay.png','https://www.haixingkt.com/Public/Default/images/yinlianwxpay.png']
    }   
  },
  methods:{
    payIndess(e){
        this.payIndex =e
    }
  }
}
</script>

<style scoped>
.concat {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 30px auto;
}

.box-card {
  width: 1200px;
  min-height: 300px;
}
.fangs{
  display: flex; 
  align-items: center;
  justify-content: space-around;
  width: 1000px;
}
.payStayle{
  transform: scale(1.2);
  padding: 10px;
  border: 1px solid #22AEDB;
}
.studysSS{
  width: 130px;
    height: 40px;
    line-height: 40px;
    display: block;
    font-size: 20px;
    text-align: center;
    color: #fff;
    background: #1484f6;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 100px;
}
</style>>