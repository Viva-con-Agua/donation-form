<template>
    <div class="vca-right ssl-certs">
        <img
            class="trans"
            :alt="$t('ssl.transparent')"
            :title="$t('ssl.transparent')"
            src="~@/assets/img/ssl/Transparente_ZivilgesellschaftPNG.png"
        />
        <img
            class="ssl"
            :alt="$t('ssl.ssl')"
            :title="$t('ssl.ssl')"
            src="~@/assets/img/ssl/ssl-icon.svg"
        />
    </div>
</template>
<script>
export default {
    name: "Certificates",
};
</script>
<style lang="scss">
.ssl-certs {
    img.ssl {
        width: 41px;
        height: 41px;
    }
    img.trans {
        width: 150px;
        height: 41px;
    }
}
</style>
