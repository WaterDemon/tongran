<template>
    <div class="rebate">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="header">
            <van-nav-bar v-if='fan' title="返利" right-text="明细" color="#ffffff" @click-right="onClickRight"></van-nav-bar>
            <van-nav-bar v-if='!fan' title="积分" right-text="明细" color="#ffffff" @click-right="onClickRight">
			</van-nav-bar>
            <div class="rebateTop">
                <p v-if='fan'>累计返利资金</p>
                <p v-if='!fan'>累计返利积分</p>
                <h3>{{userRebateMoney}}</h3>
                <van-icon class="rebeatIcon" @click="showPopup" name="question-o" color="#1989fa" />
            </div>
        </div>
        <div class="list">
            <van-row>
				<van-col span="4">
					<img src='../assets/Rebate3.png' alt="">
				</van-col>
				<van-col span="15">
					<div class="titleHome" v-if='fan'>
						待返利资金
					</div>
                    <div class="titleHome" v-if='!fan'>
						待返利积分
					</div>
				</van-col>
				<van-col span="5">
					<div class="rebateRight">{{userFrostMoney}}</div>
				</van-col>
			</van-row>
        </div>
        </van-pull-refresh>
        <van-popup class="modelres" v-model="show" v-html="details">{{details}}</van-popup>
        <footers></footers>
    </div>
</template>

<script>
import footers from './footer'
export default {
    name: 'rebate',
    data() {
        return{
            userRebateMoney:'',
            userFrostMoney: '',
            userNowMoney:'',
            show: false,
            fan: true,
            details: '',
            isLoading: false,
        }
    },
    created(){
        this.rebateLoad()
        
    },
    methods: {
        rebateLoad(){
            let rebeat = '/rule/ruleDetail'
            let ruleType = {
                ruleType: 1
            }
            this.$fetch(rebeat,ruleType)
            .then((res)=>{
                if(res.succeed == true){
                    this.details = res.result.ruleContent
                }
            })
            let token = localStorage.getItem("token")
            let rebate = '/appuser/rebate'
            let params = {
                userToken: token
            }
            this.$fetch(rebate,params)
            .then((res)=>{
                if(res.succeed == true){
                    this.userFrostMoney = res.result[0].userFrostMoney
                    this.userNowMoney = res.result[0].userNowMoney
                    this.userRebateMoney = res.result[0].userRebateMoney
                }
            })
            .catch((res)=>{
            })
            let ifpan = '/upper/isUpper'
            this.$fetch(ifpan)
            .then((res)=>{
                if(res.result.isUpper == '0'){
                    this.fan = false
                }
            })
        },
        onClickRight(){
            this.$router.push('/Detailed')
        },
        showPopup() {
            this.show = true;
        },
        onRefresh() {
            setTimeout(() => {
                this.rebateLoad()
                this.$toast('刷新成功');
                this.isLoading = false;
            }, 1000);
        },
    },
    components: {
        footers
    }
}
</script>

<style scoped>
.van-nav-bar:after{
        content: "";
        border:none;
    }
.header{width: 100%;height: 11.25rem;background-image: url(../assets/rebateTop.png);background-size: 100% 100%;}
.van-nav-bar{background: transparent;}
.van-nav-bar *{background: transparent;}
.header *{color: #ffffff;}
.header .rebateTop p{color: #ff6573;font-size: 0.7rem;text-align: center;}
.header .rebateTop h3{color: #ff6573;font-size: 1.5rem;text-align: center;margin-top: 1rem;}
.rebateTop{width:17rem;background: #ffffff;border-radius: 10px;margin: 1.75rem auto 1.9rem;padding: 2.25rem 0;box-shadow: #ff6573 0px 0px 20px;position: relative;}
.list {padding: 0 0.85rem;margin-top: 3rem;}
.list img{width: 80%;display: block;margin: 0.3rem auto 0}
.titleHome{border-bottom: 1px solid #e9e9e9;padding-left: 0.5rem;font-size: 0.7rem;font-weight: bold;line-height: 3rem}
.rebateRight{border-bottom: 1px solid #e9e9e9;font-size: 0.8rem;line-height: 3rem}
.rebeatIcon{position: absolute;display: block;top: 1rem;right: 1rem}
.modelres{width: 80%;padding: 0.6rem;font-size: 0.8rem}
.van-pull-refresh{overflow: visible;}
</style>