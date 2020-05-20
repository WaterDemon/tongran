<template>
    <div class="Commevaluate">
        <van-nav-bar title="全部评价" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <ul class="CommList">
            <li v-for="list in tabs" :key="list.tabs">
                <div class="comHead">
                    <img :src="imgLeft+list.phone" alt="">
                    <span>{{list.nick}}</span>
                    <div class="clear"></div>
                </div>
                <div class="time">{{list.date}} <span>{{list.shopName}}</span></div>
                <div class="detailList">{{list.content}}</div>
                <ul class="comImgList">
                    <li @click="imgLook(imgLeft+imgList.img)" v-for="(imgList, index) in list.imgList" :key="imgList.imgList"><img :src="imgLeft+imgList.img" alt=""></li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import {ImagePreview} from 'vant'
export default {
    name: 'Commevaluate',
    data() {
        return{
            imgLeft: '',
            tabs: [
                
            ],
        }
    },
    activated(){
        var param = this.$route.params.id
        this.imgLeft = localStorage.getItem("temp")
        let rebate = '/app/shopEvaluate'
        let params = {
            shopId: param
        }
        this.$fetch(rebate,params)
        .then((res)=>{
            console.log(res.result)
            this.tabs = res.result
            this.tabs.reverse()
        })
        .catch((res)=>{
            this.$toast('获取失败')
        })
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        imgLook(img) {
            ImagePreview([
                img
            ])
        }
    }
}
</script>

<style scoped>
.Commevaluate{background: #f5f5f5;}
.CommList{}
.CommList>li{margin-bottom: 0.5rem;padding: 0.75rem;background: #ffffff;}
.comHead{margin-bottom: 0.5rem;}
.comHead img{width: 2rem;height: 2rem;border-radius: 50%;float: left;margin-right: 0.4rem;}
.comHead span{font-size: 0.8rem;line-height: 2rem;float: left;}
.time{font-size: 0.7rem;color: #7f7f7f;margin-bottom: 0.4rem;}
.detailList{font-size: 0.75rem;margin-bottom: 1rem;}
.comImgList:after{content: '';display: block;clear: both;height: 0}
.comImgList li{float: left;margin-right: 0.2rem;}
.comImgList img{width: 3.8rem;height: 3.8rem;}
</style>