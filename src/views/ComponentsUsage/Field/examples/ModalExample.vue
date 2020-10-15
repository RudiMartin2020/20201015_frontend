<template>
  <div>
    <button
      class="button is-primary is-medium"
      @click="isImageModalActive = true"
    >
      Launch image modal
    </button>

    <b-modal
      :active.sync="isImageModalActive"
    >
      <p class="image is-4by3">
        test
      </p>
    </b-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isImageModalActive: false
    }
  }
}
</script>
