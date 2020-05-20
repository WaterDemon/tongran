<template>
    <div class="orderDetail">
        <van-nav-bar title="订单详情" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <div class="listDetail">
            <van-row class="orderList" @click="orderDetailLink(listdetail.id)">
                <van-col span="5">
                    <div class="commodityImg">
                        <img :src="imgLeft+listdetail.shopAtta" alt="">
                    </div>
                </van-col>
                <van-col span="19">
                    <div class="commTxt">
                        <p class="title">
                            {{listdetail.shopTitle}}<br>
                            定金：{{listdetail.orderEarnestPrice}}
                        </p>
                        <p class="total">￥{{listdetail.orderAmount}}</p>
                        <div class="clear"></div>
                        <p class="num">x1</p>
                        <div class="clear"></div>
                        <p class="time">预约时间：{{listdetail.orderTime}}</p>
                        <p class="MaxTotal">总价:<span>￥{{listdetail.orderAmount}}</span></p>
                        <div class="clear"></div>
                    </div>
                </van-col>
            </van-row>
            <ul class="orderDetailLists">
                <li>
                    <h3>定金</h3>
                    <p>{{listdetail.orderEarnestPrice}}</p>
                    <div class="clear"></div>
                </li>
                <li>
                    <h3>预约上门时间</h3>
                    <p>{{listdetail.orderTime}}</p>
                    <div class="clear"></div>
                </li>
                <li>
                    <h3>联系人姓名</h3>
                    <p v-if="listdetail.userName==null">-</p>
                    <p>{{listdetail.userName}}</p>
                    <div class="clear"></div>
                </li>
                <li>
                    <h3>联系人电话</h3>
                    <p>{{listdetail.orderWechatNum}}</p>
                    <div class="clear"></div>
                </li>
                <li>
                    <h3>服务人员电话</h3>
                    <p v-if="listdetail.orderContactPhone==null">-</p>
                    <p>{{listdetail.orderContactPhone}}</p>
                    <div class="clear"></div>
                </li>
                <li>
                    <h3>下单时间</h3>
                    <p>{{listdetail.initDate}}</p>
                    <div class="clear"></div>
                </li>
            </ul>
            <div class="orderDetailFix">
                <div class="detailButton" v-if="listdetail.type === '1' ">
                    <input type="button" value="取消订单" @click="cancel(listdetail.id)" class="cancel" />
                    <!-- <input type="button" value="修改订单" @click="modify(listdetail.id)" class="cancel" /> -->
                    <input type="button" value="付款" class="payment"  @click="patmentOrder(listdetail.id)">
                </div>
                <div class="detailButton" v-if="listdetail.type === '2' ">
                    <input type="button" value="等待上门" class="cancel" />
                </div>
                <div class="detailButton" v-if="listdetail.type === '3' ">
                    <input type="button" value="等待服务" class="cancel" />
                </div>
                <div class="detailButton" v-if="listdetail.type === '4' ">
                    <input type="button" value="确认消费" class="payment"  @click="patmentOrder()" >
                </div>
                <div class="detailButton" v-if="listdetail.type === '5' ">
                    <input type="button" value="我要评价" class="payment" @click="evaluate(listdetail.id)" >
                </div>
                <div class="clear"></div>
            </div>

        </div>
    </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
    name: 'orderDetail',
    data() {
        return{
            imgLeft:'',
            listdetail:{},
            id: ''
        }
    },
    activated(){
        
        var id = this.$route.params.id
        this.id = id
        this.imgLeft = localStorage.getItem("temp")
        let token = localStorage.getItem("token")
        let orderUrl = '/order/orderDetail'
        let orderJson = {
            orderId: id,
        }
        this.$fetch(orderUrl,orderJson)
        .then((res)=>{
            this.listdetail = res.result
        })
        .catch((res)=>{
            
        })
        
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        cancel(id){
            Dialog.confirm({
            title: '取消订单',
            message: '取消订单后定金不退，是否确认'
            }).then(() => {
                let deleteOrderUrl = '/order/deleteOrder'
            let deleteOrder = {
                orderId: id,
            }
            this.$fetch(deleteOrderUrl,deleteOrder)
            .then((res)=>{
                this.$toast('删除成功')
                var param = this.$route.params.id
                location.reload()
            })
            .catch((res)=>{
                this.$toast('删除失败')
            })
            }).catch(() => {
            
            });
        },
        evaluate(id,shopId){
            this.$router.push('/evaluate/'+id+'/'+shopId)
        },
        patmentOrder(){
            var id = this.id
            this.$router.push('/Submission/'+ id)
        },
    }
}
</script>

<style scoped>
.commodityImg img{width: 100%;}
.commTxt{padding-left: 0.2rem;}
.commTxt .time{font-size: 0.68rem;text-align: left;color: #999999;float: left;}
.bottom{min-height: 30rem;background: #f6f6f6;padding-top: 0.5rem;}
.listDetail{background-color: #ffffff;padding:0 0.75rem;margin-bottom: 0.5rem;padding-bottom: 0.6rem;}
.commTxt .title{font-size: 0.7rem;text-align: left;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;float: left;}
.MaxTotal{font-size:0.7rem;float: right;}
.MaxTotal span{color: #f00;}
.total{float: right;font-size: 0.7rem;}
.num{font-size: 0.68rem;float: right;}
.orderList{margin-bottom: 0.5rem;border-bottom: 1px solid #e9e9e9;padding-bottom: 0.3rem;}
.orderDetailLists {font-weight: 400}
.orderDetailLists li{border-bottom: 1px dotted #ddd}
.orderDetailLists h3{float: left;font-size: 0.7rem;line-height: 30px;}
.orderDetailLists p{float: right;font-size: 0.7rem;line-height: 30px;}
.detailButton .payment{background: #ff949d;color: #ffffff;border:none;}
.detailButton{float: right;}
.detailButton input{width: 3.4rem;height: 1.25rem;border-radius: 30px;font-size: 0.68rem;color: #666666;}
.detailButton .cancel{border:1px solid #e9e9e9;background:#fff;}
.orderDetailFix{position: fixed;bottom: 0.3rem;right:1rem;width: 100%;left: 0;}
</style>