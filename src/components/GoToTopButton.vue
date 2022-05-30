<template>
  <div>
    <button type="button" class="btnfixed" v-show="exibe" @click="scrollToTop">
      &uArr;
    </button>
  </div>
</template>

<script>
export default {
  name: "GoToTopButton",
  data() {
    return {
      exibe: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scrollFunction, true);
  },
  beforeDestroy(){
    window.removeEventListener("scroll", this.scrollFunction, true);
  },
  methods: {
    scrollFunction() {
      const limite = 500;

      if (
        document.body.scrollTop > limite ||
        document.documentElement.scrollTop > limite
      ) {
        this.exibe = true;
      } else {
        this.exibe = false;
      }
    },

    scrollToTop() {
      const c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(this.scrollToTop);
        window.scrollTo(0, c - c / 8);
      }
    },
  },
};
</script>

<style>
.animated {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
  border: none !important;
}

@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animatedOut {
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
  border: none !important;
}

@-webkit-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.btnfixed {
  position: fixed;
  width: 3rem;
  height: 3rem;
  bottom: 2rem;
  right: 3rem;
  z-index: 10;
  border: none ;
  outline: none;
  background-color: rgb(223, 16, 16);
  opacity: 0.8;
  color: #FFF;
  border-radius: 50%;
  font-size: 1.5rem;
  transition: background-color 2s ease;
}

</style>
