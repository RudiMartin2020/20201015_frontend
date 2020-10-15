<template>
  <section>
    <b-field label="Name">
      <b-input value="Kevin Garvey" />
    </b-field>

    <b-field
      label="Email"
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
      label="Username"
      type="is-success"
      message="This username is available"
    >
      <b-input
        value="johnsilver"
        maxlength="30"
      />
    </b-field>

    <b-field
      label="Password"
      type="is-warning"
      :message="['Password is too short', 'Password must have at least 8 characters']"
    >
      <b-input
        value="123"
        type="password"
        maxlength="30"
      />
    </b-field>

    <b-field
      label="Disabled Field"
      message="This email is invalid"
    >
      <b-input
        value="Disabled Text"
        maxlength="30"
        disabled
      />
    </b-field>

    <b-field label="Subject">
      <b-select placeholder="Select a subject">
        <option value="1">
          Option 1
        </option>
        <option value="2">
          Option 2
        </option>
      </b-select>
    </b-field>
  </section>
</template>
