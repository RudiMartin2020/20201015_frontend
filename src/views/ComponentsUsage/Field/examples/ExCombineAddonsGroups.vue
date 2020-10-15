<template>
  <b-field grouped>
    <b-field
      label="Name"
      expanded
    >
      <b-field>
        <b-select placeholder="Title">
          <option>Mr.</option>
          <option>Ms.</option>
        </b-select>
        <b-input
          placeholder="Name"
          expanded
        />
      </b-field>
    </b-field>
    <b-field
      label="Email"
      expanded
    >
      <b-input placeholder="some@email.com" />
    </b-field>
  </b-field>
</template>
