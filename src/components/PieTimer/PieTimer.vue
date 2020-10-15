<template>
  <div class="pie-timer">
    <div class="mask" />
    <div class="pie filler" />
    <div class="pie spinner" />
  </div>
</template>
<script>
export default {
  name: 'PieTimer'
}
</script>
<style lang="scss" scoped>
@mixin timer($item, $duration, $size, $color, $border, $hover: running) {
  #{$item}, #{$item} * { box-sizing: border-box; }

  #{$item} {
    width: $size;
    height: $size;
  }

  #{$item} .pie-timer {
    position: relative;
  }

  #{$item} .pie {
    width: 50%;
    height: 100%;
    transform-origin: 100% 50%;
    position: absolute;
    background: $color;
    //border: #{$border};
  }

  #{$item} .spinner {
    border-radius: 100% 0 0 100% / 50% 0 0 50%;
    z-index: 2;
    border-right: none;
    animation: rota $duration + s linear infinite;
    background-color: #fff;
  }

  #{$item}:hover .spinner,
  #{$item}:hover .filler,
  #{$item}:hover .mask {
    animation-play-state: $hover;
  }

  #{$item} .filler {
    border-radius: 0 100% 100% 0 / 0 50% 50% 0;
    left: 50%;
    opacity: 0;
    z-index: 1;
    animation: opa-reverse $duration + s steps(1,end) infinite;
    border-left: none;
    background-color: #fff;
  }

  #{$item} .mask {
    width: 50%;
    height: 100%;
    position: absolute;
    background: inherit;
    opacity: 0;
    z-index: 3;
    animation: opa $duration + s steps(1,end) infinite;
    //background-color: $c-bg-block;
  }

  @keyframes rota {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes opa {
    0% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }

  @keyframes opa-reverse {
    0% { opacity: 0; }
    50%, 100% { opacity: 1; }
  }

}

.pie-timer {
  $times: 5 30 60 600 1800 3600 86400;

  position: relative;
  background: #1c2340;

  @include timer('&', 5, 16px, #ccc, '1px solid #fff');

  @each $time in $times {
    &.-time-#{$time} {
      @include timer('&', $time, 16px, #ccc, '1px solid #fff');
    }
  }

}
</style>
