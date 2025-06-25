<script lang="ts" setup>
import SearchInput from '@/components/SearchInput.vue';
import { Tab, Tabs } from '@/components/Tabs/index';
import { useBookStore } from '@/stores/modules/book';

const keyword = ref<string>('');
const accuracy = ref<string>('title');
const lib = ref<string>('044005');
const bookStore = useBookStore();
const { bookList, total } = toRefs(bookStore);

function toBookDetailPage(book: BooksModel) {
  uni.navigateTo({
    url: `/pages/index/book-detail?id=${book.recordid}`,
  });
}
function search() {
  bookStore.qryBookList({ keyword: unref(keyword), accuracy: unref(accuracy), lib: unref(lib) });
}
const libList = [
  { value: 'all', text: '全部图书馆' },
  { value: '044005', text: '深圳图书馆' },
  { value: '044008', text: '福田区图书馆' },
  { value: 'F44010', text: '大学城图书馆' },
  { value: '044006', text: '南山区图书馆' },
  { value: '044007', text: '宝安区图书馆' },
  { value: '044009', text: '盐田区图书馆' },
  { value: '044010', text: '罗湖区图书馆' },
  { value: '044120', text: '龙岗区图书馆' },
  { value: '044132', text: '光明区图书馆' },
  { value: '044136', text: '坪山区图书馆' },
  { value: '044137', text: '龙华区图书馆' },
  { value: '044138', text: '大鹏新区图书馆' },
];
const accuracyList = [
  { value: 'all', text: '任意词' },
  { value: 'title', text: '书名' },
  { value: 'author', text: '作者' },
  { value: 'subject', text: '关键词' },
];

function clickTab() {
  console.log('clickTab');
}
</script>

<template>
  <view
    class="container h-full text-sm bg-gray-50 box-border"
  >
    <SearchInput v-model="keyword" class="m-3 bg-[#f1f1f1]" :focus="true" @confirm="search" />
    <Tabs>
      <Tab
        v-model:active="accuracy"
        :options="accuracyList"
        @change-tab="clickTab"
      />
      <Tab
        v-model:active="lib"
        :options="libList"
      />
    </Tabs>
    <view v-if="bookList.length > 0" class="my-2 mx-3 text-right text-ms text-gray-400">
      共{{ total }}本
    </view>
    <view class="" hover-class="none" hover-stop-propagation="false" />
    <view
      class="mt-2 px-2 grid grid-cols-3 gap-x-2 gap-y-2 justify-items-center items-start"
    >
      <view
        v-for="(item, index) in bookList"
        :key="index"
        class="flex flex-col items-center justify-center"
        @click="toBookDetailPage(item)"
      >
        <image class="w-24 h-32 rounded flex-none shadow-xl mb-1" :src="item.cover_path" alt="" srcset="" />
        <view class="text-center text-xs line-clamp-2">
          {{ item.title }}
        </view>
      </view>
    </view>
  </view>
</template>
