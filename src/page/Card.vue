<template>
    <div class="Card">
        <van-nav-bar title="绑定银行卡" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <van-cell-group>
            <van-field
                v-model="username"
                label="持卡人"
                placeholder="请填写持卡人"
            />
            <van-field
                v-model="num"
                label="卡号"
                placeholder="请绑定持卡人本人的银行卡"
            />
        </van-cell-group>
        <br><br><br><br><br>
        <van-button class="evaluteButton" @click="bangding()"  size="large" round color="linear-gradient(to right, #ff6674, #fdbdb1)">绑定卡号</van-button>
    </div>
</template>

<script>
export default {
    name: 'Card',
    data() {
        return{
            username: '',
            num: ''
        }
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        bangding(){
            if(this.username == ''){ 
                this.$toast('请填写持卡人')
            }else if(this.num == ''){
                this.$toast('请填写持卡人本人的银行卡')
            }else{
                let token = this.imgLeft = localStorage.getItem("token")
                let bind = '/appuser/bind'
                let params = {
                    userToken: token,
                    account: this.num,
                    name: this.username
                }
                this.$fetch(bind,params)
                .then((res)=>{
                    this.$toast('绑定成功')
                    this.$router.push('/wallet')
                })
                .catch((res)=>{
                    this.$toast('绑定失败')
                })
            }
        }
    }
}
</script>

<style scoped>
.evaluteButton{width: 90%;margin: 0 auto;display: block;height: 2.3rem;line-height:2.3rem;}
</style>