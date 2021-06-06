<template>
    <button class="btn-drop btn-flex-box" :class="dropSelected(interval)" @click.prevent="transaction.interval = interval">
        <div v-if="transaction.interval != interval" class="vca-row vca-center btn-icon">
            <div v-for="(drop, index) in drops" :key="index" class="icon-box"><img src="~@/assets/icons/icon_vca.png" /></div>
        </div>
        <div v-else class="vca-row vca-center btn-icon">
            <img v-for="index in drops" :key="index" src="~@/assets/icons/icon_vca_white.png"/>
        </div>
        <span class="btn-amount">{{ $t('interval.' + interval ) }}</span>
    </button>
</template>
<script>
export default {
    name: 'IntervalButton',
    props: {
        interval: {
            type: String,
            default: 'monthly'
        },
        drops: {
            type: Number,
            default: 1
        }
    },
    computed: {
        transaction: {
            get () {
                return this.$store.state.transaction
            },
            set(value) {
                this.$store.commit('transaction', value)
            }
        }
    },
    methods: {
        dropSelected(val) {
            return (this.transaction.interval == val) ? 'btn-drop-selected' : ''
        },
        modulo(index, mod) {
            return ((index + 1) % mod) == 1 
        }
    }
}
</script>
<style lang="scss">


/*
    CSS DROP BUTTON
*/
.btn-drop {
    cursor: pointer;
    background-image: none;
    background-size: contain;
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    border: solid thin transparent;
    font-weight: bold;
    width: 50%;
    text-decoration: none;
    vertical-align: middle;
    color: #008fc2;
    min-height: 200px;
    margin: 0 auto;

    .btn-icon {
        width: max-content;
        flex-basis: 50%;
        margin: auto;
        display: flex;
        flex-wrap: wrap;

        .icon-box {
            flex-basis: 50%;
            display: inline-flex;

            img {
                width: 30px;
                bottom: 0 !important;
                @include media(large) {
                    width: 35px;                
                }
            }
        }
        .icon-box:nth-child(2n + 1) {
            justify-content: flex-end;
        }
        .icon-box:nth-child(2n) {
            justify-content: flex-start;
        }
    }
    span {
        position: relative;
        top: 10px;
        font-size: 1.25em;
    }

}

.btn-drop:hover {
    background-image: url("~@/assets/icons/drop_white_outline.png");
}
.btn-flex-box {
    flex: auto;
    flex-basis: 50% !important;

    @include media(large) {
        flex-basis: 25% !important;
    }

}

.btn-drop-selected,
.btn-drop-selected:hover {
    color: #fff;
    background-image: url("~@/assets/icons/drop.png");
}

</style>