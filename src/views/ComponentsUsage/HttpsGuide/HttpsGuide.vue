<template>
  <component-panel title="HTTPS 적용 가이드">
    <div class="panel-content">
      <section class="example-view">
        <p class="title">
          인증서 다운로드
        </p>
        <a
          :href="publicPath + 'miip-rootca.crt'"
          download
        >
          <b-button>
            Download
          </b-button>
        </a>
        <div class="images">
          <div>
            <img
              src="@/assets/https-guide/1.jpg"
            >
          </div>
          <div>
            <img
              src="@/assets/https-guide/2.jpg"
            >
          </div>
          <div>
            <img
              src="@/assets/https-guide/3.jpg"
            >
          </div>
          <div>
            <img
              src="@/assets/https-guide/3-1.jpg"
            >
          </div>
          <div>
            <img
              src="@/assets/https-guide/4.jpg"
            >
          </div>
          <div>
            <img
              src="@/assets/https-guide/5.jpg"
            >
          </div>
          <div>
            <img
              src="@/assets/https-guide/6.jpg"
            >
          </div>
          <div>
            <img
              src="@/assets/https-guide/7.jpg"
            >
          </div>
          <div>
            <img
              src="@/assets/https-guide/7-1.jpg"
            >
          </div>
          <div>
            <img
              src="@/assets/https-guide/8.jpg"
            >
          </div>
        </div>
      </section>
    </div>
  </component-panel>
</template>

<script>
export default {
  data () {
    return {
      publicPath: process.env.BASE_URL
    }
  }
}
</script>

<style lang="scss">
#app {
  &.-theme-day {
    .panel-content {
      p.title {
        color: #444;
      }
    }
  }
}
  .panel-content {
    p.title {
      font-size: 1.78rem;;
      color: #fff;
    }
    .images {
      margin-top: 30px;
      text-align: center;
      > div {
        margin-top: 50px;
        img {
          border: 1px solid #7a7a7a;
        }
      }
    }
  }
</style>
