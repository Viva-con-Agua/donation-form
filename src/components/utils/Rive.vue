<template>
  <div>
    <canvas ref="canvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script>
import { Rive, Layout } from 'rive-js'

export default {
  name: 'Rive',
  props: {
    fit: String,
    alignment: String,
    width: String,
    height: String,
    src: String,
    input: Number
  },
    data () {
        return {
          riveInstance: null,
          riveInput: null,
        }
    },
    computed: {
    },
    
  watch: {
    input: function(newVal) {
      this.riveInput.value = newVal;
    }
  },
  mounted() {
    this.riveInstance = new Rive({
        canvas: this.$refs.canvas,
        src: this.$props.src,
        layout: new Layout({
            fit: this.$props.fit,
            alignment: this.$props.alignment,
        }),
        stateMachines: 'default',
        autoplay: true,
        onLoad: () => {
            console.log('Rive loaded');
            const inputs = this.riveInstance.stateMachineInputs('default');
            this.riveInput = inputs.find(i => i.name === 'input');
            this.riveInput.value = this.$props.input
        },
    });
    console.log(this.riveInstance.stateMachineInputs('Default'))
  }
}
</script>