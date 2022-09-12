<template>
  <div class="Modal" v-if="show">
    <div class="Modal--content">
      <div
        class="Modal--close"
        v-html="closeIcon"
        @click="CloseButtonClick"
      ></div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import feather from "feather-icons";

export default {
  name: "ModalSvg",
  props: {
    show: {
      Typer: Boolean,
      default: "false",
    },
  },
  computed: {
    closeIcon() {
      return feather.icons.x.toSvg();
    },
  },
  methods: {
    CloseButtonClick() {
      this.$emit("onCancelClick");
    },
  },
};
</script>

<style lang="less" scoped>
.Modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  &--content {
    background-color: white;
    border-radius: 8px;
    width: max-content;
    padding: 30px;

    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
  }
  &--close {
    text-align: right;
    cursor: pointer;
  }
}
</style>
