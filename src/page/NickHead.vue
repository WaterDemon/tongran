<template>
    <div class="NickHead">
        <van-nav-bar title="修改头像" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <br>
        <van-uploader :after-read="afterRead" v-if="hide" accept="image/*" />
        <img ref="train_header_img" src="" alt v-if="hide">
        <div class="photo" v-if="show">
            <vue-cropper
              ref="cropper"
              :img="options.img"
              :outputSize="options.outputSize"
              :outputType="options.outputType"
              :info="options.info"
              :canScale="options.canScale"
              :autoCrop="options.autoCrop"
              :autoCropWidth="options.autoCropWidth"
              :autoCropHeight="options.autoCropHeight"
              :fixed="options.fixed"
              :fixedNumber="options.fixedNumber"
            ></vue-cropper>
            <div class="cropper-btn">
                <!-- <button @click="onCubeImg" type="primary">确定</button>
                <button @click="cropperCancel" type="danger">取消</button> -->
            </div>
		    </div>
        <van-button class="buttons" @click="onCubeImg" round type="primary" v-if="buttons" color="#ff6473" size="large">确认</van-button>
    </div>
</template>

<script>
import { VueCropper } from 'vue-cropper';
export default {
    name: 'NickHead',
    data() {
        return{
            options: {
            img: '', // 裁剪图片的地址
            info: true, // 裁剪框的大小信息
            outputSize: 1, // 裁剪生成图片的质量
            outputType: 'jpeg', // 裁剪生成图片的格式
            canScale: true, // 图片是否允许滚轮缩放
            autoCrop: true, // 是否默认生成截图框
            autoCropWidth: 1000, // 默认生成截图框宽度
            autoCropHeight: 1000, // 默认生成截图框高度
            fixed: true, // 是否开启截图框宽高固定比例
            fixedNumber: [4, 4] // 截图框的宽高比例
            },
            isShowCropper: false,
            show: false,
            uploadImgUrl: '',
            hide: true,
            buttons: true
        }
    },
    created(){
      
    },
    mounted(){
        //this.license()
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        afterRead(file) {
        // 此时可以自行将文件上传至服务器
            this.options.img = file.content
            this.show = true
        },
        onCubeImg () {
        // 获取cropper的截图的base64 数据
        this.$refs.cropper.getCropData(data => {
          this.$refs.train_header_img.src = data;
          // 将剪裁后base64的图片转化为file格式
          let file = this.dataURLtoFile(data, 'avatar');
          this.uploadImgUrl = file;
          this.show = false
          this.hide = false
          this.cropperCancel();
          this.head()
        });
      },
      // 取消裁剪
      cropperCancel () {
        this.isShowCropper = false;
        this.options.img = '';
        //this.$refs.header_img.value = '';
      },
        // 将base64转换为文件对象
      dataURLtoFile (dataurl, filename) {
        let arr = dataurl.split(',');
        let mime = arr[0].match(/:(.*?);/)[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        // 转换成file对象
        return new File([u8arr], filename + '.' + mime.split('/')[1], {
          type: mime
        });
        // 转换成成blob对象
        // return new Blob([u8arr],{type:mime});
      },
            // 处理文件
      handleAvatarImgChange (fileInput, file1) {
        this.isShowCropper = true;
        const files = this.$refs[fileInput].files;
        let file = event.target.files[0];
        if (window.FileReader) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          // 监听文件读取结束后事件
          reader.onloadend = e => {
            this.options.img = e.target.result;
            // this.$refs.train_header_img.src = e.target.result; // e.target.result就是最后的路径地址
          };
        }
        if (files.length > 1) {
          this.addTrainForm.header_img = '';
          return this.$message.error('只能选择一个文件');
        }
        if (!files.length) {
          this.addTrainForm.header_img = '';
          return false;
          // return message.error('请选择培训宣传图');
        }
        this.$set(this.addTrainForm, file1, files[0].name);
      },
            // 选择文件
      handleChooseAvatarImgFile (fileName) {
        this.$refs[fileName].click();
      },
        head(){
          this.buttons = false
            let token = this.imgLeft = localStorage.getItem("token")
            let bind = '/appuser/userImage'
            let params = {
                userToken: token,
                photo: this.$refs.train_header_img.src
            }
            this.$fetch(bind,params)
            .then((res)=>{
                this.$toast('上传成功')
                this.$router.push('/data')
            })
            .catch((res)=>{
                this.$toast('上传失败')
            })
        }
    },
    components: {
        'vue-cropper': VueCropper
    },
}
</script>

<style scoped>
.NickHead{padding: 0.6rem;}
.buttons{margin: 5rem auto 0;}
.photo{width: 12rem;height: 12rem;background-size: 100% 100%;margin: 0 auto;}
.photo img{width: 6rem;}
.photo input{width: 6rem;opacity: 0;height: 6rem;}
.cropper-btn{margin-top: 3rem;float: left;}
</style>