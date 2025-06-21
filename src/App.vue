<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app';
import { useUserStore } from '@/stores/modules/user';

onLaunch(() => {
  console.log('App Launch');
});
onShow(() => {
  const userStore = useUserStore();
  userStore.initUserInfo();
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
</script>

<style>
html,
body,
uni-page-body,
#app {
  height: 100%;
}
</style>
