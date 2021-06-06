<template>
    <div class="nav-btn-box">
        <div class="nav-buttons" :class="{single: !showNext || !showBack}">
            <button class="nav-btn-back" v-if="showBack" :disabled="!backEnabled" @click.prevent="back">{{ getBack }}</button>
            <button class="nav-btn-next" v-if="showNext" :disabled="!nextEnabled" @click.prevent="$emit('next')">{{ getNext }}</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ArrowNavigation',
    props: {
        showNext: {
            type: Boolean,
            default: true
        },
        nextEnabled: {
            type: Boolean,
            default: true
        },
        nextLabel: {
            type: String,
            default: null
        },
        showBack: {
            type: Boolean,
            default: true
        },
        backEnabled: {
            type: Boolean,
            default: true
        },
        backLabel: {
            type: String,
            default: null
        }
    },
    computed: {
        getNext() {
            return this.nextLabel ? this.nextLabel : this.$t('buttons.next')
        },
        getBack() {
            return this.backLabel ? this.backLabel : this.$t('buttons.back')
        }
    },
    methods: {
        next() {
            this.$emit("next")
        },
        back() {
            this.$emit("back")
        }
    }
}
</script>
<style lang="scss">
    /*
    CSS NAVIGATION BUTTON
*/
.nav-btn-box {
    width: 85%;
    margin: auto;
    display: flex;


    .single {
        display: block !important;

        .nav-btn-back {
            float: left;
            @include media(large) {
                float: none;
            }
        }

    }

    .nav-buttons {
        flex: auto;
        flex-basis: 100%;
        margin-bottom: 1em;
        text-align: right;
        display: flex;

        @include media(large) {
            display: block;
        }

        .nav-btn-next {
            flex-basis: 50%;
            background-image: url("~@/assets/icons/arrow_right.png");
            @include media(large) {
                margin-left: 50px;
            }
        }
        .nav-btn-next:hover {
            transition: .3s;
            background-image: url("~@/assets/icons/arrow_right_hover.png");
        }

        .nav-btn-next:disabled:hover,
        .nav-btn-next:disabled {
            transition: .3s;
            background-image: url("~@/assets/icons/arrow_right_disabled.png");
        }

        .nav-btn-back {
            flex-basis: 50%;
            background-image: url("~@/assets/icons/arrow_left.png");
            @include media(large) {
                margin-right: 50px;
            }
        }
        .nav-btn-back:disabled:hover,
        .nav-btn-back:disabled {
            transition: .3s;
            background-image: url("~@/assets/icons/arrow_left_disabled.png");
        }
        .nav-btn-back:hover {
            transition: .3s;
            background-image: url("~@/assets/icons/arrow_left_hover.png");
        }

        button {
            cursor: pointer;
            white-space: nowrap;
            height: auto;
            width: auto;
            background: #fff;
            color: $vca-main;
            padding: 0.5em 1.2em;
            border: 0;
            font-weight: bold;
            text-decoration: none;
            background-size: contain;
            background-position: bottom;
            padding-bottom: 25px;
            background-repeat: no-repeat;

            @include media(large) {
                white-space: nowrap;
                font-size: 1.5em;
            }

        }

        button:hover {
            transition: .3s;
            color: $vca-primary-dark;
        }

        button:disabled {
            background-color: #fff;
            color: $vca-main;
            opacity: 0.3;
            cursor: default;
        }

    }

}

</style>