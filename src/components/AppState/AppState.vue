<template>
  <section class="app-state">
    <div class="state-breadcrumbs">
      <span class="app-title">
        {{ appTitle }}
      </span>
      <span class="crumbs">
        {{ crumbs }}
      </span>
    </div>
    <!-- /stat-breadcrumbs -->
    <ul class="state-icons">
      <li class="icon-item -search" />
      <li class="icon-item -alarm" />
      <li class="icon-item -settings" />
      <li class="icon-item -help" />
    </ul>
    <!--
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
    -->
    <div class="search-box">
      <b-field>
        <b-input
          icon-left="magnify"
          placeholder="통합검색"
          class="search-input"
          type="search"
          @input="search"
          @focusout.native="resetGlobalSearch"
        />
        <!-- <p class="control">
          <b-button
            type="is-dark"
            @click="search"
          >
            검색
          </b-button>
        </p> -->
      </b-field>
      <div
        style="position: absolute;"
        v-if="searchResultList.length > 0"
        @mouseenter="mouseInGlobalSearchListDiv = true"
        @mouseleave="mouseInGlobalSearchListDiv = false"
      >
        <ul class="filter-list">
          <li
            class="filter-list-item"
            v-for="(search, i) in searchResultList"
            :key="i"
            @click="test(search.url)"
          >
            <span
              class="program-label"
              v-for="(n, j) in search.splitedPath"
              :key="j"
            >
              {{ n }}
              <b-icon
                v-if="j < search.splitedPath.length - 1"
                icon="menu-right"
                size="is-small"
              />
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="favorites">
      <b-dropdown
        position="is-bottom-left"
        aria-role="menu"
        :is-active="bookmarkActive"
      >
        <b-button
          type="is-dark"
          icon-left="star"
          slot="trigger"
          role="button"
        />
        <b-dropdown-item
          class="favorite-box"
          aria-role="menu-item"
          :focusablbe="false"
          custom
          paddingless
        >
          <div class="favorite-header">
            즐겨찾기
          </div>
          <draggable
            v-model="favorites"
            tag="ul"
            class="favorite-list"
          >
            <li
              class="favorite-list-item"
              v-for="program in favorites"
              :key="program.label"
              @click="routerTo(program.url)"
            >
              <span class="program-service">
                <b-icon
                  :icon="icons[program.service]"
                  size="is-small"
                />
                {{ program.service }}
              </span>
              <span class="program-label">{{ program.label }}</span>
            </li>
            <li
              class="favorite-item-none"
              v-if="favorites !== null && favorites.length === 0"
            >
              추가된 즐겨찾기가 없습니다.
            </li>
          </draggable>
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <!-- /.favorites -->
    <div class="push-alarms">
      <b-button
        :type="alarmType"
        @click="alarmsOpen"
        icon-left="bell"
        class="alarm-bell"
        :class="[{ '-has-new': alarmReceived }]"
      />
      <push-alarms :active.sync="alarmShow" />
    </div>
    <!-- /.push-alarms -->
    <div class="app-theme">
      <b-dropdown
        position="is-bottom-left"
        aria-role="list"
      >
        <b-button
          type="is-dark"
          icon-left="brightness-4"
          slot="trigger"
        />
        <b-dropdown-item
          custom
          aria-role="listitem"
          v-for="theme in themes"
          :key="theme"
        >
          <b-button
            type="is-text"
            class="theme-button"
            @click="e => { setTheme(theme) }"
            expanded
          >
            {{ theme }}
          </b-button>
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <!-- /.app-theme -->
    <div class="state-user">
      <b-dropdown
        position="is-bottom-left"
        aria-role="list"
      >
        <div
          class="user-item"
          slot="trigger"
          v-if="user"
        >
          <span
            class="user-image"
            :style="{ 'background-image': 'url(' + userAvatar + ')' }"
          />
          <span class="user-name">{{ user.userNm }}</span>
          <b-icon icon="chevron-down" />
        </div>
        <!-- /.user-item -->
        <b-dropdown-item
          class="user-profile"
          custom
          aria-role="listitem"
        >
          <div class="user-profile-info">
            <span
              class="user-profile-image"
              :style="{ 'background-image': 'url(' + userAvatar + ')' }"
            />
          </div>

          <div class="user-profile-contents">
            <div
              v-for="item in userInfo"
              :key="item.label"
            >
              <p
                v-if="item.label === '이름'"
                class="user-info-item -name"
              >
                {{ item.info }}
              </p>
              <!-- <b-field -->
              <ul
                class="user-info-list"
                v-else
              >
                <li class="user-info-item">
                  <span class="info-item-label">{{ item.label }}</span>
                  <span
                    v-if="item.label === 'github 연동'"
                    class="info-item-info"
                  >
                    <b-button
                      type="is-primary"
                      size="is-small"
                      v-if="!user.oauthId"
                      disabled
                    >
                      <!-- <a
                        class="auth-link"
                        href="https://github.com/login/oauth/authorize?client_id=ad3f0b39ef64d9163377"
                        disabled
                      > -->
                      연동하기
                      <!-- </a> -->
                    </b-button>
                    <b-button
                      type="is-dark"
                      size="is-small"
                      v-else
                    >연동완료</b-button>
                  </span>
                  <span
                    v-else
                    class="info-item-info"
                  >{{ item.info }}</span>
                </li>
              </ul>
              <!-- <b-field
                v-else
                :label="item.label"
                horizontal
              >
                <span
                  class="user-info-item"
                >
                  {{ item.info }}
                </span>
              </b-field> -->
            </div>
          </div>
          <!-- <b-field
            label="부서"
            horizontal
          >
            <span class="user-info-item">
              {{ this.$store.getters.user.userDty }}
            </span>
          </b-field>
          <b-field
            label="직급"
            horizontal
          >
            <span class="user-info-item">
              {{ this.$store.getters.user.userOfcps }}
            </span>
          </b-field>
          <b-field
            label="전화번호"
            horizontal
          >
            <span class="user-info-item">
              {{ this.$store.getters.user.userPhoneNo }}
            </span>
          </b-field>
          <b-field
            label="이메일"
            horizontal
          >
            <span class="user-info-item">
              {{ this.$store.getters.user.userEmail }}
            </span>
          </b-field>
          <b-field
            label="ㄱ태"
            horizontal
          >
            <span class="user-info-item">
              {{ this.$store.getters.user.userSttus }}
            </span>
          </b-field> -->
        </b-dropdown-item>
        <hr class="dropdown-divider">
        <b-dropdown-item
          @click.native="logout"
          aria-role="listitem"
          class="logout-button"
        >
          로그아웃
        </b-dropdown-item>
      </b-dropdown>
    </div>
  </section>
</template>

<script src="./AppState.script.js" />
<style src="./AppState.scss" lang="scss" />
