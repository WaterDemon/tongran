<template>
    <div class="second">
        <van-nav-bar left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <br>
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
                        <p class="CommName">{{list.webBrand.brandTitle}}</p>
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
            area_id: ''
        }
    },
    created(){
        this.imgLeft = localStorage.getItem("temp")
        this.area_id = localStorage.getItem("address")
        var param = this.$route.params.id
        this.params = param
        console.log(this.params)
        let url = '/app/shopList'
            let params = {
                category_id: param,
                area_id: this.area_id
                }
            this.$fetch(url,params)
            .then((res)=>{
                console.log(res.result)
                this.lists = res.result
            })
            .catch((res)=>{
                this.$toast('暂无数据')
            })
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        listClick(id){
            this.$router.push('/CommodityDetails/'+id)
        }
		
    }
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
</style>