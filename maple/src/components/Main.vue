<template>
  <main>
    <div class="test">
      <input class="input-test" type="text" v-model="nickName" @keyup.enter="searchInfo">
      <button @click="searchInfo">search</button>
    </div>
  </main>
</template>

<script>

export default {
  data: () => ({
    apiKey: 'test_99c9ccd90bcabd0adda2a298ee3a34b554b161560510a7c43d80ffded1737b6ec992ce9ee48acd724627223fa2b6d1c5',
    nickName: '',
  }),
  methods: {
    searchInfo: function () {
      this.axios.get('/maplestory/v1/id', {
          params: { character_name: this.nickName },
          headers: {
            'x-nxopen-api-key': this.apiKey,
          },
        }).then((result) => {
          if (result.status === 200) {
            // axios 기본설정 방법 찾기
            this.axios.get('/maplestory/v1/character/basic', {
              params: {
                ocid: result.data.ocid,
                date: '2024-04-01',
              },
              headers: {
                'x-nxopen-api-key': this.apiKey,
              },
            })
            .then((result) => {
              console.log(result);
            })
            . catch((error) => {
              console.log(error);
            })
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
  }
}
</script>
