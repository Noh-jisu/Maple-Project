<template>
    <main style="overflow-x: hidden">
      <!-- s.GNB -->
      <section class="gnb-section">
        <ul class="global-navbar">
          <li>
            페이지 이름
          </li>
          <li class="search-info">
            <div class="input-box">
              <input type="text" placeholder="캐릭터명 또는 닉네임" v-model="searchKeyword" @keyup.enter="checkSearchType">
              <i class="search-icon"></i>
            </div>
          </li>
        </ul>
      </section>
      <!-- e.GNB -->
      <!-- s.character info -->
      <section class="character-info-section">
        <dl>
          <dt>
            <img :src="userInfo.character_image" alt="캐릭터이미지">
          </dt>
          <dd>
            <h2>{{ userInfo.character_name }} / {{ userInfo.world_name }}</h2>
            <ul>
              <li>Lv {{ userInfo.character_level }}</li>
              <li>{{ userInfo.character_class }}</li>
              <li>인기도 {{ userInfo.popularity }}</li>
            </ul>
            <p>전투력 1억 1883만 4329</p>
          </dd>
        </dl>
      </section>
      <!-- e.character info -->
      <!-- s.info-detatil -->
      <section class="info-detatil-section">
        <div class="detail-cont">
          <ul>
            <li :class="{'focus-tab': currentTab === 1}" @click=changeTab(1)>스탯</li>
            <li :class="{'focus-tab': currentTab === 2}" @click=changeTab(2)>장비</li>
            <li :class="{'focus-tab': currentTab === 3}" @click=changeTab(3)>스킬</li>
            <li :class="{'focus-tab': currentTab === 4}" @click=changeTab(4)>유니온</li>
            <li :class="{'focus-tab': currentTab === 5}" @click=changeTab(5)>캐시</li>
          </ul>
        </div>
      </section>
      <!-- e.info-detatil -->
    </main>
  </template>
  
  <script>
  import SearchParam from '@/resources/entity/SearchParam';
  
  export default {
    data: () => ({
      searchParam: {
        class: new SearchParam(),
        data: {},
      },
      nickName: '',
  
      // -------------------------
      searchKeyword: '',
      searchType: 'userInfo',
      userInfo: {},
      currentTab: 1,
    }),
    methods: {
      // 조회조건 구분
      checkSearchType: function () {
        if (this.searchType === 'userInfo') {
          this.searchInfo();
        }  else if (this.searchType === 'guildInfo') {
          // 임시
          console.log('길드 검색');
        }
      },
      // 캐릭터 식별자 조회
      searchInfo: function () {
        this.searchParam.class.character_name = this.searchKeyword;
        this.axios.get('/maplestory/v1/id', {
            params: { character_name: this.searchParam.class.character_name },
            headers: this.searchParam.class.getApiKey(),
          }).then((result) => {
            if (result.status === 200) {
              this.userBaseInfo(result.data.ocid);
            }
          }).catch((error) => {
            console.log(error);
          })
      },
      userBaseInfo: function ( val ) {
        this.searchParam.class.ocid = val;
        this.searchParam.class.date = '2024-04-08';
        this.axios.get('/maplestory/v1/character/basic', {
          params: this.searchParam.class.characterBaseInfoParam(),
          headers: this.searchParam.class.getApiKey(),
        })
        .then((result) => {
          this.userInfo = result.data;
          this.userPopularInfo();
        })
        .catch((error) => {
          console.log(error);
        });
      },
      userPopularInfo: function () {
        this.axios.get('/maplestory/v1/character/popularity', {
          params: this.searchParam.class.characterBaseInfoParam(),
          headers: this.searchParam.class.getApiKey(),
        })
        .then((result) => {
          this.userInfo.popularity = result.data.popularity;
        })
        .catch((error) => {
          console.log(error);
        });
      },
      changeTab: function (val = 1) {
        this.currentTab = val;
        console.log(val);
      },
    }
  }
  </script>
  