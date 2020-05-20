<template>
    <div class="Detailed">
        <van-nav-bar title="明细" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <div class="ledList">
            <van-row v-for="ledUl in list" :key="ledUl.list" class="ledUl">
                <van-col span="12">
                    <p class="detailTitle" v-if='fan'>{{ledUl.title}}</p>
                    <p class="detailTitle" v-if='!fan'>积分</p>
                </van-col>
                <van-col span="12">
                    <div class="timeDetail">
                        <span>{{ledUl.date}}</span>
                        <p>{{ledUl.total}}</p>
                    </div>
                </van-col>
                <van-col span="24" v-for="imglist in ledUl.orders" :key="imglist.orders">
                    <p>订单号：{{imglist.orderNo}}</p>
                    <p>商品名称：{{imglist.shopTitle}}</p>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
export default {
    name:'Detailed',
    data() {
        return{
            imgLeft: '',
            list:[
                
            ],
            fan: true
        }
    },
    activated(){
        this.imgLeft = localStorage.getItem("temp")
        let token = localStorage.getItem("token")
        let rebate = '/appuser/walletDetail'
        let params = {
            userToken: token,
            type: 4
        }
        this.$fetch(rebate,params)
        .then((res)=>{
            this.list = res.result
        })
        .catch((res)=>{
            this.$toast('网络异常')
        })
        let ifpan = '/upper/isUpper'
        this.$fetch(ifpan)
        .then((res)=>{
            if(res.result.isUpper == '0'){
                this.fan = false
            }
        })
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
    }
}
</script>

<style scoped>
.ledUl{padding: 1rem 0;border-bottom: 1px solid #f3f3f3;}
.ledList{padding: 0 0.6rem;}
.timeDetail{float: right}
.detailTitle{font-size: 0.8rem;margin-top: 0.6rem;}
.timeDetail span{font-size: 0.65rem;color: #666666;}
.timeDetail p{color: #333333;font-size: 1rem;text-align: right;line-height: 1.5rem;}
</style>