<template>
    <div class="Nickname">
        <van-nav-bar title="生日、性别">
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <div class="sex">
            <van-field name="radio" label="性别">
                <template #input>
                    <van-radio-group v-model="radio" direction="horizontal">
                    <van-radio name="1">男</van-radio>
                    <van-radio name="0">女</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field
                label="生日"
                disabled
                placeholder="请输入生日"
                :value="times"
                @click="popupTime()"
            />
            <br><br><br>
        </div>
        <div class="submitLogin"><van-button @click='register()' type="primary" color="linear-gradient(to right, #ff6674, #fdbdb1)" size="normal">确定</van-button></div>
        
        <van-popup
            v-model="show"
            position="bottom"
            :style="{ height: '40%' }"
            >
            <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="buttons"
            @cancel="canlse"
            />
        </van-popup>
    </div>
</template>

<script>
export default {
    name: 'Nickname',
    data (){
        return{
            value: '',
            name:'',
            radio: '1',
            show: false,
            times: '',
            minDate: new Date(1920, 0, 1),
            maxDate: new Date,
            currentDate: new Date(),
        }
    },
    created() {
        let token = localStorage.getItem("token")
        let rebate = '/appuser/my'
        let params = {
            userToken: token
        }
        this.$fetch(rebate,params)
        .then((res)=>{
            if(res.result[0].sex == '女'){
                this.radio = '0'
            }
            this.times = res.result[0].birth
        })
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        popupTime(){
            this.show = true
        },
        buttons(){
            let timeRes = this.currentDate
            var formatDateTime = function (date) {
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                return y + '-' + m + '-' + d;
            }
            this.times = formatDateTime(timeRes)
            this.show = false
        },
        canlse(){
            this.show = false
        },
        register(){
            let register = '/appuser/userSex'
            let token = localStorage.getItem("token")
            let params = {
                userToken: token,
                sex: this.radio
            }
            this.$fetch(register,params)
            .then((res)=>{
            })
            let timeCos = '/appuser/userBirth'
            let ats = {
                userToken: token,
                userBirth: this.times
            }
            this.$fetch(timeCos,ats)
            .then((res)=>{
                this.$toast('设置成功')
                this.$router.push('/user')
            })
        }
    }
}
</script>

<style scoped>
.sex{margin-left:1rem;}
.submitLogin{width:93%;margin:0 auto;}
.submitLogin button{border-radius: 30px;border:none;width: 100%;}
.submitLogin button span{font-size:0.8rem;font-weight: bold;}
</style>

