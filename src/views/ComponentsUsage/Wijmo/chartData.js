// list of country GDP
// https://en.wikipedia.org/wiki/List_of_IMF_ranked_countries_by_GDP
import dayjs from 'dayjs'

export default {
  bar: [
    { country: 'United States', '2014': 17348075, '2015': 18036650, '2016': 18624450 },
    { country: 'China', '2014': 10356508, '2015': 11181556, '2016': 11232110 },
    { country: 'Japan', '2014': 4602367, '2015': 4124211, '2016': 4936540 },
    { country: 'Germany', '2014': 3874437, '2015': 3365293, '2016': 3479230 },
    { country: 'United Kingdom', '2014': 2950039, '2015': 2858482, '2016': 2629190 },
    { country: 'France', '2014': 2833687, '2015': 2420163, '2016': 2466470 },
    { country: 'India', '2014': 2051228, '2015': 2073002, '2016': 2263790 },
    { country: 'Italy', '2014': 2147744, '2015': 1815759, '2016': 1850740 }
  ],
  gdp: [
    { id: 1, country: 'Luxembourg', gdpm: 57825, popk: 563, gdpcap: 102708 },
    { id: 2, country: 'Switzerland', gdpm: 664005, popk: 8238, gdpcap: 80602 },
    { id: 3, country: 'Norway', gdpm: 388315, popk: 5205, gdpcap: 74604 },
    { id: 4, country: 'Macao', gdpm: 46178, popk: 647, gdpcap: 71372 },
    { id: 5, country: 'Qatar', gdpm: 166908, popk: 2421, gdpcap: 68941 },
    { id: 6, country: 'Ireland', gdpm: 283716, popk: 4635, gdpcap: 61211 },
    { id: 7, country: 'United States', gdpm: 18036650, popk: 321601, gdpcap: 56083 },
    { id: 8, country: 'Singapore', gdpm: 292734, popk: 5535, gdpcap: 52887 },
    { id: 9, country: 'Denmark', gdpm: 295091, popk: 5660, gdpcap: 52136 },
    { id: 10, country: 'Australia', gdpm: 1225286, popk: 23940, gdpcap: 51181 },
    { id: 11, country: 'Iceland', gdpm: 16718, popk: 333, gdpcap: 50204 },
    { id: 12, country: 'Sweden', gdpm: 493042, popk: 9851, gdpcap: 50049 },
    { id: 13, country: 'San Marino', gdpm: 1558, popk: 31, gdpcap: 50258 },
    { id: 14, country: 'Netherlands', gdpm: 750696, popk: 16937, gdpcap: 44322 },
    { id: 15, country: 'United Kingdom', gdpm: 2858482, popk: 65110, gdpcap: 43902 },
    { id: 16, country: 'Austria', gdpm: 374261, popk: 8621, gdpcap: 43412 },
    { id: 17, country: 'Canada', gdpm: 1550537, popk: 35825, gdpcap: 43280 },
    { id: 18, country: 'Finland', gdpm: 232077, popk: 5472, gdpcap: 42411 },
    { id: 19, country: 'Germany', gdpm: 3365293, popk: 82176, gdpcap: 40952 },
    { id: 20, country: 'Belgium', gdpm: 454288, popk: 11209, gdpcap: 40528 },
    { id: 21, country: 'United Arab Emirates', gdpm: 370296, popk: 9581, gdpcap: 38648 },
    { id: 22, country: 'France', gdpm: 2420163, popk: 64275, gdpcap: 37653 },
    { id: 23, country: 'New Zealand', gdpm: 172257, popk: 4647, gdpcap: 37068 },
    { id: 24, country: 'Israel', gdpm: 299413, popk: 8377, gdpcap: 35742 },
    { id: 25, country: 'Japan', gdpm: 4124211, popk: 126981, gdpcap: 32478 },
    { id: 26, country: 'Brunei Darussalam', gdpm: 12930, popk: 417, gdpcap: 31007 },
    { id: 27, country: 'Italy', gdpm: 1815759, popk: 60796, gdpcap: 29866 },
    { id: 28, country: 'Puerto Rico', gdpm: 102906, popk: 3474, gdpcap: 29621 },
    { id: 29, country: 'Kuwait', gdpm: 114079, popk: 4110, gdpcap: 27756 },
    { id: 30, country: 'South Korea', gdpm: 1377873, popk: 50617, gdpcap: 27221 },
    { id: 31, country: 'Spain', gdpm: 1199715, popk: 46423, gdpcap: 25843 },
    { id: 32, country: 'The Bahamas', gdpm: 8854, popk: 364, gdpcap: 24324 },
    { id: 33, country: 'Bahrain', gdpm: 31119, popk: 1294, gdpcap: 24048 },
    { id: 34, country: 'Cyprus', gdpm: 19330, popk: 847, gdpcap: 22821 },
    { id: 35, country: 'Malta', gdpm: 9752, popk: 429, gdpcap: 22731 },
    { id: 36, country: 'Taiwan', gdpm: 523006, popk: 23492, gdpcap: 22263 },
    { id: 37, country: 'Slovenia', gdpm: 42798, popk: 2063, gdpcap: 20745 },
    { id: 38, country: 'Saudi Arabia', gdpm: 646002, popk: 31386, gdpcap: 20582 },
    { id: 39, country: 'Portugal', gdpm: 199032, popk: 10411, gdpcap: 19117 },
    { id: 40, country: 'Trinidad and Tobago', gdpm: 24631, popk: 1358, gdpcap: 18137 },
    { id: 41, country: 'Greece', gdpm: 195320, popk: 10858, gdpcap: 17988 },
    { id: 42, country: 'Czech Republic', gdpm: 185156, popk: 10538, gdpcap: 17570 },
    { id: 43, country: 'Estonia', gdpm: 22704, popk: 1313, gdpcap: 17291 },
    { id: 44, country: 'Equatorial Guinea', gdpm: 13819, popk: 799, gdpcap: 17295 },
    { id: 45, country: 'Oman', gdpm: 64121, popk: 3840, gdpcap: 16698 },
    { id: 46, country: 'St. Kitts and Nevis', gdpm: 915, popk: 56, gdpcap: 16339 },
    { id: 47, country: 'Palau', gdpm: 287, popk: 18, gdpcap: 15944 },
    { id: 48, country: 'Slovakia', gdpm: 86629, popk: 5421, gdpcap: 15980 },
    { id: 49, country: 'Barbados', gdpm: 4385, popk: 280, gdpcap: 15660 },
    { id: 50, country: 'Uruguay', gdpm: 53107, popk: 3416, gdpcap: 15546 }
  ],
  tree: {
    title: 'World',
    children: [{
      title: 'Asia',
      children: [{
        title: 'Korea',
        children: [
          {
            title: '서울',
            children: [
              { title: '도봉구' },
              { title: '성북구' },
              { title: '종로구' },
              { title: '서대문구' },
              { title: '동대문구' },
              { title: '성동구' },
              { title: '중구' }
            ]
          },
          { title: '부산' },
          { title: '대전' },
          { title: '대구' },
          { title: '광주' },
          { title: '세종' },
          { title: '경기도' },
          { title: '강원도' },
          { title: '충청도' },
          { title: '전라도' },
          { title: '경상도' },
          { title: '제주도' }
        ]
      }]
    }, {
      title: 'Europe',
      children: [
        { title: 'Norway' },
        { title: 'Finland' },
        { title: 'Sweden' },
        { title: 'Denmark' },
        { title: 'UK' }
      ]
    }, {
      title: 'America',
      children: [
        { title: 'Canada' },
        { title: 'USA' },
        { title: 'Mexico' }
      ]
    }, {
      title: 'Africa',
      children: [
        { title: 'Egypt' },
        { title: 'Morocco' },
        { title: 'Niger' },
        { title: 'Sudan' }
      ]
    }, {
      title: 'Antarctica'
    }]
  },
  line: [
    { month: 'Jan', mean: -5.2, high: -0.8, low: -9.7 },
    { month: 'Feb', mean: -3.4, high: 1.4, low: -8.2 },
    { month: 'Mar', mean: 1.7, high: 6.9, low: -3.5 },
    { month: 'Apr', mean: 8.8, high: 14.6, low: 2.9 },
    { month: 'May', mean: 14.6, high: 20.8, low: 8.4 },
    { month: 'Jun', mean: 19.6, high: 25.5, low: 13.6 },
    { month: 'Jul', mean: 22.1, high: 27.9, low: 16.3 },
    { month: 'Aug', mean: 21.2, high: 26.9, low: 15.5 },
    { month: 'Sep', mean: 16.6, high: 22.3, low: 10.9 },
    { month: 'Oct', mean: 9.8, high: 15.4, low: 4.2 },
    { month: 'Nov', mean: 4.3, high: 8.8, low: -0.3 },
    { month: 'Dec', mean: -1.9, high: 2.1, low: -6 }
  ],

  /**
   * 랜덤 넘버를 날짜순으로 배열해 리턴합니다.
   *
   * @param {number} [series=1] 시리즈의 수
   * @param {number} [count=365] 포인트의 수
   * @param {string} [intervalUnit='days'] date의 간격. moments.js의 manipulation에서 쓰이는 단위를 사용합니다.
   * @param {number} [min=0] 최소값
   * @param {number} [max=100] 최대값
   * @returns [{date: Date, value: RandomNumner}...] 를 리턴합니다.
   */
  randomNumber (series = 1, count = 365, intervalUnit = 'days', min = 0, max = 100) {
    let arr = []
    let range = max - min
    let date = dayjs(new Date()).subtract(count, intervalUnit)
    for (let i = 0; i < count; i++) {
      let obj = {
        date: date.valueOf()
      }
      for (let s = 0; s < series; s++) {
        obj['series-' + s] = Math.round(Math.random() * range + min)
      }
      arr.push(obj)
      date = date.add(1, intervalUnit)
    }
    return arr
  },

  /**
   * Math.cos 파형을 아용한 트렌드를 가진 랜덤 데이타. 최대값과 최소값에 근접하는 적당한 사이즈의 cos 파형을 리턴합니다.
   *
   * @param {number} [series=1] 시리즈의 수
   * @param {number} [count=365] 포인트의 수
   * @param {string} [intervalUnit='days'] date의 간격. moments.js의 manipulation에서 쓰이는 단위를 사용합니다.
   * @param {number} [min=0] 최소값
   * @param {number} [max=10] 최대값
   * @returns
   */
  randomTrend (series = 1, count = 365, intervalUnit = 'days', min = 0, max = 10) {
    let arr = []
    let range = max - min
    let date = dayjs(new Date()).subtract(count, intervalUnit)
    for (let i = 0; i < count; i++) {
      let obj = {
        date: date.valueOf()
      }
      for (let s = 0; s < series; s++) {
        obj['series-' + s] = Math.round(Math.cos(i * Math.PI / (count / 2) + s) * range) + Math.round(Math.random() * range + min)
      }
      arr.push(obj)
      date = date.add(1, intervalUnit)
    }
    return arr
  },

  /**
   * Math.cos 파형을 아용한 트렌드를 가진 랜덤 데이타. 최대값과 최소값에 근접하는 적당한 사이즈의 cos 파형을 리턴합니다.
   *
   * @param {number} [series=1] 시리즈의 수
   * @param {number} [count=365] 포인트의 수
   * @param {number} [min=0] 최소값
   * @param {number} [max=10] 최대값
   * @returns
   */
  randomScatteredTrend (series = 1, count = 365, min = 0, max = 10) {
    let arr = []
    let range = max - min
    for (let i = 0; i < count; i++) {
      let obj = {
        x: i
      }
      for (let s = 0; s < series; s++) {
        obj['series-' + s] = Math.round(Math.cos(i * Math.PI / (count / 2) + s) * range) + Math.round(Math.random() * range + min)
      }
      arr.push(obj)
    }
    return arr
  },
  randomKeyInOneSeries (
    randoms = ['A', 'B', 'C'],
    count = 365,
    intervalUnit = 'days',
    min = 0,
    max = 100
  ) {
    let arr = []
    let range = max - min
    let date = dayjs(new Date()).subtract(count, intervalUnit)
    for (let i = 0; i < count; i++) {
      let obj = {
        date: date.valueOf()
      }
      obj.series = Math.round(Math.cos(i * Math.PI / (count / 2)) * range) + Math.round(Math.random() * range + min)
      obj.random = randoms[Math.floor(Math.random() * randoms.length)]
      arr.push(obj)
      date = date.add(1, intervalUnit)
    }
    return arr
  },
  tableData (length = 200) {
    // create some random data
    let countries = ['US', 'Germany', 'UK', 'Japan', 'Italy', 'Greece']
    let products = ['Phones', 'Computers', 'Cameras', 'Stereos']
    let data = []
    for (let i = 0; i < 200; i++) {
      data.push({
        id: i,
        country: countries[i % countries.length],
        product: products[i % products.length],
        downloads: Math.round(100 + Math.random() * 10000),
        sales: Math.random() * 10000,
        expenses: Math.random() * 5000
      })
    }

    return data
  }

}
