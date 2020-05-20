<template>
    <div class="evaluate">
        <van-nav-bar title="评价" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <div class="Stars">
            <van-row gutter="10">
                <van-col span="4">
                    <img class="StarImg" src="../assets/detail1.jpg" alt="">
                </van-col>
                <van-col span="20" class="StarNum">
                    <van-rate
                    v-model="value"
                    :size="25"
                    color="#ff6473"
                    void-icon="star"
                    void-color="#eee"
                    />
                </van-col>
            </van-row>
            <br>
            <van-cell-group class="textarea">
                <van-field
                    v-model="message"
                    rows="2"
                    autosize
                    type="textarea"
                    maxlength="500"
                    placeholder=""
                    show-word-limit
                />
            </van-cell-group>
            <br>
            <div class="uploader"><van-uploader :max-count="6" v-model="fileList" :after-read="afterRead" /></div>
            <br><br><br><br><br><br><br>
            <van-button class="evaluteButton" @click="buttres" v-if="!hide" size="large" round color="linear-gradient(to right, #ff6674, #fdbdb1)">评价</van-button>
            <van-button class="evaluteButton" v-if="hide" size="large" round color="linear-gradient(to right, #ff6674, #fdbdb1)">loading~</van-button>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'evaluate',
    data() {
        return{
            imgLeft:'',
            value: 3,
            message: '',
            fileList: [
            ],
            id:'',
            shopId:'',
            hide: false
        }
    },
    
    created(){
        this.id = this.$route.params.id
        this.shopId = this.$route.params.shopId
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        dataURLtoFile (dataurl, filename) { // 将base64转换为file文件
            let arr = dataurl.split(',')
            let mime = arr[0].match(/:(.*?);/)[1]
            let bstr = atob(arr[1])
            let n = bstr.length
            let u8arr = new Uint8Array(n)
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n)
            }
            return new File([u8arr], filename, {type: mime})
        },
        afterRead(file) {
            if (file.file.size > 519430) {
                let canvas = document.createElement('canvas') 
                let context = canvas.getContext('2d')
                let img = new Image()
                img.src = file.content 
                img.onload = () => {
                canvas.width = 400 
                canvas.height = 300
                context.drawImage(img, 0, 0, 400, 300)
                file.content = canvas.toDataURL(file.file.type, 0.92)
                let files = this.dataURLtoFile(file.content, file.file.name)
                const data = new FormData()
                data.append('file', files)
                data.append('code', this.applyNo)
                data.append('type', 'chat')
                }
            } else { 
                const data = new FormData()
                data.append('file', file.file)
                data.append('code', this.applyNo)
                data.append('type', 'chat')
                
                }
        },
        buttres(){
            this.imgLeft = localStorage.getItem("temp")
            console.log(this.fileList)
            let i =0
            var baseMax=''
            for(i=0;i<this.fileList.length;i++){
                baseMax += this.fileList[i].content+'~'
            } 
            let token = localStorage.getItem("token")
            let rebate = '/appuser/addEvaluate'
            let params = {
                userToken: token,
                shopId: this.shopId,
                orderId: this.id,
                rank: this.value,
                content:this.message,
                image: baseMax
            }
            this.$fetch(rebate,params)
            .then((res)=>{
                if(res.message == '评价成功'){
                    this.hide == true
                    this.$router.push('/user')
                }
            })
            .catch((res)=>{
            })
        },
    }
}
</script>

<style scoped>
.Stars{padding: 0.6rem;}
.Stars .StarImg{width: 100%;}
.StarNum{margin-top: 0.6rem;}
.textarea .van-cell{background-color: #f8f8f8}
.evaluteButton{width: 90%;margin: 0 auto;display: block;height: 2.5rem;line-height:2.5rem;}
</style>