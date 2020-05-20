<template>
    <div class="navlist">
        <van-nav-bar title="分类" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <van-sidebar v-model="activeKey" style="float:left">
            <van-sidebar-item :title="nav.title" v-for="(nav, index) in navlist" :key="nav.navlist" @click="onChange(nav.id)" />
        </van-sidebar>
        <div class="navRight">
            <ul>
                <li v-for="cate in list" :key="cate.list" @click="sencond(cate.id)">{{cate.title}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { Notify } from 'vant'
export default {
    name: 'navlist',
    data() {
        return{
            activeKey: 0,
            navlist: [],
            one: '',
            list: []
        }
    },
    created() {
        let link = '/app/categoryListAll'
        this.$fetch(link)
        .then((res)=>{
            this.navlist = res.result
            this.one = res.result[0].id
            let links = '/app/categoryChildrenList'
            var parms = {
                parent_id: this.one
            }
            this.$fetch(links,parms)
            .then((res)=>{
                this.list = res.result
            })
        })
        
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        onChange(id) {
            let links = '/app/categoryChildrenList'
            var parms = {
                parent_id: id
            }
            this.$fetch(links,parms)
            .then((res)=>{
                this.list = res.result
            })
        },
        sencond(id){
            this.$router.push('/second/'+id)
        }
    }
}
</script>

<style scoped>
.navRight{float: left;margin-left: 1rem;margin-top: 0.6rem;}
.navRight ul{width: 13rem;}
.navRight ul li{float: left;margin-right: 0.4rem;background: #fff;border-radius: 10px;font-size: 0.7rem;color: #000;padding: 0.2rem 0.6rem;margin-bottom: 1rem;border: 1px solid #ddd;}
</style>