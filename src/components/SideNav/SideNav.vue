<template>
  <section
    :class="['side-nav', '-expanded-' + expanded]"
  >
    <ul
      class="nav-d1"
    >
      <li class="nav-item -logo">
        <span class="item-label">SK C&amp;C</span>
      </li>
      <li
        :class="['nav-item -dashboard', {'-is-active': pathName(0) == ''}]"
        @click="$router.push({name: 'demo'})"
      >
        <span class="item-icon">
          <b-icon
            icon="lifebuoy"
          />
        </span>
        <span class="item-label">
          Demo
        </span>
        <!-- /.item-icon -->
      </li>
      <li
        v-for="item in programs"
        :key="item.url"
        :class="['nav-item', item.class, {'-is-active': pathName(0) == item.url.split('/')[1]}]"
        @click="e => { clickD1(item) }"
      >
        <span class="item-icon">
          <b-icon
            v-if="item.progrmPictr"
            :icon="item.progrmPictr"
          />
        </span>
        <span class="item-label">
          {{ item.title }}
        </span>
        <!-- /.item-icon -->
      </li>
      <!-- /.v-for nav-item -->
      <li class="nav-item -more">
        <a class="item-button">
          <span class="item-icon" />
          <span class="item-label">more</span>
        </a>
      </li>
      <li class="nav-item -add">
        <a class="add-item" />
      </li>
      <li class="nav-item">
        <a
          href="/menu"
          class="item-button"
        >
          <span class="item-icon" />
          MENU
        </a>
      </li>
    </ul>
    <!-- /.nav-d1 -->
    <div class="nav-d2">
      <div
        class="nav-d2-dimm"
        @click.stop="e => setSideNavState(false)"
      />
      <div class="nav-item -head">
        <span class="title">
          {{ subItem.title }}
        </span>
        <a
          class="collapse-toggle"
          @click="setSideNavState(false)"
        />
      </div>
      <sk-tree
        ref="tree"
        :data="subItem.children"
        :collapse-all="true"
        :columns="columns"
      >
        <template #bookmark="{ node }">
          <b-icon
            v-if="!node.children || !node.children.length"
            :icon="node.bookMark ? 'bookmark' : 'bookmark-outline'"
            :type="node.bookMark ? 'is-primary' : 'is-dark'"
            @click.native="e => bookmarkToggle(e, node)"
          />
        </template>
      </sk-tree>
    </div>
  </section>
</template>

<script src="./SideNav.script.js" />
<style src="./SideNav.scss" lang="scss"/>
