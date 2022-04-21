<template>
  <b-navbar wrapper-class="container">
    <template slot="brand">
      <a href="/">
        <figure :class="['image', imgClass]" :style="humaLogoStyle" href="/">
          <img src="~/assets/huma_logo.svg" />
        </figure>
      </a>
      <b-navbar-item tag="div">
        <div>
          <h2 class="subtitle">
            <b>Hu</b>mans & <br />
            <b>Ma</b>chines
          </h2>
        </div>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="a" href="/">
        <b-icon icon="text-box-multiple" />
        &nbsp;&nbsp; Blog
      </b-navbar-item>
      <b-navbar-item tag="a" href="/about">
        <b-icon icon="comment-account" /> &nbsp;&nbsp; About
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
const logoSize = 64 // choose a value in this list (available in bulma classes): 16, 24, 32, 48, 64, 96, 128
const marginSize = logoSize / 12

export default {
  data() {
    return {
      imgClass: 'is-' + logoSize + 'x' + logoSize,
      humaLogoStyle: {
        'margin-top': marginSize + 'px',
        'margin-right': 2 * marginSize + 'px',
        'margin-bottom': marginSize + 'px',
        'margin-left': marginSize + 'px',
      },
    }
  },
  head: {
    htmlAttrs: {
      style: 'padding-top: ' + marginSize + 'px',
    },
  },
}
</script>

<style scoped></style>
