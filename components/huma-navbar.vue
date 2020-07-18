<template>
  <nav class="navbar container is-fixed-top">
    <div class="navbar-brand">
      <a href="/">
        <figure :class="['image', imgClass]" :style="humaLogoStyle" href="/">
          <img src="~/assets/huma_logo.svg" />
        </figure>
      </a>
      <div
        class="navbar-burger"
        @click="showNav = !showNav"
        :class="{ 'is-active': showNav }"
        :style="{ height: burgerSize + 'px' }"
      >
        <span />
        <span />
        <span />
      </div>
    </div>

    <div class="navbar-menu" :class="{ 'is-active': showNav }">
      <div class="navbar-start">
        <a class="navbar-item" href="/">
          <b-icon icon="text-box-multiple" />
          &nbsp Blog
        </a>
        <a class="navbar-item" href="/blog/about">
          <b-icon icon="comment-account" /> &nbsp About
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
var logoSize = 96 // choose a value in this list (available in bulma classes): 16, 24, 32, 48, 64, 96, 128

var marginSize = logoSize / 12
var navbarSize = logoSize + 2 * marginSize

export default {
  data() {
    return {
      showNav: false,
      logoSize: logoSize,
      marginSize: marginSize,
      burgerSize: navbarSize,
      imgClass: 'is-' + logoSize + 'x' + logoSize,
      humaLogoStyle: {
        'margin-top': marginSize + 'px',
        'margin-right': 4 * marginSize + 'px',
        'margin-bottom': marginSize + 'px',
        'margin-left': marginSize + 'px',
      },
    }
  },
  head: {
    htmlAttrs: {
      style: 'padding-top: ' + (navbarSize + 1) + 'px',
    },
  },
}
</script>

<style scoped>
b-icon {
  margin: 10px;
}
</style>
