<template>
    <div class="brandDetail">
        <div class="HomeBack" :style="{backgroundImage:`url(${imgLeft+backUrl})`}">
            <ul class="HomeTop">
                <li class="addres"><van-icon name="arrow-left"  @click="onClickLeft" color="#ffffff" size="20px" /></li>
            </ul>
        </div>
        <div class="brandTop">
            <van-row>
                <van-col span="5">
                    <div class="BrandImg"><img :src="imgLeft+BrandImg" alt=""></div>
                </van-col>
                <van-col span="13" style="padding-left:0.4rem;">
                    <h2>{{title}}</h2>
                    <p>{{brandAddress}}</p>
                    <p>{{brandSpeciality}}</p>
                </van-col>
                <van-col span="6">
                    <h3>品牌官方授权</h3>
                </van-col>
            </van-row>
            <br>
            <p class="BrandTxtMin" v-if="min">{{brandProfile}}</p>
            <p class="BrandTxtMax" v-if="max" v-html="content">{{content}}</p>
            <transition name="fade">
                <p class="ClickBrand" @click="ClickBrand()">更多品牌信息<van-icon :name="arrowdown" color="#999999" /></p>
            </transition>
        </div>
        <div class="hr"></div>
        <div class="content">
            <br>
            <ul class="BrandLabel"></ul>
            <br>
            <van-row  gutter="10" class="HomeList" v-for="(list,index) in lists" :key="list.lists" @click.native="listClick(list.id)">
                <van-col span="6">
                    <div class="contentListImg">
                        <img :src="imgLeft+list.shopImg" alt="">
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="commTxt">
                        <p class="contentTitle">{{list.shopTitle}}</p>
                        <p class="CommName" v-html="list.webBrand.brandTitle">{{list.webBrand.brandTitle}}</p>
                        <span class="total">￥{{list.shopCurrentPrice}}</span>
                        <span class="num">医院价：￥{{list.shopOriginalPrice}}</span>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'brandDetail',
    data() {
        return{
            imgLeft: '',
            title: '',
            backUrl:'',
            BrandImg: '',
            min: 1,
            max: 0,
            content: '',
            arrowdown: 'arrow-down',
            lists:[
                    
                ],
            brandProfile: '',
            brandAddress: '',
            brandSpeciality: ''
        }
    },
    created(){
        this.imgLeft = localStorage.getItem("temp")
        var param = this.$route.params.id
        let brandDetail = '/app/brandDetails'
        let params = {
            brand_id: param
        }
        this.$fetch(brandDetail,params)
        .then((res)=>{
            this.backUrl = res.result.brandBackgroundImage
            this.content = res.result.brandContent
            this.title = res.result.brandTitle
            this.brandProfile = res.result.brandProfile
            this.BrandImg = res.result.brandImg
            this.brandAddress = res.result.brandAddress
            this.brandSpeciality = res.result.brandSpeciality
        })
        .catch((res)=>{
            this.$toast('暂无数据')
        })
        let addres = localStorage.getItem("address")
        let shopList = '/app/brandShopList'
        let nuls = {
            area_id: addres,
            brand_id:param
        }
        this.$fetch(shopList,nuls).then((res)=>{
            this.lists = res.result
        })
        .catch((res)=>{
        })
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        ClickBrand(){
            if(this.min=='1'){
                this.min=0
                this.max=1
                this.arrowdown='arrow-up'
            }else{
                this.min=1
                this.max=0
                this.arrowdown='arrow-down'
            }
        },
        listClick(id){
            this.$router.push('/CommodityDetails/'+id)
        },
    }
}
</script>

<style scoped>
.HomeTop li{float: left;line-height: 2.5rem;}
.HomeBack{padding: 0 0.6rem}
.HomeSearch{width: 12rem;position: relative;}
.addres{margin-top: 0.4rem;margin-right: 0.6rem;}
.HomeTop:after{content: "";display: block;clear: both;height: 0}
.Search{border: none;border-radius: 30px;background:rgba(255, 255, 255, 0.6);width: 100%;height: 1.5rem;font-size: 0.7rem;padding-left: 2rem}
.HomeBack{height: 8rem;background-size: 100% 100%;}
.SearchIcon{position: absolute;top: 0.9rem;left: 0.6rem;}
.brandTop{padding: 0.6rem;}
.BrandImg{background:#eeeeee;border-radius: 10px;overflow: hidden;height: 3.65rem;}
.BrandImg img{width: 100%;height: 3.65rem;}
.brandTop h2{font-size: 0.7rem;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
.brandTop p{color: #333333;font-size: 0.68rem;}
.brandTop h3{color: #ffffff;height: 1.25rem;width: 4.5rem;background: #ff6473;font-size: 0.66rem;line-height:1.25rem;border-radius: 5px;margin-left: 0.4rem;text-align: center;}
.BrandTxtMin{color: #666666;font-size: 0.7rem;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;}
.BrandTxtMax{color: #666666;font-size: 0.7rem;}
.ClickBrand{color: #999999;text-align: center;margin-top: 0.6rem;}
.ClickBrand i{margin-left: 0.2rem;}
.content{padding: 0 0.6rem}
.homeCon{width: 100%;}
.homeRight{width: 100%;}
.contentListImg img{width: 100%;}
.contentTitle{font-size: 0.68rem;color: #000000;font-weight: bold;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;line-height: 0.8rem;height: 1.6rem;}
.CommName{color: #9a9a9a;font-size: 0.65rem;}
.total{font-size: 0.7rem;color: #fd424b;}
.num{font-size: 0.65rem;color: #c8c8c8;text-decoration:line-through}
.HomeTitle{font-size: 0.75rem;text-align: center;width: 5.2rem;margin: 0 auto 0.5rem;background: url(../assets/HomeTitle.png) no-repeat;background-size: 100% 100%}
.HomeList{padding-bottom: 0.75rem;border-bottom: 1px solid #e9e9e9;margin-bottom: 0.75rem;}
</style>