<script setup lang="ts">
defineOptions({
  name: 'Tab',
});

const props = defineProps({
  tabs: {
    type: Array as PropType<Tab[]>,
    default: () => [],
  },
});

interface Tab {
  name: string
  path: string
}

const active = defineModel('count', { type: Number, default: 0 });
const { tabs } = toRefs(props);
function clickTab(index: number) {
  active.value = index;
}
</script>

<template>
  <view class="flex justify-around items-center overflow-x-auto">
    <view
      v-for="(item, index) in tabs"
      :key="index"
      class="min-w-[80px] flex flex-col items-center"
      @click="clickTab(index)"
    >
      <text class="">
        {{ item.name }}
      </text>
    </view>
  </view>
</template>
