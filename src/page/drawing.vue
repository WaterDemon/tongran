<template>
    <div class="drawing">
        <van-nav-bar left-arrow title="提现" right-text="明细" color="#333333" @click-right="onClickRight" @click-left="onClickLeft"></van-nav-bar>
        <br>
        <p class="drawP">提现到银行卡：{{num}}</p>
        <br>
        <van-field
                v-model="total"
                label="金额"
                placeholder="请输入提现金额"
                type="number"
            />
            <br>
        <div class="guizes">提现规则：
            <p v-html="detailTxt">{{detailTxt}}</p>
        </div>
        <br><br><br>
        <div class="submitLogin" @click="tixian"><van-button type="primary" size="normal">提现</van-button></div>
    </div>
</template>

<script>
export default {
    name: 'drawing',
    data() {
        return{
            num:"",
            total: "",
            detailTxt: ''
        }
    },
    activated(){
        let rebeat = '/rule/ruleDetail'
        let ruleType = {
            ruleType: 2
        }
        this.$fetch(rebeat,ruleType)
        .then((res)=>{
            if(res.succeed == true){
                this.detailTxt = res.result.ruleContent
            }
        })
        let token = localStorage.getItem("token")
        let params = {
            userToken: token
        }
        let ifres ='/appuser/isNotBind'
        this.$fetch(ifres,params)
        .then((res)=>{
            if(res.message == '暂未绑定账号'){
                this.num = '暂未绑定账号'
            }else{
                this.num = res. result[0].card
            }
        })
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        onClickRight(){
            this.$router.push('/tixianDetail')
        },
        tixian(){
            if(this.total==''){
                this.$toast('请输入提现金额')
            }else{
                let token = localStorage.getItem("token")
                let rebate = '/appuser/getWithDraw'
                let params = {
                    userToken: token,
                    money: this.total
                }
                this.$fetch(rebate,params)
                .then((res)=>{
                    this.$toast(res.message)
                })
                .catch((res)=>{
                })
            }
            
        }
    }
}
</script>

<style scoped>
.drawP{text-align: center;font-size: 0.8rem}
.guizes{color:darkorange;font-size: 0.8rem;padding:0 1rem;}
.guizes>p{color: #333;font-size: 0.7rem;margin: 0 auto;}
.submitLogin{width:85%;margin:0 auto;}
.submitLogin button{border-radius: 30px;background-color:#ff6473;border:none;width: 100%;}
.submitLogin button span{font-size:0.8rem;font-weight: bold;}
</style>