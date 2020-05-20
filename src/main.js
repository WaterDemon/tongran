import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import '../static/css/max.css'
import '../static/js/index'
import Mui from 'vue-awesome-mui'

import VueResource from 'vue-resource'
import {post,fetch,patch,put} from './js/http'
import wx from 'weixin-js-sdk'
Vue.prototype.HOST = '/api';
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)

import {
  Sidebar, SidebarItem,PullRefresh,
  NavBar,
  Icon,
  Swipe, SwipeItem,
  Lazyload,
  Row,
  Col,
  Tabbar,
  TabbarItem,
  Search,
  Tab, Tabs,
  Field,
  Cell, CellGroup,
  DropdownMenu, DropdownItem,
  Button,
  Toast,
  NumberKeyboard,
  RadioGroup, Radio,

  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  ActionSheet,
  Checkbox, CheckboxGroup,
  Collapse, CollapseItem,
  Popup,
  DatetimePicker,
  Uploader,
  NoticeBar,
  Rate,
  Area,
  Picker,
  Dialog,
  CountDown,
  ImagePreview,
  SwipeCell
} from 'vant'

Vue.use(RadioGroup)
Vue.use(SwipeCell)
Vue.use(Radio)
Vue.use(NumberKeyboard)
Vue.use(Toast)
Vue.use(Button)
Vue.use(DropdownMenu).use(DropdownItem)
Vue.use(Lazyload)
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Swipe).use(SwipeItem)
Vue.use(Row).use(Col)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(Search)
Vue.use(Tab).use(Tabs)
Vue.use(Field)
Vue.use(Cell).use(CellGroup)
Vue
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
Vue.use(ActionSheet)
Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(Collapse).use(CollapseItem)
Vue.config.productionTip = false
Vue.use(Popup)
Vue.use(DatetimePicker)
Vue.use(Uploader)
Vue.use(NoticeBar)
Vue.use(Rate)
Vue.use(Area)
Vue.use(Picker)
Vue.use(Dialog)
Vue.use(CountDown)
Vue.use(ImagePreview)
Vue.use(VueResource)
Vue.use(wx)
Vue.use(Sidebar).use(SidebarItem)
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Mui)
Vue.use(PullRefresh)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

localStorage.setItem("temp",'http://111.229.51.194:80')
router.beforeEach(function(to, from, next) {
  if (to.meta.needLogin) {
    //页面是否登录
    if (localStorage.getItem("token")) {
      //本地存储中是否有token(uid)数据
      next(); //表示已经登录
    } else {
      //next可以传递一个路由对象作为参数 表示需要跳转到的页面
      next({
        name: "login"
      });
    }
  } else {
    //表示不需要登录
    next(); //继续往后走
  }
})

function plusReady() {
  checkUpdate()
      // 设置一个全局plusready状态
  store.state.isplusReady = true
  store.state.storageEngine = plus.storage
  plus.screen.lockOrientation('portrait')
  plus.navigator.setFullscreen(false)
// 设置一个全局plusready状态
store.state.isplusReady = true
store.state.storageEngine = plus.storage
// 监听返回按键
let now = false
let time = null
plus.key.addEventListener('backbutton',function() {
  // 如果是首页则执行退出操作
  if (
      router.currentRoute.path === '/home' ||
      router.currentRoute.path === '/my-center'
  ) {
      time = null
      if (now) {
          now = false
          plus.runtime.quit()
      } else {
          now = true
          plus.nativeUI.toast('再按一次退出',{ duration: 'short' })
          time = setTimeout(() => {
              now = false
          },1000)
      }
      // 如果是内页则执行路由返回操作
  } else {
      router.go(-1)
  }
})
if (process.env.NODE_ENV === 'production') {
  //初始化数据库 就是当登录的时候拉取缓存在本地的信息
  db.syncDb2Memory()
      //初始化登录信息
  initUserInfo()
  let app = new Vue({
      router,store,created() {
          wsStart()
      },render: h => h(App)
  }).$mount('#app')
}
}
