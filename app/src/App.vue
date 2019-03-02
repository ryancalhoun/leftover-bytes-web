<template>
  <div id="app">
    <router-view/>
    <footer>
      &copy; 2019 Ryan Calhoun
    </footer>
  </div>
</template>

<style lang="scss">

@import url('https://fonts.googleapis.com/css?family=Merriweather|Roboto');

html, body {
  margin: 0;
}

* {
  box-sizing: border-box;
}

#app {
  font-family: 'Roboto', sans-serif;
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Merriweather', serif;
  }
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  & > :first-child {
    min-height: 100vh;
    box-sizing: border-box;
  }

  footer {
    position: relative;
    margin-top: -50px;
    padding: 12px 40px;
    font-size: 14px;
    color: #777;
  }
}
</style>
