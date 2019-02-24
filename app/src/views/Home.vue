<template>
  <div class="home">
    <div class="header">
      <div class="title">
        <h1> Leftover Bytes </h1>
      </div>
      <div class="subtitle">
        <p> There are many bytes out there on the web. </p>
        <p> These are the leftovers. </p>
      </div>
    </div> 
  </div>
</template>

<script>

export default {
  name: 'home',
}
</script>

<style lang="scss">
.home {
  .header {
    background-color: #4d4d4d;
    color: white;
    padding: 40px 0;
    text-align: left;
    h1 {
      margin: 0;
      font-size: 32px;
    }
    .title, .subtitle {
      max-width: 320px;
      padding: 0 16px;
    }
    .title {
      margin: 20px auto 20px;
    }
    .subtitle {
      margin: 40px auto 40px;
    }
    p {
      margin: 0;
      font-style: italic;
    }
    @media screen and (min-width: 425px) {
      h1 {
        margin: 0;
        font-size: 48px;
      }
      .title {
        margin-top: 40px;
      }
    }
  }
}
</style>
