export default class SearchParam {
    constructor(result) {
      const data = result || {};
  
      // api key
      this.apiKey = 'test_99c9ccd90bcabd0adda2a298ee3a34b554b161560510a7c43d80ffded1737b6ec992ce9ee48acd724627223fa2b6d1c5';
      // 캐릭터 이름
      this.character_name = data.character_name || '';
      // 캐릭터 식별자
      this.ocid = data.ocid || '';
      // 조회기준 날짜
      this.date = data.date || '';
      
    }
  
    getApiKey() {
      return {
        'x-nxopen-api-key': this.apiKey,
      }
    }
    characterIdentifierParam() {
      return {
        character_name: this.character_name,
      }
    }
    characterBaseInfoParam() {
      return {
        ocid: this.ocid,
        date: this.date,
      }
    }
  }