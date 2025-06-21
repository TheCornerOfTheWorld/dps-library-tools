<script lang="ts" setup>
import SearchInput from '@/components/SearchInput.vue';
import Tabs from '@/components/Tabs/index.vue';
import { useBookStore } from '@/stores/modules/book';

const keyword = ref<string>('');
const bookStore = useBookStore();
const { bookList, total } = toRefs(bookStore);

function toBookDetailPage(book: BooksModel) {
  uni.navigateTo({
    url: `/pages/index/book-detail?id=${book.id}`,
  });
}
function search() {
  bookStore.qryBookList(keyword.value);
}
</script>

<template>
  <view
    class="container h-full text-sm bg-gray-50 box-border"
  >
    <SearchInput v-model="keyword" class="m-3 bg-[#f1f1f1]" :focus="true" @confirm="search" />
    <view v-if="bookList.length > 0" class="my-2 mx-3 text-right text-ms text-gray-400">
      共{{ total }}本
    </view>
    <Tabs :tabs="[{ name: '全部', path: '/' }]" />
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
