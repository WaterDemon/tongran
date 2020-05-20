<template>
    <div class="order">
        <van-nav-bar title="我的订单" left-arrow>
            <van-icon name="arrow-left" slot="left" size="20" @click="onClickLeft" color="#999999" />
        </van-nav-bar>
        <div class="navList" v-if="empty">
            <van-row>
                <van-col span="4" class="tablist" v-for="(navlist, index) in datalist" v-bind:class="{active:index == activeIndex}" :key="index"><p @click="tabClick(index)">{{navlist.title}}</p></van-col>
            </van-row>
        </div>
        <div class="bottom" v-if="activeIndex == '0'">
            <div class="listDetail" v-for="(listdetail, index) in list" :key="listdetail.list">
                <van-row class="orderListTop">
                    <van-col span="12">
                        <p class="orderTime">{{listdetail.initTime}}</p>
                    </van-col>
                    <van-col span="12" v-if="listdetail.type === '1' ">
                        <p class="orderType">待付款</p>
                    </van-col>
                    <van-col span="12" v-if="listdetail.type === '2' ">
                        <p class="orderType">待消费</p>
                    </van-col>
                    <van-col span="12" v-if="listdetail.type === '3' ">
                        <p class="orderType">预约中</p>
                    </van-col>
                    <van-col span="12" v-if="listdetail.type === '4' ">
                        <p class="orderType">已消费</p>
                    </van-col>
                    <van-col span="12" v-if="listdetail.type === '5' ">
                        <p class="orderType">待评价</p>
                    </van-col>
                    <van-col span="12" v-if="listdetail.type === '6' ">
                        <p class="orderType">已完成</p>
                    </van-col>
                </van-row>
                <van-row class="orderList" @click="orderDetailLink(listdetail.id)">
                    <van-col span="5">
                        <div class="commodityImg">
                            <img :src="imgLeft+listdetail.shopImg" alt="">
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
                            <p class="MaxTotal">需付款:
                                <span v-if="listdetail.type === '4' ">￥{{listdetail.orderTailPrice}}</span>
                                <span v-else-if="listdetail.type === '1' ">￥{{listdetail.orderEarnestPrice}}</span>
                                <span v-else>{{listdetail.orderAmount}}</span>
                            </p>
                            <div class="clear"></div>
                        </div>
                    </van-col>
                </van-row>
                <div class="detailButton" v-if="listdetail.type === '1' ">
                    <input type="button" value="取消订单" @click="cancel(listdetail.id)" class="cancel" />
                    <!-- <input type="button" value="修改订单" @click="modify(listdetail.id)" class="cancel" /> -->
                    <input type="button" value="付款" class="payment"  @click="patmentOrder(listdetail.id)">
                </div>
                <div class="detailButton" v-if="listdetail.type === '2' ">
                    <input type="button" value="订单分配" class="cancel" />
                </div>
                <div class="detailButton" v-if="listdetail.type === '3' ">
                    <input type="button" value="联系人" class="cancel" @click="contact(listdetail)" />
                    <input type="button" value="等待服务" class="cancel" />
                </div>
                <div class="detailButton" v-if="listdetail.type === '4' ">
                    <input type="button" value="确认消费" class="payment"  @click="patmentOrder(listdetail.id)" >
                </div>
                <div class="detailButton" v-if="listdetail.type === '5' ">
                    <input type="button" value="我要评价" class="payment" @click="evaluate(listdetail.id)" >
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="bottom" v-if="activeIndex == '1'">
            <div class="listDetail" v-for="(listdetail, index) in list" :key="listdetail.list" v-if="listdetail.type === '1' ">
                <van-row class="orderListTop">
                    <van-col span="12">
                        <p class="orderTime">{{listdetail.initTime}}</p>
                    </van-col>
                    <van-col span="12">
                        <p class="orderType">待付款</p>
                    </van-col>
                </van-row>
                <van-row class="orderList" @click="orderDetailLink(listdetail.id)">
                    <van-col span="5">
                        <div class="commodityImg">
                            <img :src="imgLeft+listdetail.shopImg" alt="">
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
                            <p class="MaxTotal">需付款:
                                <span v-if="listdetail.type === '4' ">￥{{listdetail.orderTailPrice}}</span>
                                <span v-else-if="listdetail.type === '1' ">￥{{listdetail.orderEarnestPrice}}</span>
                                <span v-else-if="listdetail.type === '2' ">￥{{listdetail.orderTailPrice}}</span>
                                <span v-else>{{listdetail.orderAmount}}</span>
                            </p>
                            <div class="clear"></div>
                        </div>
                    </van-col>
                </van-row>
                <div class="detailButton" v-if="listdetail.type === '1' ">
                    <input type="button" value="取消订单" @click="cancel(listdetail.id)" class="cancel" />
                    <!-- <input type="button" value="修改订单" @click="modify(listdetail.id)" class="cancel" /> -->
                    <input type="button" value="付款" class="payment"  @click="patmentOrder(listdetail.id)">
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="bottom" v-if="activeIndex == '2'">
            <div class="listDetail" v-for="(listdetail, index) in list" :key="listdetail.list" v-if="listdetail.type === '2' ">
                <van-row class="orderListTop">
                    <van-col span="12">
                        <p class="orderTime">{{listdetail.initTime}}</p>
                    </van-col>
                    <van-col span="12">
                        <p class="orderType">待消费</p>
                    </van-col>
                </van-row>
                <van-row class="orderList" @click="orderDetailLink(listdetail.id)">
                    <van-col span="5">
                        <div class="commodityImg">
                            <img :src="imgLeft+listdetail.shopImg" alt="">
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
                            <p class="MaxTotal">需付款:
                                <span v-if="listdetail.type === '4' ">￥{{listdetail.orderTailPrice}}</span>
                                <span v-else-if="listdetail.type === '1' ">￥{{listdetail.orderEarnestPrice}}</span>
                                <span v-else-if="listdetail.type === '2' ">￥{{listdetail.orderTailPrice}}</span>
                                <span v-else>{{listdetail.orderAmount}}</span>
                            </p>
                            <div class="clear"></div>
                        </div>
                    </van-col>
                </van-row>
                <div class="detailButton" v-if="listdetail.type === '2' ">
                    <input type="button" value="订单分配" class="cancel" />
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="bottom" v-if="activeIndex == '3'">
            <div class="listDetail" v-for="(listdetail, index) in list" :key="listdetail.list" v-if="listdetail.type === '3' ">
                <van-row class="orderListTop">
                    <van-col span="12">
                        <p class="orderTime">{{listdetail.initTime}}</p>
                    </van-col>
                    <van-col span="12">
                        <p class="orderType">预约中</p>
                    </van-col>
                </van-row>
                <van-row class="orderList" @click="orderDetailLink(listdetail.id)">
                    <van-col span="5">
                        <div class="commodityImg">
                            <img :src="imgLeft+listdetail.shopImg" alt="">
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
                            <p class="MaxTotal">需付款:
                                <span v-if="listdetail.type === '4' ">￥{{listdetail.orderTailPrice}}</span>
                                <span v-else-if="listdetail.type === '1' ">￥{{listdetail.orderEarnestPrice}}</span>
                                <span v-else-if="listdetail.type === '2' ">￥{{listdetail.orderTailPrice}}</span>
                                <span v-else>{{listdetail.orderAmount}}</span>
                            </p>
                            <div class="clear"></div>
                        </div>
                    </van-col>
                </van-row>
                <div class="detailButton" v-if="listdetail.type === '3' ">
                    <input type="button" value="联系人" class="cancel" @click="contact(listdetail)" />
                    <input type="button" value="等待服务" class="cancel" />
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="bottom" v-if="activeIndex == '4'">
            <div class="listDetail" v-for="(listdetail, index) in list" :key="listdetail.list" v-if="listdetail.type === '4' ">
                <van-row class="orderListTop">
                    <van-col span="12">
                        <p class="orderTime">{{listdetail.initTime}}</p>
                    </van-col>
                    <van-col span="12">
                        <p class="orderType">已消费</p>
                    </van-col>
                </van-row>
                <van-row class="orderList" @click="orderDetailLink(listdetail.id)">
                    <van-col span="5">
                        <div class="commodityImg">
                            <img :src="imgLeft+listdetail.shopImg" alt="">
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
                            <p class="MaxTotal">需付款:
                                <span v-if="listdetail.type === '4' ">￥{{listdetail.orderTailPrice}}</span>
                                <span v-else-if="listdetail.type === '1' ">￥{{listdetail.orderEarnestPrice}}</span>
                                <span v-else>{{listdetail.orderAmount}}</span>
                            </p>
                            <div class="clear"></div>
                        </div>
                    </van-col>
                </van-row>
                <div class="detailButton" v-if="listdetail.type === '4' ">
                    <input type="button" value="确认消费" class="payment"  @click="patmentOrder(listdetail.id)" >
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="bottom" v-if="activeIndex == '5'">
            <div class="listDetail" v-for="(listdetail, index) in list" :key="listdetail.list" v-if="listdetail.type === '5' ">
                <van-row class="orderListTop">
                    <van-col span="12">
                        <p class="orderTime">{{listdetail.initTime}}</p>
                    </van-col>
                    <van-col span="12">
                        <p class="orderType">待评价</p>
                    </van-col>
                </van-row>
                <van-row class="orderList" @click="orderDetailLink(listdetail.id)">
                    <van-col span="5">
                        <div class="commodityImg">
                            <img :src="imgLeft+listdetail.shopImg" alt="">
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
                            <p class="MaxTotal">需付款:
                                <span v-if="listdetail.type === '4' ">￥{{listdetail.orderTailPrice}}</span>
                                <span v-else-if="listdetail.type === '1' ">￥{{listdetail.orderEarnestPrice}}</span>
                                <span v-else>{{listdetail.orderAmount}}</span>
                            </p>
                            <div class="clear"></div>
                        </div>
                    </van-col>
                </van-row>
                <div class="detailButton" v-if="listdetail.type === '5' ">
                    <input type="button" value="我要评价" class="payment" @click="evaluate(listdetail.id,listdetail.shopId)" >
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <van-popup v-model="show" round>
            <div class="modelContact">
                <van-row gutter="20" style="padding-left:1rem;">
                    <van-col span="24">
                        <h4>{{name}}</h4>
                        <p>微信：{{wechat}}</p>
                        <p>联系电话：{{phones}}</p>
                    </van-col>
                </van-row>
                <br>
                <van-row gutter="10">
                    <van-col span="12">
                        <van-button type="default" round size="small" @click="show=false">取消</van-button>
                    </van-col>
                    <van-col span="12">
                        <a :href="'tel:'+this.phones"><van-button type="default" round size="small" color="#ff6473">拨打电话</van-button></a>
                    </van-col>
                </van-row>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { Dialog } from 'vant';
export default {
    name: 'order',
    data (){
        return{
            imgLeft: '',
            datalist: [
                {title:'全部',link: '0'},
                {title:'待付款',link: '1'},
                {title:'待消费',link: '2'},
                {title:'预约中',link: '3'},
                {title:'已消费',link: '4'},
                {title:'待评价',link: '5'}
            ],
            empty: true,
            activeIndex: 0,
            show: false,
            list:[
                
            ],
            headImg:'',
            name: '',
            wechat: '',
            phones: '',
        }
    },
    activated(){
        var param = this.$route.params.id
        this.params = param
        this.activeIndex = this.params

        this.imgLeft = localStorage.getItem("temp")
        let token = localStorage.getItem("token")
        let orderUrl = '/order/order_'
        let orderJson = {
            userToken: token,
        }
        this.$fetch(orderUrl,orderJson)
        .then((res)=>{
            if(res.result.length == 0){
                this.$toast('暂无订单')
            }else{
                this.list = res.result
            }
            
        })
        .catch((res)=>{
            this.$toast('订单拉取失败')
        })
    },
    methods:{
        onClickLeft(){
            this.$router.push('/user')
        },
        tabClick(index){
            this.activeIndex = index
        },
        orders(){
            this.$router.push('/list')
        },
        evaluate(id,shopId){
            this.$router.push('/evaluate/'+id+'/'+shopId)
        },
        contact(listdetail){
            this.show = true;
            this.name = listdetail.orderContactName
            this.wechat = listdetail.orderContactWechatNum
            this.phones = listdetail.orderContactPhone
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
        patmentOrder(id){
            this.$router.push('/Submission/'+ id)
        },
        orderDetailLink(id){
            this.$router.push('/orderDetail/'+ id)
        }
    }
}
</script>

<style scoped>
.navList{padding: 0 0.75rem;background-color: #ffffff;text-align: center;}
.tablist p{display: inline-block;line-height: 1.75rem;font-size: 0.65rem;}
.active p{border-bottom:2px solid #ff6473;color: #ff6473;}
.orderTime{font-size: 0.65rem;}
.orderType{font-size: 0.65rem;color: #666666;text-align: right;}
.orderListTop{line-height: 2rem;border-bottom: 1px solid #f1f1f1;margin-bottom: 0.5rem;}
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
.detailButton .payment{background: #ff949d;color: #ffffff;border:none;}
.detailButton{float: right;}
.detailButton input{width: 3.4rem;height: 1.25rem;border-radius: 30px;font-size: 0.68rem;color: #666666;}
.detailButton .cancel{border:1px solid #e9e9e9;background:#fff;}
.modelContact{background: #fff;border-radius: 10px;padding: 1.5rem;width: 10rem;}
.modelContact img{width: 2.5rem;height: 2.5rem;border-radius: 50%;overflow: hidden;}
.modelContact h4{font-size: 0.7rem;color: #333333;}
.modelContact p{font-size: 0.65rem;color: #666666;}
.modelContact button{margin:  0 auto;display: block;}
</style>
