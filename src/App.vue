<template>
  <div id="app">
    <ul class="scroll" id="scroller">
      <li>1</li>
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
      <li>7</li><li>8</li><li>9</li><li>10</li><li>11</li><li>12</li>
    </ul>
    <textarea id="textarea" name="name" rows="8" cols="80">
      1
      2
      3
      4
      5
      6
      7
      8
      9
      10
      11
      12
      13
      14
      15
      16
      17
      18
      19
      20
      21
      22
      23
      24
      25
      26
      27
      28
      29
      30
    </textarea>
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
    // this.scroller = new Scroller({
    //   el: 'scroller',
    //   color: 'rgb(55, 155, 255)',
    //   radius: true
    // })
    this.scroller = new Scroller({
      el: 'textarea',
      color: 'rgb(55, 155, 255)',
      radius: true
    })
    setTimeout(() => {
      document.getElementById('scroller').style.maxHeight = '300px'
    }, 5000)
    // console.log(document.getElementById('scroller').scrollHeight)
    // console.log(document.getElementById('scroller').offsetHeight)
    // console.log(document.getElementById('scroller').clientHeight)
    // console.log(document.getElementById('scroller').clientTop)
    // console.log(document.getElementById('scroller').scrollTop)
    // console.log(document.getElementById('scroller').offsetTop)
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
textarea {
  max-height: 200px;
  overflow: hidden;
}
</style>
