<template>
    <div class="wallet">
        <van-nav-bar title="" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <div class="walletBack">
            <br><br>
            <p v-if='fan'>账户余额(元)</p>
            <p v-if='!fan'>账户积分</p>
            <h2>{{userWallet}}</h2>
            <span @click="LinkBill">明细</span>
            <div class="walletTitle" v-if='fan'>
                <van-row>
                    <van-col span="24" @click="drawing">提现</van-col>
                </van-row>
            </div>
            <div class="walletTitle" v-if='!fan'>
                
            </div>
        </div>
        <br><br>
        <div class="submitLogin" @click="LinkCard"><van-button type="primary" size="normal" v-if="show">绑定银行卡</van-button></div>
        <div class="list" v-if="!show">
            <van-row>
				<van-col span="5">
					<div class="titleHome">
						持卡人
					</div>
				</van-col>
				<van-col span="19">
					<div class="rebateRight">{{name}}</div>
				</van-col>
			</van-row>
            <van-row>
				<van-col span="5">
					<div class="titleHome">
						卡号
					</div>
				</van-col>
				<van-col span="19">
					<div class="rebateRight">{{num}}</div>
				</van-col>
			</van-row>
            <br>
            <div class="submitLogin" @click="xiugai"><van-button type="primary" size="normal">修改银行卡</van-button></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'wallet',
    data() {
        return{
            userWallet: '',
            show: '',
            name:'',
            num:'',
            fan: true
        }
    },
    activated(){
        let token = localStorage.getItem("token")
        let rebate = '/appuser/wallet'
        let params = {
            userToken: token
        }
        
        let ifres ='/appuser/isNotBind'
        this.$fetch(ifres,params)
        .then((res)=>{
            if(res.message == '暂未绑定账号'){
                this.show = true
            }else{
                this.name = res.result[0].name
                this.num = res. result[0].card
            }
        })
        let ifpan = '/upper/isUpper'
        this.$fetch(ifpan)
        .then((res)=>{
            if(res.result.isUpper == '0'){
                this.fan = false
            }
        })
        this.$fetch(rebate,params)
        .then((res)=>{
            this.userWallet = res.result[0].userWallet
        })
        .catch((res)=>{
            
        })
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        LinkCard(){
            this.$router.push('/Card')
        },
        LinkBill(){
            this.$router.push('/Bill')
        },
        xiugai(){
            this.$router.push('/Card')
        },
        drawing(){
            let token = localStorage.getItem("token")
            let params = {
            userToken: token
            }
            let ifres ='/appuser/isNotBind'
            this.$fetch(ifres,params)
            .then((res)=>{
                if(res.message == '暂未绑定账号'){
                    this.$toast(res.message)
                }else{
                    this.$router.push('/drawing')
                }
            })
        }
    }
}
</script>

<style scoped>
.walletBack{background:url(../assets/wallet.png);width: 17rem;margin: 0 auto;position: relative;height: 10rem;background-size: 100% 100%;color: #ffffff;text-align: center;}
.walletBack *{color: #ffffff}
.walletBack p{font-size: 0.7rem;}
.walletBack h2{font-size: 1.5rem;margin-top: 0.6rem;}
.walletBack span{color: #ffffff;font-size: 0.7rem;position: absolute;display: block;right: 0.6rem;top: 1.2rem;}
.walletTitle{position: absolute;bottom: 0.4rem;left: 0;width: 17rem;font-size: 0.75rem;}
.submitLogin{width:85%;margin:0 auto;}
.submitLogin button{border-radius: 30px;background-color:#ff6473;border:none;width: 100%;}
.submitLogin button span{font-size:0.8rem;font-weight: bold;}
.list {padding: 0 0.85rem;}
.titleHome{border-bottom: 1px solid #e9e9e9;padding-left: 0.5rem;font-size: 0.7rem;font-weight: bold;line-height: 3rem}
.rebateRight{border-bottom: 1px solid #e9e9e9;font-size: 0.8rem;line-height: 3rem}
</style>