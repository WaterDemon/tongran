<template>
    <div class="noticeDetail">
        <van-nav-bar title="消息内容" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <div class="noticeDet">
            <p>{{mailTitle}}</p>
            <span v-html="mailContent">{{mailContent}}</span>
            <br>
            <img style="width:100%" :src="imgLeft+img" alt="">
        </div>
        <br>
        <p class="time">{{initDate}}</p>
        <br>
        
    </div>
</template>

<script>
export default {
    name: 'noticeDetail',
    data() {
        return{
            imgLeft:'',
            img: '',
            mailTitle: '',
            mailContent: '',
            initDate: '',
        }
    },
    activated(){
        this.imgLeft = localStorage.getItem("temp")
        let id = this.$route.params.id
        let rebate = '/mail/mailDetail'
        let params = {
            mail_id :id
        }
        this.$fetch(rebate,params)
        .then((res)=>{
            console.log(res)
            this.mailTitle = res.result.mailTitle
            this.mailContent = res.result.mailContent
            this.initDate = res.result.initDate
            this.img = res.result.imgPath
        })
        .catch((res)=>{
            this.$toast('')
        })
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
    }
}
</script>

<style scoped>
.noticeDet{padding: 0.6rem;}
.noticeDet p{font-size: 0.8rem;color: #000000;}
.noticeDet span{color: #999999;font-size: 0.7rem;}
.time{text-align: right;font-size: 0.68rem;margin-right: 0.4rem;color: #999999;}
</style>