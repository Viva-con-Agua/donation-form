<template>
        <div class="steps-mtg">
            <ul>
                <li v-for="step in steps" :key="step.id" 
                    :class="{
                         'is-active': step.id == currentStep,
                         'mtg': true,
                         'is-inactive': step.id != currentStep, 
                         'last-step': step.id == steps.length, 
                         'first-step': step.id == 1,
                         'behind': step.id > currentStep
                 }">
                    <div class="step-content">
                        <div class="step-id"><div>{{ step.id }}.</div></div>
                        <div class="step-label"><div>{{ step.label }}</div></div>
                    </div>
                </li>
            </ul>
        </div>
</template>
<script>

export default {
    name: 'HeaderSteps',
    props: {
        steps: {
            type: Array,
            default() {
                return [
                    {
                        id: '1',
                        label: ''
                    }
                ]
            }
        },
        currentStep: {
            type: Number,
            default: 1
        }
    }
}
</script>
<style lang="scss">
@function url-friendly-colour($colour) {
    @return '%23' + str-slice('#{$colour}', 2, -1)
}

.mtg-theme {
    h1, h2 {
        color: black !important;
        font-family: 'Poppins', serif !important;
        font-weight: 600 !important;
    }

    h3, h4, h5, a, p, li, div, button, label, input, span {
        font-family: 'Poppins', serif !important;
        font-weight: 200 !important;
    }
    .vca-border {
        border-color: $mtg-main;
    }

    .arr-btn-back {
        color: $mtg-main !important;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="73.8095mm" height="19.3122mm" viewBox="0 0 279 73"><path id="Auswahl" fill="#{url-friendly-colour($mtg-main)}" stroke="#{url-friendly-colour($mtg-main)}" stroke-width="1" d="M 39.00,55.00 C 39.00,55.00 41.00,55.00 41.00,55.00 41.65,53.72 42.56,52.38 42.44,50.86 42.07,46.40 31.82,41.41 28.00,40.00 34.16,38.25 46.14,39.00 53.00,39.00 53.00,39.00 99.00,39.00 99.00,39.00 99.00,39.00 251.00,39.00 251.00,39.00 252.62,39.00 256.18,39.14 257.55,38.43 259.82,37.26 259.82,34.21 256.77,33.10 255.60,32.94 252.35,33.00 251.00,33.10 251.00,33.10 28.00,33.10 28.00,33.10 33.79,29.22 41.78,26.38 43.00,19.00 34.38,19.22 27.07,25.15 20.00,29.68 17.47,31.30 12.39,33.88 14.28,37.64 15.28,39.61 20.03,42.35 22.00,43.58 27.44,46.95 34.59,50.50 39.00,55.00 Z" /></svg>') !important;
    }
    .arr-btn-next {
        color: $mtg-main !important;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="73.8095mm" height="19.3122mm" viewBox="0 0 279 73"><path id="Auswahl" fill="#{url-friendly-colour($mtg-main)}" stroke="#{url-friendly-colour($mtg-main)}" stroke-width="1" d="M 250.00,32.00 C 243.84,33.75 231.86,33.00 225.00,33.08 225.00,33.08 179.00,33.08 179.00,33.08 179.00,33.08 28.00,33.08 28.00,33.08 26.57,33.00 23.41,32.94 22.15,33.08 18.94,34.26 18.88,37.20 21.32,38.40 22.78,39.13 26.30,39.00 28.00,39.00 28.00,39.00  00,39.00 250.00,39.00 250.00,39.00 243.00,43.60 243.00,43.60 240.97,44.84 237.10,46.93 236.17,49.16 235.23,51.42 236.69,53.17 239.06,53.04 241.98,52.88 256.71,43.35 259.98,41.19 262.28,39.67 265.60,37.56 263.92,34.31 262.95,32.43 259.78,30.70 258.00,29.58 258.00,29.58 242.00,19.92 242.00,19.92 236.92,17.58 235.11,20.30 236.17,22.84 237.49,26.01 246.74,30.55 250.00,32.00 Z" /></svg>') !important;
    }
    .arr-btn-next-long {
        color: $mtg-main !important;
        width: 100%;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="193.386mm" height="19.3122mm" viewBox="0 0 731 73"><path id="Auswahl" fill="#{url-friendly-colour($mtg-main)}" stroke="#{url-friendly-colour($mtg-main)}" stroke-width="1" d="M 704.00,33.00 C 697.84,34.75 686.77,34.00 680.00,34.06 680.00,34.06 636.00,34.06 636.00,34.06 636.00,34.06 492.00,34.06 492.00,34.06 492.00,34.06 21.00,34.06 21.00,34.06 19.57,34.00 16.41,33.94 15.15,34.06 11.94,35.26 11.88,38.20 14.32,39.40 15.78,40.13  30,40.00 21.00,40.00 21.00,40.00 704.00,40.00 704.00,40.00 704.00,40.00 697.00,44.20 697.00,44.20 695.06,45.38 691.15,47.60 690.01,49.51 688.81,51.53 689.45,54.27 692.15,54.27 694.22,54.27 697.25,52.13 699.00,51.05 702.48,48.89 715.48,41.74 716.92,38.80 718.39,35.81 716.14,33.84 713.94,32.23 713.94,32.23 698.00,22.32 698.00,22.32 696.19,21.22 692.76,18.78 690.60,20.12 688.22,21.60 689.80,24.55 691.29,25.96 694.14,28.64 700.25,31.82 704.00,33.00 Z" /></svg>') !important;
    }
    .btn-drop {
        color: $mtg-main !important;
        width: 100%;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="21.1667mm" height="27.6014mm" viewBox="0 0 250 326"><path id="Auswahl" fill="black" stroke="black" stroke-width="1" d="M 0.00,0.00 C 0.00,0.00 0.00,292.00 0.00,292.00 0.00,292.00 46.00,292.00 46.00,292.00 46.00,292.00 46.00,326.00 46.00,326.00 46.00,326.00 204.00,326.00 204.00,326.00 204.00,326.00 204.00,292.00 204.00,292.00 204.00,292.00 250.00,292.00 250.00,292.00 250.00,292.00 250.00,0.00 250.00,0.00 250.00,0.00 0.00,0.00 0.00,0.00 Z M 234.00,16.00 C 234.00,16.00 234.00,275.00 234.00,275.00 234.00,275.00 187.00,275.00 187.00,275.00 187.00,275.00 187.00,310.00 187.00,310.00 187.00,310.00 63.00,310.00 63.00,310.00 63.00,310.00 63.00,275.00 63.00,275.00 63.00,275.00 16.00,275.00 16.00,275.00 16.00,275.00 16.00,16.00 16.00,16.00 16.00,16.00 234.00,16.00 234.00,16.00 Z M 45.00,172.00 C 45.00,172.00 45.00,244.00 45.00,244.00 45.00,244.00 98.00,244.00 98.00,244.00 98.00,244.00 98.00,172.00 98.00,172.00 98.00,172.00 45.00,172.00 45.00,172.00 Z M 152.00,172.00 C 152.00,172.00 152.00,244.00 152.00,244.00 152.00,244.00 205.00,244.00 205.00,244.00 205.00,244.00 205.00,172.00 205.00,172.00 205.00,172.00 152.00,172.00 152.00,172.00 Z" /></svg>') !important;

        .btn-icon {
            display: none;
        }
        span {
            top: -45px !important;
        }

        &.btn-drop-selected {
            color: black !important;
            font-size: 1em;
        }
    }

    .main-color { color: $mtg-main !important; } 
    .primary-light { color: $orange-light !important; }

    .vca-field-label {
        background-image: linear-gradient(180deg, $mtg-main 0, $mtg-main 51%,transparent 0)
    }

    .vca-button {

            color: white;
            background-color: $mtg-main;
            &:hover {
                background-color: $orange-dark;
                border-color: $orange-dark;
            }
     
    }

    .selection-button-box {

        .selection-button {
            color: $mtg-main;
            border-color: $mtg-main;
            &:hover {
                color: $orange-dark;
                border-color: $orange-dark;
            }

            &.selected {
                color: white;
                background-color: $mtg-main;
                &:hover {
                    background-color: $orange-dark;
                    border-color: $orange-dark;
                }
            }
        }

    }
}

.first-step {
    margin-left: 0px;
}

.last-step {
    margin-right: 0px;
}

.behind .step-content {
    right: 0;
    left: 0;
}

/*
    Default CSS
*/

.steps-mtg {
    ul {
        overflow: hidden;
        display: table;
        margin-bottom: 0px;
        padding: 0;
        width: 100%;

        li {
            list-style: none;
            display: table-cell;
            position: relative;
            padding: 6px 16px;
            transition: 0.3s;
            font-size: 1.1em;

            &.is-active {
                background-color: $mtg-main;
                border-color: $mtg-main $mtg-main $mtg-main;
                line-height: 1.2;

                div.step-content {
                    width: 100%;
                    min-height: 75px;
                    height: 100%;
                    text-decoration: none;
                    position: relative;

                    div.step-label {
                        display: table;
                        position: absolute;
                        height: 100%;
                        color: #000;
                        font-size: 1.6em;
                        text-align: left;
                        white-space: break-spaces;
                        padding-left: 10px;
                        
                        display: table;
                        position: absolute;
                        right: 0;
                        top: 0;
                        left: 30%;

                        div {
                            vertical-align: middle;
                            display: table-cell;
                            padding-top: 5px;
                        }
                        @include media(small) {
                            display: none;
                        }
                    }

                    div.step-id {
                        display: table;
                        position: absolute;
                        height: 100%;
                        font-weight: bold;
                        text-align: center;
                     
                        font-size: 1.5em;
                        background-image: url("~@/assets/icons/skull.png");
                        color: #000;
                        background-size: contain;
                        background-position: center; 
                        background-repeat: no-repeat;
                        
                        left: 0;
                        width: 30%;

                        div {
                            vertical-align: top;
                            display: table-cell;
                            padding-top: 5px;    
                            padding-left: 5px;
                            text-align: center;
                            @include media(small) {
                                font-size: .75em;
                            }
                        }

                        @include media(small) {
                            width: 100%;
                        }
                        @include media(1000) {
                            font-size: 1em;
                        }
                    }
                }
            }



            &.is-inactive {
                background-color: $white;
                border-color: $mtg-main $mtg-main $mtg-main;
                line-height: 1.2;

                div.step-content {
                    width: 100%;
                    min-height: 75px;
                    height: 100%;
                    text-decoration: none;
                    position: relative;

                    div.step-label {
                        display: table;
                        position: absolute;
                        height: 100%;
                        color: #000;
                        font-size: 1.2em;
                        text-align: left;
                        white-space: break-spaces;
                        padding-left: 10px;
                        
                        display: table;
                        position: absolute;
                        right: 0;
                        top: 0;
                        left: 30%;

                        div {
                            vertical-align: middle;
                            display: table-cell;
                            padding-top: 5px;
                            @include media(small) {
                                font-size: 1em;
                            }
                        }

                        @include media(small) {
                            display: none;
                        }
                    }

                    div.step-id {
                        display: table;
                        position: absolute;
                        height: 100%;
                        font-weight: bold;
                        text-align: center;
                     
                        font-size: 1.2em;
                        background-image: url("~@/assets/icons/skull.png");
                        color: #000;
                        background-size: contain;
                        background-position: center; 
                        background-repeat: no-repeat;
                        
                        left: 0;
                        width: 30%;

                        div {
                            vertical-align: top;
                            display: table-cell;
                            padding-top: 5px;    
                            padding-left: 5px;
                            text-align: center;
                            @include media(small) {
                                font-size: .75em;
                            }
                        }

                        @include media(small) {
                            width: 100%;
                        }
                        @include media(1000) {
                            font-size: .9em;
                        }
                    }
                }
            }

            div.step-content {
                div.step-label {
                    line-height: 1.2em;
                    white-space: nowrap;
                    &:hover {
                        font-weight: bold;
                    }
                }
            }

        }

    }

}


</style>