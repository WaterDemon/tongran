<template>
    <div class="Success">
        <van-nav-bar title="预约成功" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <div class="success">
            <img src="../assets/success.png" alt="">
        </div>
        <p>付款成功</p>
        <div class="submit"><van-button @click='register()' type="primary" color="linear-gradient(to right, #ff6674, #fdbdb1)" size="normal">返回首页</van-button></div>
    </div>
</template>

<script>
export default {
    name: 'Success',
    data() {
        return{

        }
    },
    methods:{
        onClickLeft(){
            this.$router.push('/')
        },
        register(){
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.success{margin: 5rem auto 0.75rem;width: 3.2rem;}
.success img{width: 100%;}
p{text-align: center;font-size: 0.8rem;font-weight: bold;}
.submit{margin: 4rem auto 0;width: 93%;}
.submit button{width:100%;margin:0 auto;border-radius: 30px;color: #666666;}
.submit button span{font-size:0.8rem;font-weight: bold;}
</style>
