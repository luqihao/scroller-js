// import './scroller.css'
export default class Scroller {
  constructor({el, color, radius}) {
    this.ele = document.getElementById(el)
    this.color = color || 'rgba(0, 0, 0, .5)'
    this.radius = radius
    this.draggable = false
    this.type = /INPUT|SELECT|TEXTAREA/i.test(this.ele.nodeName)
    this.init()
  }
  init () {
    if (this.ele.clientHeight < this.ele.scrollHeight) {
      if (!this.type) this.createInsetScroller()
      else this.createOutsetScroller()
    } else {
      console.log('can not create Scroller')
    }
  }
  createOutsetScroller () {
    if (!document.getElementById(`${this.ele.id}-scroller-wrapper`)) {
      let wrapper = document.createElement('div')
      let thumb = document.createElement('div')

      wrapper.appendChild(thumb)
      document.body.appendChild(wrapper)

      wrapper.setAttribute('id', `${this.ele.id}-scroller-wrapper`)
      thumb.setAttribute('id', `${this.ele.id}-scroller-thumb`)

      wrapper.setAttribute('class', 'scroller-wrapper')
      thumb.setAttribute('class', 'scroller-thumb')

      let x = this.ele.getBoundingClientRect().x,
          width = this.ele.getBoundingClientRect().width,
          height = this.ele.getBoundingClientRect().height,
          top = this.ele.getBoundingClientRect().top,
          wrapperWidth = 5
      this.ele.style.resize = 'none'
      wrapper.setAttribute('style', `position: absolute; left: ${x + width - wrapperWidth}px; top: ${top}px; z-index: 10; width: 5px; height: ${height}px; background-color: rgba(0, 0, 0, .1); opacity: 0; transition: opacity 1s;`)
      thumb.setAttribute('style', `background-color: ${this.color}; height: ${this.ele.clientHeight * (this.ele.clientHeight / this.ele.scrollHeight)}px; width: 100%; cursor: pointer;`)

      if (this.radius) thumb.style.borderRadius = '10px'

      this.wrapper = wrapper
      this.thumb = thumb
      this.hover()
      this.scroll()
      this.drag()
      this.change()
    } else {
      this.thumb.style.height = `${this.ele.clientHeight * (this.ele.clientHeight / this.ele.scrollHeight)}px`
    }
  }
  createInsetScroller () {
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
      wrapper.setAttribute('style', 'position: absolute; right: 0; top: 0; z-index: 10; width: 5px; height: 100%; background-color: rgba(0, 0, 0, .1); opacity: 0; transition: opacity 1s;')
      thumb.setAttribute('style', `background-color: ${this.color}; height: ${this.ele.clientHeight * (this.ele.clientHeight / this.ele.scrollHeight)}px; width: 100%; cursor: pointer;`)

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
  change () {
    this.ele.addEventListener('input', () => {
      this.wrapper.style.opacity = '1'
      this.thumb.style.height = `${this.ele.clientHeight * (this.ele.clientHeight / this.ele.scrollHeight)}px`
      this.thumb.style.transform = `translateY(${this.ele.scrollTop / (this.ele.scrollHeight / this.ele.clientHeight)}px)`
    })
  }
  hover (wrapper) {
    this.ele.addEventListener('mouseover', this.mouseover.bind(this), false)
    this.ele.addEventListener('mouseout', this.mouseout.bind(this), false)

    this.wrapper.addEventListener('mouseover', this.mouseover.bind(this), false)
    this.wrapper.addEventListener('mouseout', this.mouseout.bind(this), false)
  }
  mouseover (event) {
    event.preventDefault()
    this.wrapper.style.opacity = '1'
  }
  mouseout (event) {
    // event.preventDefault()
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
      if (!this.type) this.wrapper.style.transform = `translateY(${this.ele.scrollTop}px)`
      this.thumb.style.transform = `translateY(${this.ele.scrollTop / (this.ele.scrollHeight / this.ele.clientHeight)}px)`
    } else if (num === -120 || num === 3) {
      this.ele.scrollTop += this.ele.clientHeight / 10
      if (!this.type) this.wrapper.style.transform = `translateY(${this.ele.scrollTop}px)`
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
      if (!this.type) this.wrapper.style.transform = `translateY(${this.ele.scrollTop}px)`
      this.thumb.style.transform = `translateY(${this.ele.scrollTop / (this.ele.scrollHeight / this.ele.clientHeight)}px)`
      this.mousedownY = event.clientY
    }
  }
  mouseup (event) {
    // event.preventDefault()
    this.draggable = false
    this.mouseout()
  }
}
