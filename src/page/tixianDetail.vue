<template>
    <div class="Detailed">
        <van-nav-bar title="明细" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <div class="ledList">
            <van-row v-for="ledUl in list" :key="ledUl.list" class="ledUl">
                <van-col span="12">
                    <p class="detailTitle">{{ledUl.type}}</p>
                </van-col>
                <van-col span="12">
                    <div class="timeDetail">
                        <span>{{ledUl.date}}</span>
                        <p>{{ledUl.money}}</p>
                    </div>
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
            list:[
                
            ]
        }
    },
    activated(){
        let token = localStorage.getItem("token")
        let rebate = '/appuser/withdraw'
        let params = {
            userToken: token
        }
        this.$fetch(rebate,params)
        .then((res)=>{
            this.list = res.result
        })
        .catch((res)=>{
            this.$toast('网络异常')
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