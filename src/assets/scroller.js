import './scroller.css'
export default class Scroller {
  constructor({el, color, radius}) {
    this.ele = document.getElementById(el)
    this.color = color
    this.radius = radius
    this.draggable = false
    this.init()
  }
  init () {
    if (this.ele.clientHeight < this.ele.scrollHeight) {
      this.createScroller()
    } else {
      console.log('can not create Scroller')
    }
  }
  createScroller () {
    if (!document.getElementById(`${this.ele.id}-scroller-wrapper`)) {
      let wrapper = document.createElement('div')
      let thumb = document.createElement('div')

      wrapper.appendChild(thumb)
      if (this.ele.firstChild) {
        this.ele.insertBefore(wrapper, this.ele.firstChild)
      }

      wrapper.setAttribute('id', `${this.ele.id}-scroller-wrapper`)
      thumb.setAttribute('id', `${this.ele.id}-scroller-thumb`)

      wrapper.setAttribute('class', 'scroller-wrapper')
      thumb.setAttribute('class', 'scroller-thumb')

      this.ele.setAttribute('style', 'position: relative;')
      thumb.setAttribute('style', `background-color: ${this.color}; height: ${this.ele.clientHeight * (this.ele.clientHeight / this.ele.scrollHeight)}px`)

      if (this.radius) thumb.style.borderRadius = '10px'

      this.wrapper = wrapper
      this.thumb = thumb
      this.hover()
      this.scroll()
      this.drag()
    } else {
      this.thumb.style.height = `${this.ele.clientHeight * (this.ele.clientHeight / this.ele.scrollHeight)}px`
    }
  }
  hover () {
    this.ele.addEventListener('mouseover', this.mouseover.bind(this), false)
    this.ele.addEventListener('mouseout', this.mouseout.bind(this), false)
  }
  mouseover (event) {
    event.preventDefault()
    this.wrapper.style.opacity = '1'
  }
  mouseout (event) {
    event.preventDefault()
    if (!this.draggable) this.wrapper.style.opacity = '0'
  }
  scroll (clientHeight, scrollHeight) {
    this.ele.addEventListener('mousewheel', this.mousewheel.bind(this), false)
    this.ele.addEventListener('DOMMouseScroll', this.mousewheel.bind(this), false)
  }
  mousewheel (event) {
    event.preventDefault()
    let num = event.wheelDelta || event.detail
    if (num === 120 || num === -3) {
      this.ele.scrollTop -= this.ele.clientHeight / 10
      this.wrapper.style.transform = `translateY(${this.ele.scrollTop}px)`
      this.thumb.style.transform = `translateY(${this.ele.scrollTop / (this.ele.scrollHeight / this.ele.clientHeight)}px)`
    } else if (num === -120 || num === 3) {
      this.ele.scrollTop += this.ele.clientHeight / 10
      this.wrapper.style.transform = `translateY(${this.ele.scrollTop}px)`
      this.thumb.style.transform = `translateY(${this.ele.scrollTop / (this.ele.scrollHeight / this.ele.clientHeight)}px)`
    }
  }
  drag () {
    this.thumb.addEventListener('mousedown', this.mousedown.bind(this), false)
    window.addEventListener('mousemove', this.mousemove.bind(this), false)
    window.addEventListener('mouseup', this.mouseup.bind(this), false)
  }
  mousedown (event) {
    event.preventDefault()
    this.draggable = true
    this.mousedownY = event.clientY
  }
  mousemove (event) {
    event.preventDefault()
    if (this.draggable) {
      let distance = event.clientY - this.mousedownY
      this.ele.scrollTop += distance * (this.ele.scrollHeight / this.ele.clientHeight)
      this.wrapper.style.transform = `translateY(${this.ele.scrollTop}px)`
      this.thumb.style.transform = `translateY(${this.ele.scrollTop / (this.ele.scrollHeight / this.ele.clientHeight)}px)`
      this.mousedownY = event.clientY
    }
  }
  mouseup (event) {
    event.preventDefault()
    this.draggable = false
    this.mouseout()
  }
}
