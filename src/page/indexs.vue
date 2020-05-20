<template>
    <div class="indexs">
        <keep-alive  exclude="Submission,user,data,brandSearch,NickHead,commodity,commodity,navlist,evaluate,brandDetail,payment,evaluate,search">
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
    </div>
</template>

<script>

export default {
    name: 'indexs',
    data() {
        return{
            
        }
    },
    components: {
    },
    methods:{
        
    }
}
</script>

<style scoped>
</style>