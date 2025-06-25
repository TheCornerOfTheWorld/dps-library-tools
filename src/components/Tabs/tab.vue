<script lang="ts" setup>
interface TabOption {
  value: string
  text: string
}

const props = defineProps<{
  options: TabOption[]
}>();

const emit = defineEmits<{
  (e: 'changeTab', value: TabOption): void
}>();

const model = defineModel<string>('active', { required: true });

const isOpen = ref(false);
const selectedTab = computed(() => props.options.find(item => item.value === model.value));
function changeTab(option: TabOption) {
  if (model.value !== option.value) {
    isOpen.value = false;
    model.value = option.value;
    emit('changeTab', option);
  }
}
defineExpose({ isOpen });
</script>

<template>
  <view class="tabs inline-flex border-b border-gray-200">
    <view class="h-9 w-24 leading-9 text-center" @click="isOpen = !isOpen">
      {{ selectedTab?.text }}
    </view>
    <view v-show="isOpen" class="absolute top-9 left-0 w-screen ">
      <view
        v-for="(option, index) in options"
        :key="index"
        class="tab-item px-4 py-2 text-center cursor-pointer"
        :class="{ active: active === option.value }"
        @click="changeTab(option)"
      >
        {{ option.text }}
      </view>
    </view>
  </view>
</template>

<style scoped>
.tab-item {
  @apply text-sm text-gray-600 transition-colors duration-200;
}
.tab-item + .tab-item {
  @apply border-b border-solid border-gray-200;
}
.tab-item.active {
  @apply text-blue-500 border-b-2 border-blue-500 font-medium;
}
</style>
