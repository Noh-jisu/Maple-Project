<template>
  <main>
    <!-- s.GNB -->
    <section class="gnb-section">
      <ul class="global-navbar">
        <li>
          페이지 이름
        </li>
        <li class="search-info">
          <div class="input-box">
            <input type="text" placeholder="캐릭터명 또는 닉네임" v-model="searchKeyword" @keyup.enter="checkSearchType">
          </div>
        </li>
      </ul>
    </section>
    <!-- e.GNB -->
    <!-- s.character info -->
    <section class="character-info-section">
      <dl>
        <dt>캐릭터 이미지</dt>
        <dd>
          <h2>짧은안꼬</h2>
          <ul>
            <li>Lv 282</li>
            <li>아델</li>
            <li>인기도 53</li>
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
          <li>스탯</li>
          <li>장비</li>
          <li>스킬</li>
          <li>유니온</li>
          <li>캐시</li>
        </ul>
      </div>
    </section>
    <!-- e.info-detatil -->
  </main>
</template>

<script>

export default {
  data: () => ({
    apiKey: 'test_99c9ccd90bcabd0adda2a298ee3a34b554b161560510a7c43d80ffded1737b6ec992ce9ee48acd724627223fa2b6d1c5',
    nickName: '',

    // -------------------------
    searchKeyword: '',
    searchType: 'userInfo',
    userInfo: {},
  }),
  methods: {
    // 조회조건 구분
    checkSearchType: function () {
      if (this.searchType === 'userInfo') {
        this.searchInfo();
      } else if (this.searchType === 'unionInfo') {
        // 임시
        console.log('유니온 검색');
      } else if (this.searchType === 'guildInfo') {
        // 임시
        console.log('길드 검색');
      }
    },
    searchInfo: function () {
      // 캐릭터 식별자 조회
      this.axios.get('/maplestory/v1/id', {
          params: { character_name: this.searchKeyword },
          headers: {
            'x-nxopen-api-key': this.apiKey,
          },
        }).then((result) => {
          if (result.status === 200) {
            this.userBaseInfo(result.data.ocid);
          }
        }).catch((error) => {
          console.log(error);
        })

      // this.axios.get('/maplestory/v1/id', {character_name: this.nickName}, {headers})
      // .then((result) => {
      //   console.log(result);
      // }).catch((error) => {
      //   console.log(error);
      // })
    },
    userBaseInfo: function ( val ) {
      this.axios.get('/maplestory/v1/character/basic', {
        params: {
          ocid: val,
          date: '2024-04-01',
        },
        headers: {
          'x-nxopen-api-key': this.apiKey,
        },
      })
      .then((result) => {
        console.log(result);
        this.userInfo = result.data;
      })
      . catch((error) => {
        console.log(error);
      });
    },
  }
}
</script>
