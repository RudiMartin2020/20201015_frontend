<template>
  <section>
    <b-field
      label="Small"
      custom-class="is-small"
    >
      <b-input
        value="Kevin Garvey"
        size="is-small"
      />
    </b-field>
    <b-field
      label="Large"
      custom-class="is-large"
    >
      <b-input
        value="Kevin Garvey"
        size="is-large"
      />
    </b-field>

    <b-field
      label="Danger"
      custom-class="has-text-danger"
      type="is-danger"
      message="This email is invalid"
    >
      <b-input
        type="email"
        value="john@"
        maxlength="30"
      />
    </b-field>

    <b-field
      label="Multiple (small and success)"
      custom-class="is-small has-text-success"
      type="is-success"
    >
      <b-input
        value="johnsilver"
        maxlength="30"
        size="is-small"
      />
    </b-field>

    <b-field
      label="Computed (medium and primary)"
      :custom-class="classes"
      type="is-primary"
    >
      <b-input
        value="johnsilver"
        maxlength="30"
        size="is-medium"
      />
    </b-field>
  </section>
</template>

<script>
export default {
  data () {
    return {
      firstClass: 'has-text-primary',
      secondClass: 'is-medium'
    }
  },
  computed: {
    classes () {
      return `${this.firstClass} ${this.secondClass}`
    }
  }
}
</script>
