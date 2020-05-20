<template>
    <div class="search">
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
        <br>
        <!-- <div class="SearchList">
            <van-row>
                <van-col span="12">热门搜索</van-col>
                <van-col span="12"><van-icon  @click="delet()" name="delete" size="20px" /></van-col>
            </van-row>
            <br>
            <ul class="SearchTxt" v-if="show">
                <li>双眼皮</li>
                <li>全身抽脂</li>
            </ul>
        </div> -->
    </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
    name: 'search',
    data() {
        return{
            value: '',
            placeholder: '水光针',
            show: true
        }
    },
    components: {
        [Dialog.Component.name]: Dialog.Component
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        onSearch(){
            //点击回车键触发
            let value = this.value
            if(value == ''){
                this.$toast('搜索信息不能为空')
            }else{
                this.$router.push('/result/'+value)
            }
            
        },
        onCancel(){

        },
        delet(){
            Dialog.confirm({
                title: '确认删除',
                }).then(() => {
                    this.show = false
                }).catch(() => {
                // on cancel
            })
        },
        
    }
}
</script>

<style scoped>
.search{padding-bottom: 2rem;}
.NavSearch{border-bottom:1px solid #e9e9e9;}
.NavSearch>i{margin: 0.8rem 0 0 0.6rem;float: left;}
.van-search{width: 15rem;float: left;}
.NavSearch>div>div{border-radius: 30px;overflow: hidden;}
.SearchList{font-size: 0.66rem;padding: 0 0.6rem;}
.SearchList i{float: right}
.SearchTxt li{float: left;background-color: #f7f7f7;padding: 0.2rem 0.4rem;margin-right: 1rem;}
.SearchTxt:after{content:'';display: block;height: 0;clear: both;}
</style>