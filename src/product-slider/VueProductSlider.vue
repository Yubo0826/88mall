<template>
    <div
        class="vps"
        ref="vps"
    >
        <div class="vps__wrapper" ref="vpsWrapper">
            <div class="vps__slides" ref="slider">
                <slot name="slider"/>
            </div>

            <div class="vps__controls"
                 v-if="_showControls"
            >
                <div class="vps__controls__prev" @click="prev">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </div>

                <div class="vps__controls__next" @click="next">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>

        <div
            class="vps__thumbnails"
            ref="thumbnails"
        >
            <slot name="thumbnails"/>
        </div>
    </div>
</template>

<script>

import Swipe from "./swipe";

export default {
    props: {
        showControls: {
            type: [Boolean, String],
            default: true,
        },
        
    },
    data() {
        return {
            isTouch: typeof window !== "undefined" && "ontouchstart" in window,
            dragging: false,
            dragMomentum: 0,
            dragOffset: 0,
            dragStartY: 0,
            dragStartX: 0,


            offset: 0,
            slider_element: null,
            thumbnails_element: null,

            swipe: null,

        }
    },

    computed: {
        _showControls() {
            if (this.showControls == 'false' || this.slides.length <= 1) {
                return false;
            }
            return true;
        },

        slides() {
            if (this.slider_element) {
                return this.slider_element.getElementsByClassName('slide');
            }

            return [];
        },

        thumbnails() {
            if (this.thumbnails_element) {
                return this.thumbnails_element.getElementsByClassName('thumb');
            }

            return [];
        },
    },
    methods: {
        init() {
            this.slider_element = this.$refs.slider;
            this.thumbnails_element = this.$refs.thumbnails;

            if (this.thumbnails.length > 0
                && this.slides.length != this.thumbnails.length
            ) {
                console.error('Slide vs thumbnails count is not the same')
            }

            this.toggleSlide(0)


            let self = this;
            this.swipe = new Swipe(this.$refs.vpsWrapper, {
                startSlide: 0,
                auto: false,
                draggable: true,
                continuous: true,
                disableScroll: false,
                stopPropagation: false,
                ignore: ".scroller",
                callback: function(index) {
                    self.toggleSlide(index)
                },
                transitionEnd: function() {}
            });



            this.bindEvents()

        },
        bindEvents() {
            let self = this;

            for (let i = 0; i < this.thumbnails.length; i++) {
                let thumb = this.thumbnails[i];

                thumb.addEventListener('click', function() {
                    self.swipe.slide(i);
                });
            }
        },

        toggleSlide(offset) {

            for(let i = 0; i < this.slides.length; i++) {
                let elem = this.slides[i];
                if (elem.classList.contains('active')) {
                    elem.classList.remove('active');
                }
            }

            this.slides[offset].classList.toggle('active')
            this.offset = offset;
            this.toggleTumbnail(offset)
        },

        next() {
            this.swipe.next();
        },

        prev() {
            this.swipe.prev();
        },

        toggleTumbnail(offset) {

            if (!this.thumbnails.length) {
                return;
            }

            for(let i = 0; i < this.thumbnails.length; i++) {
                let elem = this.thumbnails[i];
                if (elem.classList.contains('active')) {
                    elem.classList.remove('active');
                }
            }

            this.thumbnails[offset].classList.toggle('active')
        }

    },

    // BUG: 用mounted函數就this.slide是空的
    updated() {
        this.$nextTick(() => {
            this.init();
        })

    },
}
</script>

<style>
    @import './swipe.css';
</style>
