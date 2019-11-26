<template>
  <div class="overlay" v-on:click="$emit('close')">
    <div class="modal" v-on:click.stop="">
      <button class="close" v-on:click="$emit('close')">
        <fa icon="times-circle"/>
      </button>
      <div class="content" v-scroll-lock="true">
        <slot/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 40px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 40px);
  z-index: 1;

  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;

  .modal {
    position: relative;
    max-width: 860px;
    background: white;
    border-radius: 2px;
    box-shadow: 1px 1px 4px 0px #777;
  }

  &:not(.small) {
    .modal {
      width: 100%;
      height: 100%;
      @media screen and (min-width: 768px) {
        width: calc(100% - 32px);
        height: calc(100% - 64px);
      }
    }
  }

  &.small {
    .modal {
      width: calc(100% - 32px);
      max-width: 400px;
      max-height: calc(100% - 64px);
    }
  }

  .modal {
    .close {
      background: none;
      border: none;
      font-size: 20px;
      position: absolute;
      top: 20px;
      right: 16px;
      cursor: pointer;
    }

    .content {
      width: 100%;
      height: calc(100% - 8px);
      margin: 4px 0;
      overflow-y: auto;
      padding: 20px 48px 120px 16px;
      @media screen and (min-width: 768px) {
        padding: 20px 48px 40px 40px;
      }
      box-sizing: border-box;
    }
  }
}
</style>
