<template>
  <div id="navBarContainer" class="navigation-container">
    <div class="sub-header">
      <a :href="getHomepage()" target="_blank" rel="noopener" title="Viva con Agua Webseite"></a>
      <div class="language-container">
        <div class="language-fit">
          <LanguageSelection/>
        </div>
      </div>
    </div>
    <div id="header" class="header">
      <div class="logo-container">
        <a @click="home" class="logo">
          <img class="navigation-logo" src="~@/assets/img/vca_logo_plain.png">
        </a>
      </div>
      <div class="language-container-mobile">
        <div class="language-fit">
          <LanguageSelection/>
        </div>
      </div>
      <div class="burger-menu-icon" @click="toggleMenu()">
        <div id="burger-top-bar" class="burger-bar burger-bar-appear"></div>
        <div id="burger-middle-bar-1" class="burger-bar burger-bar-display"></div>
        <div id="burger-middle-bar-2" class="burger-bar burger-bar-hide"></div>
        <div id="burger-bottom-bar" class="burger-bar burger-bar-appear"></div>
      </div>
    </div>
    <div id="navContainer" class="navContainer">
      <VcANavBar class="nav-bar" id="navBar" @click="navigate" @close="toggleMenu()">
        <div v-for="tab in tabs" class="na" :key="tab.title">
          <vca-tab v-if="isVisible(tab.title)" :title="$t(tab.title)" :selected="currentTab(tab.title)">{{
              tab.content
            }}
          </vca-tab>
        </div>
      </VcANavBar>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import VcANavBar from "@/components/utils/VcANavBar";
import LanguageSelection from "@/components/utils/LanguageSelection"

export default {
  name: 'Navigation',
  components: {
    VcANavBar, LanguageSelection
  },
  data() {
    return {
      container: null,
      header: null,
      body: null
    }
  },
  created() {
    this.$router.onReady(() => {
      if (this.current.data === undefined) {
        this.$store.dispatch({type: 'navigation/current', data: this.$route.meta.title})
      }
    })
    window.addEventListener('scroll', this.handleScroll);
    //document.body.addEventListener('click', this.toggleMenu);
  },
  mounted() {
    this.container = document.getElementById("navContainer")
    this.header = document.getElementById("navBar")
    this.body = document.getElementById("app")
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    home() {
      this.$store.dispatch({type: 'navigation/current', data: 'Home'})
      this.$router.push({name: 'Home'})
    },
    logout() {
      if (this.$router.currentRoute.name !== 'Logout') {
        this.$router.push({name: 'Logout'})
      }
    },
    handleScroll() {
      var list = this.header.getElementsByTagName("ul")[0]
      if (window.pageYOffset > this.container.offsetTop && !list.classList.contains('sticky')) {
        list.classList.add("sticky");
      } else if (window.pageYOffset < this.container.offsetTop) {
        list.classList.remove("sticky");
      }

    },
    toggleMenu() {
      const menuList = document.getElementById("menuList");
      const topBar = document.getElementById("burger-top-bar")
      const middleBar1 = document.getElementById("burger-middle-bar-1")
      const middleBar2 = document.getElementById("burger-middle-bar-2")
      const bottomBar = document.getElementById("burger-bottom-bar")
      if (menuList.classList.contains("menu-inactive")) {
        menuList.classList.remove("menu-inactive");
        menuList.classList.add("menu-active");
        topBar.classList.remove("burger-bar-appear")
        topBar.classList.add("burger-bar-disappear")
        bottomBar.classList.remove("burger-bar-appear")
        bottomBar.classList.add("burger-bar-disappear")
        middleBar2.classList.remove("burger-bar-hide")
        middleBar2.classList.add("burger-bar-display")
        middleBar1.classList.add("burger-bar-rotate-1")
        middleBar2.classList.add("burger-bar-rotate-2")
      } else {
        menuList.classList.remove("menu-active");
        menuList.classList.add("menu-inactive");
        topBar.classList.add("burger-bar-appear")
        topBar.classList.remove("burger-bar-disappear")
        bottomBar.classList.add("burger-bar-appear")
        bottomBar.classList.remove("burger-bar-disappear")
        middleBar2.classList.add("burger-bar-hide")
        middleBar2.classList.remove("burger-bar-display")
        middleBar1.classList.remove("burger-bar-rotate-1")
        middleBar2.classList.remove("burger-bar-rotate-2")
      }
    },
    navigate(tab) {

      if (!this.session && true == false /* handle other routing here */) {
        window.open(
            this.getHomepage(),
            '_blank'
        );
      } else {
        var currentTab = this.tabs.filter(t => this.$t(t.title).indexOf(tab.$options.propsData.title) > -1)
        this.$store.dispatch({type: 'navigation/current', data: tab.$options.propsData.title})
        this.$router.push(currentTab[0].route)
      }
    },
    currentTab(tab) {
      return this.$t(tab) === this.current.data
    },
    isVisible(title) {
      var included = this.sessionInclude(title)
      var excluded = this.sessionExluded(title)
      var dontCare = this.dontCare(title)
      return included || excluded || dontCare

    },
    dontCare(title) {
      return this.tabs.filter(t => t.title.indexOf(title) > -1 && t.needSession == undefined).length > 0
    },
    sessionInclude(title) {
      return this.session && this.tabs.filter(t => t.title.indexOf(title) > -1 && t.needSession !== undefined && t.needSession === true).length > 0
    },
    sessionExluded(title) {
      return !this.session && this.tabs.filter(t => t.title.indexOf(title) > -1 && t.needSession !== undefined && t.needSession === false).length > 0
    },
    getHomepage() {
      return "https://www.vivaconagua.org"
    }
  },
  computed: {
    ...mapGetters({
      session: 'session',
      current: 'navigation/current',
      tabs: 'navigation/tabs'
    })
  }
}
</script>
<style lang="scss">

.sticky {
  position: fixed !important;
  top: 0;
  bottom: auto !important;
  width: 100% !important;
  @include media(large) {
    position: fixed !important;
    bottom: inherit;
    right: 0;
    left: 50%;
    z-index: 1000;
    transform: translate(-50%, 0);
    margin: 0 !important;

    transition: margin .25s ease-out;
  }
}

.header {
  position: sticky;
  bottom: 0;
  display: flex;
  height: 40px;
  background-color: $blue;

  .logo-container {
    order: 0;
    flex-grow: 1;
    padding-left: 10px;
    display: flex;

    @include media(large) {
      flex-basis: 70%;
      display: flex;
      justify-content: flex-start;
      padding-left: 10px;
    }

    .logo {
      cursor: pointer;
      position: relative;
      z-index: 9;

      img {
        margin-top: 1vw;
        max-height: 35px;
        width: auto;
      }

      @include media(large) {
        background-size: 100% 100%;
        padding: 1% 1%;
        transform: translateY(0);
        background-image: url(~@/assets/img/brush.svg);
        margin: 5px 0 0 -50px;
        width: 250px;
        height: max-content;
        text-align: center;

        logo:hover {
          transition: transform .45s cubic-bezier(.63, .49, 0, 2.1);
        }

        img {
          margin-left: 0;
          margin-top: 0;
          width: 140px;
          max-height: 72px;
          height: auto;
        }
      }
    }
  }

  .language-container-mobile {
    display: flex;
    width: max-content;
    margin: auto;
    padding-right: 10px;
    order: 1;
    flex-grow: 0;

    span.normal-flag {
      transform: scale(.35);
      -ms-transform: scale(.35);
      -webkit-transform: scale(.35);
      -moz-transform: scale(.35);
      margin: -15px -20px;
    }

    span.small-flag {
      transform: scale(.2);
      -ms-transform: scale(.2);
      -webkit-transform: scale(.2);
      -moz-transform: scale(.2);
      margin: -15px -25px;
    }

    @include media(large) {
      display: none;
    }
  }

  .burger-menu-icon {
    position: relative;
    margin: auto;
    display: block;
    order: 2;
    flex-grow: 0;
    padding: 0 15px 0 15px;
    cursor: pointer;

    .burger-bar {
      width: 20px;
      height: 3px;
      background-color: $vca-primary-dark;
      margin: 4px 0 4px 0;
      border-radius: 2px;
      transition: all 0.2s;
    }

    .burger-bar-display {
      display: block;
    }
    .burger-bar-hide {
      display: none;
    }
    .burger-bar-appear {
      opacity: 1;
    }
    .burger-bar-disappear {
      opacity: 0;
    }

    .burger-bar-rotate-1 {
      position: absolute;
      bottom: 3px;
      transform: rotate(45deg);
    }
    .burger-bar-rotate-2 {
      position: absolute;
      bottom: 3px;
      transform: rotate(-45deg);
    }

  }

  @include media(large) {
    position: sticky;
    position: -webkit-sticky; /* Safari */
    top: 0;
    padding: 0 60px 0 0;
    height: 60px;
    z-index: 8;

    .logo-container {
      justify-content: flex-start;
    }
  }
}


.navContainer {
  z-index: 100;
  position: relative;

  .nav-bar {
    ul {
      position: relative;
      width: 90%;
      padding: 0;
      z-index: 9;
      -moz-box-pack: center;
      margin: 0 auto;
      justify-content: center;
      list-style-type: none;
      display: flex;
    }

    li {
      flex: auto;

      a {
        cursor: pointer;
        display: block;
        padding: 10px 10px;
        text-align: center;
        text-decoration: none;
      }
    }

    li.close-tabs {
      background-color: $vca-primary-dark;

      a {
        padding: 0;
      }

      @include media(large) {
        display: none;
      }
      :hover {
        color: $white;
      }
    }

    @include media(small) {

      #menuList {
        display: block;
        transition: all 0.4s;
      }

      .menu-inactive {
        visibility: hidden;
        opacity: 0;
        transform: translateY(10px);
      }

      .menu-active {
        visibility: visible;
        opacity: 1;
      }


      ul {
        position: absolute;
        top: 0;
        right: 0;
        background-color: $blue;
        width: 50%;
      }
      li {
        a {
          color: $white;
        }

        a:hover {
          color: $dark_blue;
        }
      }

    }


    @include media(large) {

      .burger-menu-icon {
        display: none;
      }

      div {
        display: flex;
      }

      ul {
        font-weight: 600;
        width: 50%;
        height: 60px;
        margin-top: -60px;
        margin-right: 20px;
        font-size: larger;
        background-color: $blue;
      }
      li {
        cursor: pointer;
        padding: 0;
        display: table-cell;
        vertical-align: middle;

        a {
          margin: auto;
          width: auto;
          color: white;
          padding: 0;
          position: relative;
          top: 50%;
          transform: translateY(-50%);
        }

        :hover a, a:hover {
          color: $dark_blue;
        }
      }
    }
  }
}

.sub-header {
  display: none;
  z-index: 9;

  @include media(large) {
    padding: 5px 30px;
    display: flex;
    height: 50px;
    justify-content: flex-end;
    background-color: $dark_blue;
  }

  .language-container {
    padding-right: 15px;
    position: relative;
    flex-basis: 5%;
    justify-content: center;

    .language-fit {
      margin: 0;
      position: absolute;
      top: 50%;
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
    }

    @include media(large) {
      display: flex;
      height: 100%;
      justify-content: flex-end;
    }
  }

}

.donate {
  height: 100%;
  display: table;

  div {
    display: table-cell;
    vertical-align: middle;
    cursor: pointer;

    a {
      font-family: 'Roboto Slab', serif;
      font-weight: bold;
      color: $white;
      text-decoration: none;
    }

    img {
      height: 30px;
      padding: 10px 20px 0 20px;
      width: auto;
    }
  }

}

</style>
