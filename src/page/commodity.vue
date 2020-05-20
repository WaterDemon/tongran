<template>
    <div class="commodity">
        <van-nav-bar :title="title" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <van-row class="commTopNav" v-if="min">
            <van-col span="8" v-if="index <9" v-for="(cate, index) in list" :key="cate.list" @click="sencond(cate.id,index)" ><div class="commTopList" v-bind:class="{active:index==isActive}">{{cate.title}}</div></van-col>
        </van-row>
        <van-row class="commTopNav" v-if="max">
            <van-col span="8" v-for="(cate, index) in list" :key="cate.list" @click="sencond(cate.id,index)" ><div class="commTopList" v-bind:class="{active:index==isActive}">{{cate.title}}</div></van-col>
        </van-row>
        <p class="ClickBrand" @click="ClickBrand()">更多商品信息<van-icon :name="arrowdown" color="#999999" /></p>
        <ul class="commTopNav">
            <li ></li>
        </ul>
        <div class="CommoList">
            <van-row  gutter="10" class="HomeList" v-for="(list,index) in lists" :key="list.lists" @click.native="listClick(list.id)">
                <van-col span="6">
                    <div class="contentListImg">
                        <img :src="imgLeft+list.shopImg" alt="">
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="commTxt">
                        <p class="contentTitle">{{list.shopTitle}}</p>
                        <p class="CommName" v-if="show">{{list.brandTitle}}</p>
                        <p class="CommName" v-if="!show">{{list.webBrand.brandTitle}}</p>
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
    name: 'commodity',
    data() {
        return{
            imgLeft: '',
            params: '',
            lists:[
                    
                ],
            area_id: '',
            list: [],
            isActive: -1,
            title: '',
            min: 1,
            max: 0,
            arrowdown: 'arrow-down',
            show: true
        }
    },
    created (){
        this.imgLeft = localStorage.getItem("temp")
        this.area_id = localStorage.getItem("address")
        var param = this.$route.params.id
        this.title = this.$route.params.res
        this.params = param
        let url = '/app/shopOneList'
            let params = {
                parent_id: param,
                area_id: this.area_id
                }
            this.$fetch(url,params)
            .then((res)=>{
                this.lists = res.result
            })
            .catch((res)=>{
                this.$toast('暂无数据')
            })
        let links = '/app/categoryChildrenList'
        var parms = {
            parent_id: param
        }
        this.$fetch(links,parms)
        .then((res)=>{
            this.list = res.result
        })
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        listClick(id){
            this.$router.push('/CommodityDetails/'+id)
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
		sencond(id, index){
            this.show = false
            this.isActive=index
            let url = '/app/shopList'
            let params = {
                category_id: id,
                area_id: this.area_id
            }
            this.$fetch(url,params)
            .then((res)=>{
                this.lists = res.result
            })
            .catch((res)=>{
                this.lists = []
                this.$toast('该分类暂无数据')
            })
        }
    },
}
</script>

<style scoped>
.CommoList{padding: 0 0.6rem}
.contentListImg img{width: 100%;}
.contentTitle{font-size: 0.68rem;color: #000000;font-weight: bold;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;line-height: 0.8rem;height: 1.6rem;}
.CommName{color: #9a9a9a;font-size: 0.65rem;}
.total{font-size: 0.7rem;color: #fd424b;}
.num{font-size: 0.65rem;color: #c8c8c8;text-decoration:line-through}
.HomeList{padding-bottom: 0.75rem;border-bottom: 1px solid #e9e9e9;margin-bottom: 0.75rem;}
.commTopNav{padding: 0 0.2rem;margin: 0.6rem 0;}
.commTopNav .commTopList{padding: 0.2rem 0;margin-right: 0.4rem;background: #fff;border-radius: 10px;font-size: 0.7rem;color: #000;margin-bottom: 0.4rem;border: 1px solid #ddd;text-align:center;}
.commTopNav .commTopList.active{color: #fff;background: #fd424b;}
.ClickBrand{color: #999999;text-align: center;margin-top: 0.6rem;font-size:0.7rem;}
.ClickBrand i{margin-left: 0.2rem;}
</style>