<template>
	<div class="footer">
		<!-- <van-tabbar v-model="active" :route='true' :fixed="true">
		  <van-tabbar-item icon="notes-o" to="/">预约</van-tabbar-item>
		  <van-tabbar-item icon="coupon" to="/list">祭品</van-tabbar-item>
		  <van-tabbar-item icon="friends-o" to="/login">我的</van-tabbar-item>
		</van-tabbar> -->
    <van-tabbar v-model="active" active-color="#fd424b" :route='true' :fixed="true">
      <van-tabbar-item  to="/">
        <span>预约</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.active : icon.normal"
        >
      </van-tabbar-item>
      <van-tabbar-item  to="/Rebate">
        <span>返利</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.activee : icon.normale"
        >
      </van-tabbar-item>
      <van-tabbar-item  to="/brand">
        <span>品牌</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.brand : icon.brand1"
        >
      </van-tabbar-item>
      <van-tabbar-item  to="/user">
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.user : icon.user1"
        >
      </van-tabbar-item>
    </van-tabbar>
	</div>
</template>

<script>
export default {
  name:  'footers',
  data() {
    return {
      active: 0,
      icon: {
        normal: require('../assets/home1.png'),
        active: require('../assets/home.png'),
        normale: require('../assets/Rebate1.png'),
        activee: require('../assets/Rebate.png'),
        brand: require('../assets/brand.png'),
        brand1: require('../assets/brand1.png'),
        user: require('../assets/user.png'),
        user1: require('../assets/user1.png'),
      }
    }
  },
  created() {
  },
  methods: {
	  
  }
}
</script>

<style scoped>
.van-tabbar{height: 70px;}
</style>
