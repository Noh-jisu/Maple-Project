<template>
  <main class="main-page-layer">
    <div class="main-left-background">
      메이플 관련 이미지 배경
      <ul class="main-search-layer">
        <li class="main-datepicker">
          날짜 캘린더
        </li>
        <li class="main-search-input">
          <input type="text" @keyup.enter="moveDetail">
          <i class="search-icon" @click="moveDetail"></i>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>

export default {
  data: () => ({
  }),
  methods: {
    moveDetail: function () {
      console.log('라우터 이동');
    },
  }
}
</script>
