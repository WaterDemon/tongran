<template>
    <div class="result">
        <div class="NavSearch">
            <van-icon name="arrow-left" color="#666666" @click="onClickLeft()" />
            <van-search
                v-model="value"
                :placeholder="placeholder"
                @search="onSearch"
                @cancel="onCancel"
            />
            <div class="clear"></div>
        </div>
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
    name: 'result',
    data() {
        return{
            imgLeft: '',
            value: '',
            placeholder: '',
            lists:[
                    
                ]
        }
    },
    activated(){
        let id = this.$route.params.id
        this.imgLeft = localStorage.getItem("temp")
        let rebate = 'app/shopTitleDetails'
        let params = {
            search: id
        }
        this.$fetch(rebate,params)
        .then((res)=>{
            this.lists = res.result
        })
        .catch((res)=>{
            this.$toast('暂无数据')
        })
    },
    methods:{
        onClickLeft(){
            this.$router.push('/')
        },
        onSearch(){
            //点击回车键触发
            let value = this.value
            let rebate = '/app/shopTitleDetails'
            let params = {
                search: value
            }
            this.$fetch(rebate,params)
            .then((res)=>{
                this.lists = res.result
            })
            .catch((res)=>{
                this.$toast('暂无数据')
            })
        },
        listClick(id){
            this.$router.push('/CommodityDetails/'+id)
        },
        onCancel(){

        }
    }
}
</script>

<style scoped>
.NavSearch>i{margin: 0.8rem 0 0 0.6rem;float: left;}
.van-search{width: 15rem;float: left;}
.NavSearch>div>div{border-radius: 30px;overflow: hidden;}
.CommoList{padding: 0 0.6rem}
.contentListImg img{width: 100%;}
.contentTitle{font-size: 0.68rem;color: #000000;font-weight: bold;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;line-height: 0.8rem;height: 1.6rem;}
.CommName{color: #9a9a9a;font-size: 0.65rem;}
.total{font-size: 0.7rem;color: #fd424b;}
.num{font-size: 0.65rem;color: #c8c8c8;text-decoration:line-through}
.HomeList{padding-bottom: 0.75rem;border-bottom: 1px solid #e9e9e9;margin-bottom: 0.75rem;}
</style>