<template>
  <div id="app">
    <router-view/>
    <footer>
      &copy; 2019 Ryan Calhoun

      <ul>
        <li> <router-link to="/privacy/"> Privacy Policy </router-link> </li>
      </ul>
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
  font-size: 16px;
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Merriweather', serif;
    letter-spacing: 0.02em;
  }
  p {
    line-height: 1.5em;
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

    ul {
      position: absolute;
      right: 50px;
      top: 0;
      &, li {
        display: inline-block;
        list-style: none;
      }
    }
  }
}
</style>
