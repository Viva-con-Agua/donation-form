<template>
    <div class="cupslide">
        <div class="images-container">
        <div class="images">
            <div  v-for="index in all" :key="index" class="images_empty">
                <img v-if="index > full" src="@/assets/leeres_Glas.svg"/>
                <img v-if="index <= full" src="@/assets/volles_Glas.svg"/>
            </div>
        </div>
    </div>
    <div class="count">
    <img class="count" src="@/assets/Einheiten.svg"/>
    <input type="range" min="0" max="1000" :value="value" step="100" @input="setAmount">
    </div>
    </div>
</template>
<script>
export default {
    name: 'CupSlide',
    data () {
        return {
            value: 0,
            empty: 10,
            all: 10,
            full: 0
        }
    },
    methods: {
        setAmount (e) {
            var mask = parseInt(e.target.value /100)
            this.full = mask
            this.empty = 10 - mask
            this.$emit("amount", parseInt(e.target.value))
        },
        replyAmount (value) {
            this.value = value
            if (value <= 1000) {
                this.full = Math.floor(value / 100)
                this.empty = 10 - Math.floor(value / 100)
            } else {
                this.full = 10
                this.empty = 0
            }
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
