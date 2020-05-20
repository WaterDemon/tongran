<template>
    <div class="Collection">
        <van-nav-bar title="我的收藏" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <br>
        <div class="CommoList">
            <van-row  gutter="10" class="HomeList" v-for="(list,index) in lists" :key="list.lists" @click.native="listClick(list.id)">
                <van-swipe-cell>

                    <van-cell :border="false" value="内容">
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
                    </van-cell>
                    <template slot="right">
                        <van-button square type="danger" @click="delect(list.id)" text="删除" />
                    </template>
                </van-swipe-cell>
            </van-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Collection',
    data() {
        return{
            imgLeft:'',
            lists:[
                   
                ]
        }
    },
    activated(){
        this.imgLeft = localStorage.getItem("temp")
        let token = localStorage.getItem("token")
        let rebate = '/appuser/collectList'
        let params = {
            userToken: token
        }
        this.$fetch(rebate,params)
        .then((res)=>{
            this.lists = res.result
        })
        .catch((res)=>{
            this.$toast('获取失败')
        })
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        listClick(id){
            this.$router.push('/CommodityDetails/'+id)
        },
        delect(id){
            let token = localStorage.getItem("token")
            var id = id
            let adddCurl = '/appuser/delcollect'
            let addJson = {
                userToken: token,
                shopId: id
            }
            this.$fetch(adddCurl,addJson)
                .then((res)=>{
                    this.$toast('已取消')
                    location.reload()
            })
        }
        
    }
}
</script>

<style scoped>
.CommoList{padding: 0 0.6rem}
.contentListImg img{width: 100%;}
.CommtopRI{border-left: 1px solid #e9e9e9}
.contentTitle{font-size: 0.68rem;color: #000000;font-weight: bold;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;line-height: 0.8rem;height: 1.6rem;}
.CommName{color: #9a9a9a;font-size: 0.65rem;}
.total{font-size: 0.7rem;color: #fd424b;}
.num{font-size: 0.65rem;color: #c8c8c8;text-decoration:line-through}
.HomeList{padding-bottom: 0.75rem;border-bottom: 1px solid #e9e9e9;margin-bottom: 0.75rem;}
.van-button{margin-top:1rem}
</style>