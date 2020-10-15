<template>
  <div class="home">
    <side-nav />
    <section :class="['app-main', '-theme-' + theme,'-side-nav-expanded-' + sideNavExpanded]">
      <div class="main-head">
<!--
        <app-state />
-->
      </div>
      <div
        class="main-body"
        ref="appBody"
      >
        <div class="update-component">
          <div class="last-update">
            Last update : {{ formattedRequestDate }}
          </div>
          <b-button
            type="is-dark"
            icon-left="refresh"
            size="is-small"
            @click="refresh"
          />
        </div>
        <router-view v-if="!refreshRouter" />
      </div>
    </section>
  </div>
</template>

<script src="./Home.script.js" />
<style lang="scss">
  .home {
    $app-state-height: 56px;
    min-height: calc(100vh - #{$app-state-height});
    .side-nav {
      top: 0;
    }
    .app-main {
      padding-left: $nav-width-d1;
      transition: .3s ease-out padding;
      min-height: calc(100vh - #{$app-state-height});
      &.-side-nav-expanded-true {
        padding-left: $nav-width-d1 + $nav-width-d2;
      }
      > .main-head {
        position: fixed;
        top: 0;
        left: $nav-width-d1;
        width: calc(100vw - #{$nav-width-d1});
        height: $app-state-height;
        margin-bottom: $gap;
        z-index: 5;
        box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
      }
      > .main-body {
        position: relative;
        margin-top: $app-state-height;
        padding-top:$gap;
        height: calc(100vh - #{$app-state-height});
        > * {
          position: relative;
        }
        .update-component {
          position: absolute;
          right: $gap;
          top: 7px;
          display: flex;
          align-items: center;
          z-index:4;
          .last-update {
            margin-right: $gap-s;
          }
          .icon {
            position:relative;
            top:-2px;
          }
        }
      }
      .app-state {
        position: absolute;
        top: 0;
        width: 100%;
        box-sizing: border-box;
        z-index: $z-app-state;
      }
    }
  }
</style>
