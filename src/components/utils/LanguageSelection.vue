<template>
  <div class="language-selection" :title="$t('language.title')">
    <div class="flag-cont" :class="{flagInactive: (language != lang)}" v-for="(lang, index) in languages" :key="index" @click="changeLanguage(lang)">
      <span v-if="language == lang" class="flag-icon" :class="currentFlag"></span>
      <div v-else>
          <span class="flag-icon" :class="flag(lang)"></span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LanguageSelection',
  data() {
    return {
      languages: ['de', 'ch', 'gb'],
      language: localStorage.language
    }
  },
  computed: {
    currentFlag() {
      return "flag-icon-" + this.$i18n.locale
    }
  },
  created() {
    if (localStorage.language === undefined) {
      localStorage.language = this.$i18n.locale.toLowerCase()
    } else {
      this.$i18n.locale = localStorage.language
    }
  },
  methods: {
    changeLanguage(language)  {
      localStorage.language = language
      this.$i18n.locale = language
      this.language = language
      this.notification({title: "Language Change", body: "Language set to " + language, type: "success"})
    },
    flag(lang) {
      return 'flag-icon-' + lang
    }
  }
};
</script>
<style lang="scss">
  .language-selection {
    .flag-cont {
      display: inline-block;
      cursor: pointer;
      font-size: 1.2em;
      margin: 0 3px;
    }
    .flagInactive {
      font-size: .7em;
    }
  }
</style>