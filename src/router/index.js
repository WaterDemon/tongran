import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import register from '@/components/register'
import home from '@/page/home'
import rebate from '@/page/rebate'
import brand from '@/page/brand'
import user from '@/page/user'
import commodity from '@/page/commodity'
import CommodityDetails from '@/page/CommodityDetails'
import brandDetail from '@/page/brandDetail'
import wallet from '@/page/wallet'
import order from '@/page/order'
import search from '@/page/search'
import evaluate from '@/page/evaluate'
import result from '@/page/result'
import footprint from '@/page/footprint'
import notice from '@/page/notice'
import noticeDetail from '@/page/noticeDetail'
import payment from '@/page/payment'
import data from '@/page/data'
import Nickname from '@/page/Nickname'
import NickHead from '@/page/NickHead'
import Detailed from '@/page/Detailed'
import Collection from '@/page/Collection'
import evaluateList from '@/page/evaluateList'
import Card from '@/page/Card'
import Submission from '@/page/Submission'
import success from '@/page/success'
import Bill from '@/page/Bill'
import modify from '@/page/modify'
import Commevaluate from '@/page/Commevaluate'
import forget from '@/page/forget'
import drawing from '@/page/drawing'
import tixianDetail from '@/page/tixianDetail'
import orderDetail from '@/page/orderDetail'
import navlist from '@/page/navlist'
import second from '@/page/second'
import brandSearch from '@/page/brandSearch'
import sex from '@/page/sex'
import indexs from '@/page/indexs'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'indexs',
      component: indexs,
      children: [
        {
          path: '/',
          name: 'home',
          component: home,
          meta: {
            keepAlive: true,
            keepAlive: true
          }
        },
        {
          path: '/brand',
          name: 'brand',
          component: brand,
          meta: {
            needLogin: true,
            keepAlive: true
          },
        },
        {
          path: '/user',
          name: 'user',
          component: user,
          meta: {
            needLogin: true,
            keepAlive: true
          },
        },
        {
          path: '/rebate',
          name: 'rebate',
          component: rebate,
          meta: {
            needLogin: true,
            keepAlive: true
          },
        },
        {
          path: '/commodity/:id/:res',
          name: 'commodity',
          component: commodity,
          meta: {
            needLogin: true,
            keepAlive: true
          },
        },
        {
          path: '/CommodityDetails/:id',
          name: 'CommodityDetails',
          component: CommodityDetails,
          meta: {
            needLogin: true,
            keepAlive: true
          },
        },
        {
          path: '/brandDetail/:id',
          name: 'brandDetail',
          component: brandDetail,
          meta: {
            needLogin: true,
            keepAlive: true
          },
        },
        {
          path: '/wallet',
          name: 'wallet',
          component: wallet,
          meta: {
            needLogin: true,
            keepAlive: true
          },
        },
        {
          path: '/order/:id',
          name: 'order',
          component: order,
          meta: {
            needLogin: true,
            keepAlive: true
          },
        },
        {
          path: '/search',
          name: 'search',
          component: search,
          meta: {
            needLogin: true,
            keepAlive: true
          },
        },
        {
          path: '/evaluate/:id/:shopId',
          name: 'evaluate',
          component: evaluate,
          meta: {
            needLogin: true,
            keepAlive: true
          },
        },
        {
          path: '/result/:id',
          name: 'result',
          component: result,
          meta: {
            needLogin: true,
            keepAlive: true
          },
        },
        {
          path: '/footprint',
          name: 'footprint',
          component: footprint,
          meta: {
            needLogin: true,
            keepAlive: true
          },
        },
        {
          path: '/notice',
          name: 'notice',
          component: notice,
          meta: {
            needLogin: true,
            keepAlive: true
          },
        },
        {
          path: '/noticeDetail/:id',
          name: 'noticeDetail',
          component: noticeDetail,
          meta: {
            needLogin: true,
            keepAlive: true 
          },
        },
        {
          path: '/payment/:id',
          name: 'payment',
          component: payment,
          meta: {
            needLogin: true,
            keepAlive: true
          },
        },
        {
          path: '/data',
          name: 'data',
          component: data,
          meta: {
            needLogin: true,
            keepAlive: true 
          },
        },
        {
          path: '/Nickname',
          name: 'Nickname',
          component: Nickname,
          meta: {
            needLogin: true,
            keepAlive: true
          },
        },
        {
          path: '/NickHead',
          name: 'NickHead',
          component: NickHead,
          meta: {
            needLogin: true,
            keepAlive: true 
          },
        },
        {
          path: '/Detailed',
          name: 'Detailed',
          component: Detailed,
          meta: {
            needLogin: true,
            keepAlive: true 
          },
        },
        {
          path: '/Collection',
          name: 'Collection',
          component: Collection,
          meta: {
            needLogin: true,
            keepAlive: true 
          },
        },
        {
          path: '/evaluateList',
          name: 'evaluateList',
          component: evaluateList,
          meta: {
            needLogin: true,
            keepAlive: true 
          },
        },
        {
          path: '/Card',
          name: 'Card',
          component: Card,
          meta: {
            needLogin: true,
            keepAlive: true 
          },
        },
        {
          path: '/Submission/:id',
          name: 'Submission',
          component: Submission,
          meta: {
            needLogin: true,
            keepAlive: true
          },
        },
        {
          path: '/success',
          name: 'success',
          component: success,
          meta: {
            needLogin: true,
            keepAlive: true 
          },
        },
        {
          path: '/Bill',
          name: 'Bill',
          component: Bill,
          meta: {
            needLogin: true,
            keepAlive: true 
          },
        },
        {
          path: '/modify',
          name: 'modify',
          component: modify,
          meta: {
            needLogin: true,
            keepAlive: true 
          },
        },
        {
          path: '/Commevaluate/:id',
          name: 'Commevaluate',
          component: Commevaluate,
          meta: {
            needLogin: true,
            keepAlive: true 
          },
        },
        {
          path: '/drawing',
          name: 'drawing',
          component: drawing,
          meta: {
            needLogin: true,
            keepAlive: true
          }
        },
        {
          path: '/tixianDetail',
          name: 'tixianDetail',
          component: tixianDetail,
          meta:{
            needLogin: true,
            keepAlive: true
          }
        },
        {
          path: '/orderDetail/:id',
          name: 'orderDetail',
          component: orderDetail,
          meta:{
            needLogin: true,
            keepAlive: true
          }
        },
        {
          path: '/navlist',
          name: 'navlist',
          component: navlist,
          meta:{
            needLogin: true,
            keepAlive: true
          }
        },
        {
          path: '/second/:id',
          name: 'second',
          component: second,
          meta:{
            needLogin:true,
            keepAlive: true
          }
        },
        {
          path: '/brandSearch/:id',
          name: 'brandSearch',
          component: brandSearch,
          meta: {
            needLogin: true,
            keepAlive: true
          }
        },
        {
          path: '/sex',
          name: 'sex',
          component: sex,
          meta: {
            needLogin: true,
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/forget',
      name: 'forget',
      component: forget
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    
  ]
})
