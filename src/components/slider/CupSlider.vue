<template>
    <div class="cupslide">
        <div class="images-container">
        <div class="images">
            <div  v-for="index in max_cups" :key="index" class="images_empty">
                <img v-if="index > full" src="@/assets/img/slider/cups/leeres_Glas.svg" @click="setCupAmount(index)"/>
                <img v-if="index <= full" src="@/assets/img/slider/cups/volles_Glas.svg" @click="setCupAmount(index)"/>
            </div>
        </div>
    </div>
    <div class="count">
    <input type="range" :min="min_slider" :max="max_slider" :value="money.amount" :step="steps" @input="setAmount">
    </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'CupSlider',
    data () {
        return {
            value: 0,
            empty: 0,
            full: 0
        }
    },
    computed: {
        ...mapGetters({
           slider: 'form/slider'
        }),
        steps() {
            return this.slider ? this.slider.steps : 100
        },
        min_slider() {
            return this.slider ? this.slider.min : 100
        },
        max_slider() {
            return this.slider ? this.slider.max : 50000
        },
        max_cups() {
            return this.slider ? this.slider.max / 1000 : 10
        },
        money: {
            get () {
                return this.$store.state.payment.money
            },
            set(value) {
                this.$store.commit('payment/money', value)
            }
        }
    },
    created() {
        var mask = parseInt(this.money.amount / 1000)
        this.full = mask
        this.empty = 10 - mask
    },
    methods: {
        setAmount (e) {
            var mask = parseInt(e.target.value / 1000)
            this.full = mask
            this.empty = 10 - mask

            this.money = { amount: parseInt(e.target.value), currency: this.money.currency }
        },
        setCupAmount (val) {
            var mask = parseInt(val)
            this.full = mask
            this.empty = 10 - mask
            this.money = { amount: parseInt(val * 1000), currency: this.money.currency }
        }
    }
}
</script>
<style>
.cupslide input {
    width: 100%;
    box-shadow: none;
}
.images {
    /*display: flex;
    flex-direction: row;*/
    white-space: nowrap;
    width: 100%;
    display: table;
}
.images_empty, .images_full {
    display: table-cell;

}

.images_full img {
    padding: 5px;
    width: 100%;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;


}
.images_empty img {
    padding: 5px;
    width: 100%;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;


}
.count {
    width: 100%;
}

.count img {
    width: 100%;
    padding: 5px;
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;
}
.count input[type=range] {
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;
}



</style>
