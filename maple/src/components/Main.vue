<template>
  <main>
    <!-- s.GNB -->
    <section>
      <ul class="global-navbar">
        <li>
          <ul class="all-menu">
            <!-- 랭킹은 캐릭터정보에 통합 -->
            <li>
              <button>캐릭터 정보</button>
            </li>
            <li>
              <button>유니온 정보</button>
            </li>
            <li>
              <button>길드 정보</button>
            </li>
            <li>
              <button>확률 정보</button>
            </li>
          </ul>
        </li>
        <li class="search-info">
          <select v-model="searchType">
            <option value="userInfo">캐릭터 정보</option>
            <option value="unionInfo">유니온 정보</option>
            <option value="guildInfo">길드 정보</option>
          </select>
          <input type="text" :placeholder="selectSearchType" v-model="searchKeyword" @keyup.enter="checkSearchType">
          <button @click="checkSearchType">검색</button>
        </li>
      </ul>
    </section>
    <!-- e.GNB -->
    <!-- s.content -->
    <section class="content-section">
      <!-- <p>{{ this.userInfo }}</p> -->
      <dl>
        <dt>캐릭터 명</dt>
        <dd>{{this.userInfo.character_name}}</dd>
      </dl>
    </section>
    <!-- e.content -->
    <!-- <input class="input-test" type="text" v-model="nickName" @keyup.enter="searchInfo">
    <button @click="searchInfo">search</button> -->
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
  computed: {
    selectSearchType: function () {
      let placeholderType = '';
      switch (this.searchType) {
        case 'userInfo' : 
          placeholderType = '캐릭터 닉네임을 입력해주세요.';
          break;
        case 'unionInfo':
          placeholderType = '유니온을 조회할 캐릭터의 닉네임을 입력해주세요.';
          break;
        case 'guildInfo':
          placeholderType = '길드명을 입력해주세요.';
          break;
      }
      return placeholderType;
    },
  },
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
