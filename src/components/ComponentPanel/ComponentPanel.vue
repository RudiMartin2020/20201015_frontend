<template>
  <section
    :class="['component-panel', {'-expanded': expanded}]"
  >
    <div
      v-if="useHeader"
      class="panel-header"
      :class="{'-multi-row': multiRowHeader}"
    >
      <span class="header-title">
        {{ title }}
      </span>
      <div class="header-content">
        <slot
          name="header"
        />
      </div>
      <b-button
        v-if="usePin"
        type="is-text"
        :icon-left="isPinned ? 'pin' : 'pin-outline'"
        class="header-button -pin-to-dashboard"
        :class="{'-pinned': isPinned}"
        @click="pinToDashboard()"
      />
      <a
        class="header-button -expand-panel"
        @click="expandPanel()"
      />
    </div>
    <!-- /.panel-header -->
    <div class="panel-body">
      <slot />
    </div>
    <div
      v-if="useFooter"
      class="panel-footer"
    >
      <slot
        name="footer"
      />
    </div>
  </section>
</template>

<script src="./ComponentPanel.script.js" />
<style src="./ComponentPanel.scss" lang="scss" />
