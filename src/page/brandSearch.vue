<template>
    <div class="brandSearch">
        <van-nav-bar left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <div class="brandCon">
            <van-row class="brandLists" gutter="10" v-for="(brandList, index) in brand" :key="index" @click="brandClick(brandList.id)">
				<van-col span="6">
					<img :src='imgLeft+brandList.img' alt="">
				</van-col>
				<van-col span="18">
					<h3>{{brandList.title}}</h3>
                    <p>地址：{{brandList.address}}</p>
                    <span>特长：{{brandList.speciality}}</span>
				</van-col>
			</van-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'brandSearch',
    data() {
        return{
            brand:[
                
            ],
            imgLeft: '',
        }
    },
    created(){
        this.imgLeft = localStorage.getItem("temp")
        var param = this.$route.params.id
        let areaValue = localStorage.getItem("address")
        let brand = '/app/brandListFind'
        let params = {
            title:param,
            area_id: areaValue
        }
        this.$fetch(brand,params)
        .then((res)=>{
            this.brand = res.result
        })
        .catch((res)=>{
            this.$toast('网络异常')
        })
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        brandClick(id){
            this.$router.push('/brandDetail/'+id)
        }
    }
}
</script>

<style scoped>
.brandCon{padding: 0 0.75rem;margin-top: 1rem;line-height: 1.6}
.brandCon h2{margin-bottom: 1rem;}
.brandCon img{width: 100%;}
.brandCon h3{color: #333333;font-size: 0.7rem;}
.brandCon span{color: #999999;font-size: 0.7rem;display: block}
.brandCon p{color: #999999;font-size: 0.7rem;}
.brandLists{margin-bottom: 1rem}
</style>