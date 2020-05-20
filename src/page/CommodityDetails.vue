<template>
    <div class="CommodityDetails">
        <div class="header">
            <van-nav-bar title="" color="#ffffff">
				<van-icon name="arrow-left" slot="left" @click="onClickLeft" size="30px" color="#ffffff" />
                <van-icon name="star-o" slot="right" @click="addCang" size="30px" v-show="addrel" color="#ffffff" style="margin-right:1rem;" />
                <van-icon name="star-o" slot="right" @click="delCang" size="30px" v-show="!addrel" color="#ff6473" style="margin-right:1rem;" />
                <van-icon name="share" slot="right" size="30px" color="#ffffff" v-clipboard:success="fenxiang" v-clipboard:copy="urlLink" />
                <span v-if="hide">{{urlLink}}</span>
			</van-nav-bar>
        </div>
        <div class="banner">
            <van-swipe :autoplay="3000" indicator-color="#ff6473">
                <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img v-lazy="imgLeft+image"/>
                </van-swipe-item>
            </van-swipe>
        </div>
        <br>
        <div class="DetailTotal">
            <van-row>
                <van-col span="10"><p class="ftatal">￥{{ftatal}}</p></van-col>
                <van-col span="10"><p class="num">医院价：￥{{num}}</p></van-col>
                <van-col span="4"></van-col>
            </van-row>
            <h2>{{shopTitle}}</h2>
            <br>
        </div>
        <div class="hr"></div>
        <div class="evaluate">
            <van-row>
                <van-col span="12">
                    <p class="evaluateTit">商品评价{{evaluateTit}}</p>
                </van-col>
                <van-col span="12">
                    <p class="buildf" @click="buildf"><van-icon name="arrow" size="16px" style="line-height:0.7rem;" /></p>
                </van-col>
            </van-row>
            <ul class="evaluateList">
                <li v-for="(EvaList, index) in list" :key="EvaList.id" v-if="index < 1">
                    <van-row>
                        <van-col span="13">
                            <div class="evaListTop"><img class="detailImg" :src="imgLeft+EvaList.phone" alt=""><p class="detailName">{{EvaList.nick}}</p><div class="clear"></div></div>
                            <p class="evaListDetail"><span>用户心得 &nbsp;</span> {{EvaList.content}}</p>
                        </van-col>
                    </van-row>
                </li>
            </ul>
            <div class="hr"></div>
            <div class="detail">
                <p class="detailTxt"><span class="detailLeft"></span>图文详情<span class="detailRight"></span></p>
                <div v-html="shopContent">{{shopContent}}</div>
            </div>
        </div>
        <van-goods-action>
            <a :href="tel"><van-goods-action-icon class="number"
                icon="service-o"
                text="客服"
            /></a>
            <van-goods-action-button class="purchase" @click="patmentOrder"
                type="danger"
                text="立即预约"
            />
        </van-goods-action>
    </div>
</template>

<script>
export default {
    name: 'commodity',
    data() {
        return{
            param:'',
            images: [],
            detail:require('../assets/detail3.jpg'),
            evaluateTit:'',
            ftatal:'',
            num:'',
            people:'',
            shopTitle: '',
            shopContent: '',
            list:[
                
            ],
            tel:'',
            addrel: '',
            urlLink:'',
            hide: false,
            imgLeft: '',
        }
    },
    created(){
        this.imgLeft = localStorage.getItem("temp")
        this.urlLink = window.location.href
        var param = this.$route.params.id
        this.param = param
        let shop_id = '/app/shopDetails'
        let params = {
            shop_id:param
        }
        this.$fetch(shop_id,params)
        .then((res)=>{
            this.shopTitle = res.result.shopTitle
            this.ftatal = res.result.shopCurrentPrice
            this.num = res.result.shopOriginalPrice
            this.shopContent = res.result.shopContent
            this.tel = 'tel:'+res.result.shopTel
            let i = 0
            for(i=0;i<res.result.attas.length;i++){
                this.images.push(res.result.attas[i].attaPath)
            }
        })
        .catch((res)=>{
            this.$toast('网络异常')
        })
        let token = localStorage.getItem("token")
        let zujiUrl = '/appuser/history'
        let zuji = {
            userToken: token,
            shopId: param
        }
        this.$fetch(zujiUrl,zuji)
        .then((res)=>{
            
        })
        this.addrel = true
        let shoucang = '/appuser/isNotCollect'
        this.$fetch(shoucang,zuji)
        .then((res)=>{
            if(res == true){
                this.addrel = false
            }
        })
        let evaTop = '/app/shopEvaluate'
        let evaShop ={
            shopId: param
        }
        this.$fetch(evaTop,evaShop)
        .then((res)=>{
            if(res.result.length == '0'){
            }else{
                this.list = res.result
                this.list.reverse()
            }
        })
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        patmentOrder(){
            var id = this.param
            this.$router.push('/payment/'+ id)
        },
        buildf(){
            var id = this.param
            this.$router.push('/Commevaluate/'+id)
        },
        addCang(){
            let token = localStorage.getItem("token")
            var param = this.$route.params.id
            let adddCurl = '/appuser/collect'
            let addJson = {
                userToken: token,
                shopId: param
            }
            this.$fetch(adddCurl,addJson)
                .then((res)=>{
                    this.$toast('收藏成功')
                    this.addrel= false
                })
        },
        delCang(){
            let token = localStorage.getItem("token")
            var param = this.$route.params.id
            let adddCurl = '/appuser/delcollect'
            let addJson = {
                userToken: token,
                shopId: param
            }
            this.$fetch(adddCurl,addJson)
                .then((res)=>{
                    this.$toast('已取消')
                    this.addrel= true
                })
        },
        fenxiang(e){
            this.$toast('分享链接复制成功')
        }
    }
}
</script>

<style scoped>
.CommodityDetails{padding-bottom: 50px;}
.van-nav-bar:after{ content: ""; border:none;}
.van-nav-bar{background: transparent;}
.banner{margin-top: -46px;}
.banner img{width: 100%;}
.ftatal{font-size: 1.25rem;color: #f00;}
.DetailTotal{padding: 0 0.6rem;}
.num{font-size: 0.63rem;color: #c8c8c8;text-decoration:line-through;line-height: 1.8rem;}
.people{text-align: right;font-size: 0.68rem;color: #999999;line-height: 1.8rem;}
.DetailTotal h2{font-size: 0.75rem;margin-top: 0.5rem;}
.evaluate{padding: 0.6rem 0}
.evaluateTit{font-size: 0.7rem;font-weight: bold;padding-left: 0.6rem}
.evaluate .buildf{font-size: 0.7rem;text-align: right;padding-right: 0.6rem;}
.evaluateList{padding:1.2rem 0 0.6rem 0rem;overflow-y: hidden;width: 100%;overflow-x: scroll; white-space:nowrap;}
.evaluateList::-webkit-scrollbar {display: none;}
.evaluateList li{box-shadow: #dddddd 0px 0px 10px;padding-left: 0.6rem;margin-right: 0.5rem;}
.detailImg{float: left;width: 1.5rem;border-radius: 50%;}
.detailName{float: left;font-size: 0.65rem;line-height: 1.5rem;margin-left: 0.2rem;}
.evaListTop{margin-top: 0.6rem;}
.evaluateList .evaListDetail{font-size: 0.6rem;padding-bottom: 0.6rem;margin-top: 0.3rem;word-wrap: break-word;word-break: normal;white-space:normal;}
.evaListDetail span{color: #ff6473;border: 1px solid #ff6473;}
.evaListImg{width: 100%;height: 100%;}
.EvaListPo{position: relative;}
.EvaListPo p{position: absolute;right: 0.3rem;top: 0.3rem;font-size: 0.6rem;background: rgba(0, 0, 0, 0.5);color: #ffffff;padding: 0 0.3rem;border-radius: 10px;}
.detail{padding:1rem 0.75rem;}
.detailTxt{font-size: 0.74rem;color: #333333;padding-bottom: -1rem;position: relative;text-align: center;margin-bottom: 1.25rem;}
.detailTxt span{width: 0.9rem;border-bottom:1px solid #999999;display:block;}
.detailTxt .detailLeft{position: absolute;left: 33%;top: 0.56rem;}
.detailTxt .detailRight{position: absolute;right: 33%;top: 0.56rem;}
.detail img{width: 100%;}
.add{background: #ffffff;border:none;width: 4.7rem;}
.purchase{color: #ffffff;background: #ff6473;border:none;border-radius: 0;line-height: 1.25rem;margin: 0;padding: 0;height: 50px;}
.number{width: 4.7rem;background: #fafafa;}
</style>