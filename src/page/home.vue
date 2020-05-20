<template>
    <div class="home">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="HomeBack">
                <ul class="HomeTop">
                    <li class="addres" @click="showPopup"><p>{{address}} </p><van-icon name="arrow-down" color="#ff6473" /><div class="clear"></div></li>
                    <li class="HomeSearch NavSearch" @click="SearchClick">
                        <van-search
                            v-model="value"
                        />
                    </li>
                    <li class="notice" @click="notice">
                        <van-icon name="chat-o" color="#ff6473" />
                    </li>
                </ul>
                <div class="banner">
                    <van-swipe :autoplay="3000" indicator-color="#ff6473">
                        <van-swipe-item v-for="(image, index) in images" :key="index">
                            <img v-lazy="imgLeft+image.imgPath" @click="bannLink(image.shopId)" />
                        </van-swipe-item>
                    </van-swipe>
                </div>
            </div>
            <div class="HomeNav">
                <keep-alive>
                <van-row>
                    <van-col span="2"></van-col>
                    <van-col span="4" v-if="index < 5" v-for="(list,index) in navs" :key='index'>
                        <router-link :to="{ path: `/commodity/${list.id}/${list.categoryTitle}` }">
                        <div class="listNav"><img :src="imgLeft+list.categoryImg" alt="">
                            <p>{{list.categoryTitle}}</p>
                        </div>
                        </router-link>
                    </van-col>
                    <van-col span="2"></van-col>
                </van-row>
                </keep-alive>
                <keep-alive>
                <van-row>
                    <van-col span="2"></van-col>
                    <van-col span="4" v-if="index >= 5" v-for="(list,index) in navs" :key='index'>
                        <router-link :to="{ path: `/commodity/${list.id}/${list.categoryTitle}` }">
                        <div class="listNav"><img :src="imgLeft+list.categoryImg" alt="">
                            <p>{{list.categoryTitle}}</p>
                        </div>
                        </router-link>
                    </van-col>
                    <van-col span="4">
                        <router-link :to="{ path: '/navlist'}">
                        <div class="listNav"><van-icon style="text-align:center;display:block" name="apps-o" color="#ffe8ea"  size="1.5rem" />
                            <p>更多</p>
                        </div>
                        </router-link>
                    </van-col>
                    <van-col span="2"></van-col>
                </van-row>
                </keep-alive>
            </div>
            <div class="content">
                <p class="HomeTitle">严选机构</p>
                <van-row>
                    <van-col span="10"><img class="homeCon" :src="imgLeft+homeCon" alt="" @click="HomeTitle(homeId1)"></van-col>
                    <van-col span="14">
                        <img class="homeRight" :src="imgLeft+homeCon2" @click="HomeTitle(homeId2)" alt="">
                        <img class="homeRight" :src="imgLeft+homeCon3" @click="HomeTitle(homeId3)" alt="">
                    </van-col>
                </van-row>
                <br><br>
                <p class="HomeTitle">精选推荐</p>
                
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
        </van-pull-refresh>
        <van-popup v-model="show" position="bottom" :style="{ height: '30%' }"><van-area :value="areaValue" :area-list="areaList" columns-num="2"  @cancel="quxiaoArea" @confirm="falseArea" /></van-popup>
        <footers></footers>
    </div>
</template>

<script>
import footers from './footer'
import area from '../js/area.js'
    export default {
        name: 'home',
        data () {
            return {
                imgLeft: 'http://111.229.51.194:80',
                value:'',
                onSearch:'',
                pla: '大家都在搜全脸扩充',
                images: [
                
                ],
                areaList:area,
                navs: [
                    
                ],
                homeCon: '',
                homeCon2: '',
                homeCon3: '',
                homeId1: '',
                homeId2: '',
                homeId3: '',
                lists:[
                ],
                show: false,
                address: '地区',
                areaValue: '310100',
                isLoading: false,
                down1: '上海市',
                down2: '310000'
            }
        },
        components: {
            footers
        },
        created(){
            
            if (localStorage.getItem("address")) {
                this.areaValue = localStorage.getItem("address")
                this.address = localStorage.getItem("addre")
                this.down1 = localStorage.getItem("down1")
                this.down2 = localStorage.getItem("down2")
            }
            let url = '/app/categoryList'
            let params = {
                }
            this.$fetch(url,params).then((res)=>{
                this.navs = res.result
            })
            let addResId = {
                area_id: this.areaValue
            }
            let banner = '/banner/indexBanners'
            this.$fetch(banner,addResId)
            .then((res)=>{
                let i = 0
                for(i=0;i<res.result.length;i++){
                    this.images.push(res.result[i])
                }
            })
            .catch((res)=>{
                this.$toast('banner加载失败')
            })
            let shopList = '/app/recommendShopList'
            this.$fetch(shopList,addResId).then((res)=>{
                this.lists = res.result
            })
            .catch((res)=>{
            })
            this.yanxuan()
        },
        methods:{
            yanxuan(){
                let selective = '/selective/list'
                let selectiveList ={
                    area_id: this.areaValue
                }
                this.$fetch(selective,selectiveList)
                .then((res)=>{
                    var i=0
                    for(i=0;i<res.result.length;i++){
                        if(res.result[i].type == '2'){
                            if(res.result[i].hasBrand1 == '1'){
                                this.homeCon = res.result[i].imgPath
                                this.homeId1 = res.result[i].brandId
                            }
                        }else if(res.result[i].type == '3'){
                            if(res.result[i].hasBrand2 == '1'){
                                this.homeCon2 = res.result[i].imgPath
                                this.homeId2 = res.result[i].brandId
                            }
                        }else if(res.result[i].type == '4'){
                            if(res.result[i].hasBrand3 == '1'){
                                this.homeCon3 = res.result[i].imgPath
                                this.homeId3 = res.result[i].brandId
                            }
                        }
                    }
                })
            },
            listClick(id){
                this.$router.push('/CommodityDetails/'+id)
            },
            HomeTitle(homeId1){
                this.$router.push('/brandDetail/'+homeId1)
            },
            HomeTitle(homeId2){
                this.$router.push('/brandDetail/'+homeId2)
            },
            HomeTitle(homeId3){
                this.$router.push('/brandDetail/'+homeId3)
            },
            SearchClick(){
                this.$router.push('/search')
            },
            notice(){
                this.$router.push('/notice')
            },
            showPopup(){
                this.show = true
            },
            quxiaoArea() {
                this.show = false
            },
            falseArea(event){
                let arr,SelectProvinceName,SelectCityName,SelectCountyName,ids;
                arr = event;
                if(arr[0].code == '310000'){
                    SelectProvinceName = arr[0].name;   // 省
                    SelectCityName = arr[1].name;   // 市
                    ids = arr[1].code;
                    
                    this.city = SelectCityName;
                    this.county = SelectCountyName;
                    this.show = false
                    this.$emit('ProCityCountyVal',[SelectProvinceName,SelectCityName,SelectCountyName])
                    this.address = SelectCityName
                    this.areaValue = ids
                    localStorage.setItem("down1",arr[0].name)
                    localStorage.setItem("down2",arr[0].code)
                    localStorage.setItem("address",ids)
                    localStorage.setItem("addre",SelectCityName)
                    let selective = '/selective/list'
                    let selectiveList ={
                        area_id: this.areaValue
                    }
                    this.homeCon = ''
                    this.homeId1 = ''
                    this.homeCon2= ''
                    this.homeId2= ''
                    this.homeCon3= ''
                    this.homeId3= ''
                    this.$fetch(selective,selectiveList)
                    .then((res)=>{
                        var i=0
                        for(i=0;i<res.result.length;i++){
                            if(res.result[i].type == '2'){
                                if(res.result[i].hasBrand1 == '1'){
                                    this.homeCon = res.result[i].imgPath
                                    this.homeId1 = res.result[i].brandId
                                }
                            }else if(res.result[i].type == '3'){
                                if(res.result[i].hasBrand2 == '1'){
                                    this.homeCon2 = res.result[i].imgPath
                                    this.homeId2 = res.result[i].brandId
                                }
                            }else if(res.result[i].type == '4'){
                                if(res.result[i].hasBrand3 == '1'){
                                    this.homeCon3 = res.result[i].imgPath
                                    this.homeId3 = res.result[i].brandId
                                }
                            }
                        }
                    })
                    let banner = '/banner/indexBanners'
                    this.$fetch(banner,selectiveList)
                    .then((res)=>{
                        this.images =[]
                        if(res.result.length <= 0){
                            console.log(this.images)
                        }else{
                            let i = 0
                            for(i=0;i<res.result.length;i++){
                            this.images.push(res.result[i])
                            }
                        }
                        
                    })
                    let addResId = {
                    area_id: this.areaValue
                    }
                    let shopList = '/app/recommendShopList'
                    this.$fetch(shopList,addResId).then((res)=>{
                            this.lists = []
                            this.lists = res.result
                        
                    })
                    .catch((res)=>{
                        this.lists = []
                        this.$toast('暂无数据')
                    })
                }else{
                    this.$toast('该地区暂无服务')
                }
                
            },
            bannLink(shopId){
                this.$router.push('/CommodityDetails/'+shopId)
            },
            onRefresh() {
                setTimeout(() => {
                    var event = [
                        {code: this.down2, name: this.down1},
                        {code: this.areaValue, name: this.address}
                    ]
                    this.falseArea(event)
                    this.$toast('刷新成功');
                    this.isLoading = false;
                }, 1000);
            },
        }
    }
    
</script>

<style scoped>
.home{padding-bottom: 50px;}
.HomeTop li{float: left;line-height: 2.5rem;}
.HomeBack{padding: 0 0.6rem}
.HomeSearch{width: 10rem;position: relative;}
.addres{font-size: 0.7rem;color: #ff6473;margin-right: 1rem;}
.addres p{font-size: 0.7rem;color: #ff6473;width: 2.5rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;float: left;height: 2.5rem;text-align: center;}
.HomeTop:after{content: "";display: block;clear: both;height: 0}
.Search{border: none;border-radius: 30px;background: #ffffff;width: 100%;height: 1.5rem;font-size: 0.7rem;padding-left: 2rem}
.HomeBack{background: #ffe8ea;height: 9.2rem}
.SearchIcon{position: absolute;top: 0.9rem;left: 0.6rem;}
.searchRight{position: absolute;top: 0.9rem;right: -1rem}
.banner img{width: 100%;height: 8rem}
.banner{width:100%;margin: 0 auto;overflow: hidden;border-radius: 10px;height: 8rem}
.HomeNav{margin-top: 4rem;}
.listNav{margin-bottom: 1.75rem}
.listNav img{width: 1.5rem;height: 1.5rem;display: block;margin: 0 auto;}
.listNav p{font-size: 0.6rem;text-align: center;color: #000000;margin-top: 0.3rem;text-decoration:none}
.HomeTitle{font-size: 0.75rem;text-align: center;width: 5.2rem;margin: 0 auto 1.25rem;background: url(../assets/HomeTitle.png) no-repeat;background-size: 100% 100%}
.content{padding: 0 0.6rem}
.homeCon{width: 100%;}
.homeRight{width: 100%;display: block;}
.contentListImg img{width: 100%;}
.contentTitle{font-size: 0.68rem;color: #000000;font-weight: bold;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;line-height: 0.8rem;height: 1.6rem;}
.CommName{color: #9a9a9a;font-size: 0.65rem;}
.total{font-size: 0.7rem;color: #fd424b;}
.num{font-size: 0.65rem;color: #c8c8c8;text-decoration:line-through}
.HomeList{padding-bottom: 0.75rem;border-bottom: 1px solid #e9e9e9;margin-bottom: 0.75rem;}
.notice{margin-left: 2.1rem;margin-top: 0.2rem;}
.NavSearch>div>div{border-radius: 30px;overflow: hidden;}
.NavSearch{border-bottom:1px solid #e9e9e9;background:#ffe8ea}
.NavSearch>i{margin: 0.8rem 0 0 0.6rem;float: left;}
.van-search{width: 11rem;background:#ffe8ea !important;margin:0 auto;}
a:link{text-decoration: none!important;  }
a:visited{text-decoration: none!important;  }
a:hover{text-decoration: none!important;  }
a:active{text-decoration: none!important;  }
a:focus{text-decoration: none!important;  }
</style>