<template>
  <div id="app">
    <ul class="scroll" id="scroller" v-html="msg">
      <!-- {{msg}} -->
    </ul>
  </div>
</template>

<script>
import Scroller from './assets/scroller.js'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    this.scroller = new Scroller({
      el: 'scroller',
      color: 'rgb(55, 155, 255)',
      radius: true
    })
    // console.log(document.getElementById('scroller').scrollHeight)
    // console.log(document.getElementById('scroller').offsetHeight)
    // console.log(document.getElementById('scroller').clientHeight)
    // console.log(document.getElementById('scroller').clientTop)
    // console.log(document.getElementById('scroller').scrollTop)
    // console.log(document.getElementById('scroller').offsetTop)
    // setTimeout(() => {
    //   document.getElementById('scroller').innerHTML +=
    //   `<li>1</li>
    //   <li>2</li>
    //   <li>3</li>
    //   <li>4</li>
    //   <li>5</li>
    //   <li>6</li>
    //   <li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li>`
    //   this.scroller.reset()
    // }, 2000)
    setTimeout(() => {
      this.msg = `<li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li>`
      this.$nextTick(() => {
        this.scroller.init()
      })
    }, 2000)
    setTimeout(() => {
      this.msg = `<li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li>`
      this.$nextTick(() => {
        this.scroller.init()
      })
    }, 4000)
    setTimeout(() => {
      this.msg = `<li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li><li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
      <li>5</li>
      <li>6</li>
      <li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li>`
      this.$nextTick(() => {
        this.scroller.init()
      })
    }, 6000)
    // console.log(document.getElementById('scroller').clientHeight / document.getElementById('scroller').scrollHeight)
  }
}
</script>

<style>
ul {
  /* transform: translate(0, 0); */
  border: 1px solid #000;
  max-height: 200px;
  overflow: hidden;
}
</style>
