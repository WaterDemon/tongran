<template>
    <div class="brand">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="NavSearch">
            <van-search
                v-model="value"
                :placeholder="placeholder"
                @search="onSearch"
                @cancel="onCancel"
            />
        </div>
        <div class="banner">
			<van-swipe :autoplay="3000" indicator-color="#fd424b">
				<van-swipe-item v-for="(image, index) in images" :key="index">
					<img v-lazy="imgLeft+image.imgPath"  @click="bannLink(image.brandId)" />
				</van-swipe-item>
			</van-swipe>
		</div>
        <div class="brandCon">
            <h2>推荐品牌</h2>
            <van-row class="brandLists" gutter="10" v-for="(brandList, index) in brand" :key="index" @click="brandClick(brandList.id)">
				<van-col span="6">
					<img :src='imgLeft+brandList.brandImg' alt="">
				</van-col>
				<van-col span="18">
					<h3>{{brandList.brandTitle}}</h3>
                    <p>地址：{{brandList.brandAddress}}</p>
                    <span>特长：{{brandList.brandSpeciality}}</span>
				</van-col>
			</van-row>
        </div>
        </van-pull-refresh>
        <footers></footers>
    </div>
</template>

<script>
import footers from './footer'
export default {
    name: 'brand',
    data() {
        return{
            value: '',
            placeholder: '品牌',
            show: true,
            images:[
                
            ],
            brand:[
                
            ],
            imgLeft: '',
            value: '',
            fan: true,
            isLoading: false,
        }
    },
    activated(){
        this.value = ''
    },
    created(){
        this.brandLoad()
    },
    components: {
        footers
    },
    methods:{
        brandLoad(){
            this.imgLeft = localStorage.getItem("temp")
            let bannerBrand = 'banner/brandBanners'
            let res = {}
            this.images =[]
            this.$fetch(bannerBrand,res)
            .then((res)=>{
                let i = 0
                for(i=0;i<res.result.length;i++){
                    this.images.push(res.result[i])
                }
            })

            let areaValue = localStorage.getItem("address")
            
            let brand = '/app/brandList'
            let params = {
                area_id:areaValue
            }
            this.$fetch(brand,params)
            .then((res)=>{
                this.brand = res.result
            })
            .catch((res)=>{
            })
        },
        bannLink(id){
            this.$router.push('/brandDetail/'+id)
        },
        brandClick(brandId){
            this.$router.push('/brandDetail/'+brandId)
        },
        onSearch(){
            //点击回车键触发
            let id = this.value
            if(id == ''){
                this.$toast('搜索信息不能为空')
            }else{
                this.$router.push('/brandSearch/'+id)
            }
            
        },
        onCancel(){

        },
        onRefresh() {
            setTimeout(() => {
                this.brandLoad()
                this.$toast('刷新成功');
                this.isLoading = false;
            }, 1000);
        },
    }
}
</script>

<style scoped>
.search{padding-bottom: 2rem;}
.NavSearch{border-bottom:1px solid #e9e9e9;background:#ffe8ea}
.NavSearch>i{margin: 0.8rem 0 0 0.6rem;float: left;}
.van-search{width: 15rem;background:#ffe8ea !important;margin:0 auto;}
.brand{padding-bottom: 50px;}
.banner{width: 100%;height: 7.5rem}
.van-pull-refresh{overflow: visible;}
.banner img{width: 100%;height: 8rem;}
.brandCon{padding: 0 0.75rem;margin-top: 1rem;line-height: 1.6}
.brandCon h2{margin-bottom: 1rem;}
.brandCon img{width: 100%;}
.brandCon h3{color: #333333;font-size: 0.7rem;}
.brandCon span{color: #999999;font-size: 0.7rem;display: block}
.brandCon p{color: #999999;font-size: 0.7rem;}
.brandLists{margin-bottom: 1rem}
.Search{border: 1px solid #ddd;border-radius: 30px;background:rgba(255, 255, 255, 0.6);width: 100%;height: 1.5rem;font-size: 0.7rem;padding-left: 2rem}
.HomeBack{height: 6.2rem;background-size: 100% 100%;}
.SearchIcon{position: absolute;top: 0.9rem;left: 0.6rem;}
.addres{margin-top: 0.4rem;margin-right: 0.6rem;}
.NavSearch>div>div{border-radius: 30px;overflow: hidden;}
</style>