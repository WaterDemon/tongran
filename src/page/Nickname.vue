<template>
    <div class="Nickname">
        <van-nav-bar title="昵称" right-text="保存"  @click-right="onClickRight" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <div class="">
            <van-cell-group>
                <van-field v-model="name" :value="value" placeholder="请输入新昵称" :clearable="true" />
            </van-cell-group>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Nickname',
    data (){
        return{
            value: '',
            name:''
        }
    },
    methods:{
        onClickRight(){
            console.log('保存')
        },
        onClickLeft(){
            this.$router.go(-1)
        },
        onClickRight(){
            let token = localStorage.getItem("token")
            let nick = '/appuser/nick'
            let params = {
                userToken: token,
                nick: this.name
            }
            this.$fetch(nick,params)
            .then((res)=>{
                this.$toast('修改成功')
                this.$router.push('/data')
            })
            .catch((res)=>{
                this.$toast('修改失败')
            })
        }
    }
}
</script>

<style scoped>

</style>

