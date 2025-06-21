<script setup lang="ts">
defineOptions({
  name: 'SearchInput',
});

// const props = defineProps<{
//   focus?: boolean
// }>()

const emits = defineEmits(['confirm']);
const keyword = defineModel<string>();
function handleSearch() {
  emits('confirm', keyword.value);
}
</script>

<template>
  <view class="search flex items-center rounded-2xl">
    <image
      class="ml-2 p-1 w-6 h-6"
      src="/static/images/search-icon.svg"
      alt="搜索"
      srcset=""
    />
    <input
      v-model="keyword"
      type="search"
      class="h-8 flex-1"
      placeholder="请输入关键字"
      name="查询"
      @input="handleSearch"
    >
  </view>
</template>
