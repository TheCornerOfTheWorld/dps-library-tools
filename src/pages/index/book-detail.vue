<script lang="ts" setup>
import { useBookStore } from '@/stores/modules/book';

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
});
const bookStore = useBookStore();
const { book } = toRefs(bookStore);

const current = ref(0);
bookStore.getBook(props.id);
</script>

<template>
  <view class="book-detail-block">
    <view class="book-detail-img-wrapper">
      <image class="book-detail-img" :src="book?.img" alt="" />
    </view>
    <view class="book-title text-center h-max-18">
      {{ book?.title }}
    </view>
    <view class="book-detail-info">
      <view>
        <text class="text-color-818181 w-16 inline-block text-right">
          作者：
        </text>{{ book?.author }}
      </view>
      <view>
        <text class="text-color-818181 w-16 inline-block text-right">
          出版社：
        </text>{{ book?.publish }}
      </view>
      <view>
        <text class="text-color-818181 w-16 inline-block text-right">
          页数：
        </text>{{ book?.page }}
      </view>
      <view>
        <text class="text-color-818181 w-16 inline-block text-right">
          丛书名：
        </text>
        {{ book?.series }}
      </view>
      <view>
        <text class="text-color-818181 w-16 inline-block text-right">
          关键词：
        </text>
        {{ book?.subject }}
      </view>
    </view>
  </view>

  <view class="content">
    <view v-show="current === 0">
      选项卡1的内容
    </view>
    <view v-show="current === 1">
      选项卡2的内容
    </view>
    <view v-show="current === 2">
      选项卡3的内容
    </view>
  </view>
  <!-- <van-tabs :active="curLib" @click="onChange">
    <van-tab
      wx:for="{{book?.CanLoanBook}}"
      title="{{item.serviceaddrnotes}}"
      wx:key="index"
      name="{{item.serviceaddr}}"
    >
      <view
        wx:for="{{item.recordList}}"
        wx:for-item="record"
        wx:key="assetno"
        class="loan-book-wrapper"
      >
        <view class="w-50vw">
          <view class="mb-2">
            {{ record.local }}
          </view>
          <view wx:if="{{record.shelfnoDesc}}" class="text-color-818181">
            {{ record.shelfnoDesc }}
          </view>
        </view>
        <view>
          <view class="text-color-ee0a24 text-18 mb-2">
            {{ record.callno }}
          </view>
          <view class="text-right text-color-818181">
            {{ record.status }}
          </view>
        </view>
      </view>
    </van-tab>
    <view class="text-center text-color-818181 text-14 mt-8 mb-2">
      没有啦~
    </view>
  </van-tabs> -->
</template>

<style scoped>
.book-detail-img {
  @apply w-16 h-32;
}
</style>
