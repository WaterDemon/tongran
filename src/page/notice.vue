<template>
    <div class="notice">
        <van-nav-bar title="通知消息" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <div>
            <van-row class="noticeList" v-for="(iten, index) in list" :key="iten.list" @click="noticeDetail(iten.id)">
                <van-swipe-cell>
                    <van-cell :border="false" value="内容">
                        <van-col span="5" class="noticeListImg">
                            <img :src="imgLeft+iten.imgPath" alt="">
                        </van-col>
                        <van-col span="13" class="noticeBor">
                            <p>{{iten.mailTitle}}</p>
                            <span class="huanhang">{{iten.mailSubTitle}}</span>
                        </van-col>
                        <van-col span="6" class="noticeBor noticeRight">
                            <br>
                            <p>{{iten.initDate}}</p>
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
    name: 'notice',
    data() {
        return{
            imgLeft:'',
            list: ''
        }
    },
    activated(){
        this.imgLeft = localStorage.getItem("temp")
        let rebate = '/mail/mailList'
        let token = localStorage.getItem("token")
        let params = {
            userToken: token
        }
        this.$fetch(rebate,params)
        .then((res)=>{
            this.list = res.result
        })
        .catch((res)=>{
            this.$toast('')
        })
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
		noticeDetail(id){
            this.$router.push('/noticeDetail/'+id)
        },
        delect(delId){
            let token = localStorage.getItem("token")
            let zujiUrl = '/mail/mailDelete'
            let zuji = {
                userToken: token
            }
            this.$fetch(zujiUrl,zuji)
            .then((res)=>{
                this.$toast("删除成功")
                location.reload()
            })
        }
    }
}
</script>

<style scoped>
.noticeList p{font-size: 0.75rem;color: #333333;line-height: 1.2rem;}
.noticeList .huanhang{font-size: 0.68rem;color: #999999;line-height: 1rem;overflow: hidden;}
.huanhang{text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;}
.noticeListImg img{width: 100%;}
.noticeRight{text-align: right}
.noticeRight p{font-size: 0.65rem;}
</style>