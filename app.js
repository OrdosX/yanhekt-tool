// ==UserScript==
// @name         延河课堂播放增强
// @namespace    https://www.ordosx.tech/
// @version      1.4
// @description  点击视频空白处切换播放暂停，左右方向键控制5秒快进快退，上下方向键切换2倍速和原速，数字键1和2切换单双屏
// @author       OrdosX
// @match        https://www.yanhekt.cn/session/*
// @icon         https://www.google.com/s2/favicons?domain=yanhekt.cn
// @grant        none
// ==/UserScript==

(function () {
  'use strict'
  window.addEventListener('load', () => {
    main()
  })
  const main = () => {
    if (!document.querySelector('.player-panel')) {
      setTimeout(main, 20)
      return
    }
    const playerPanel = document.querySelector('.player-panel')
    const mainPlayerVideo = document.querySelector('.main-player video')
    const playerMask = document.querySelector('.player-mask')
    const pauseButton = document.querySelector('.controller-panel .head-container button')
    const singleScreen = document.querySelector('.tail-container img[alt=\'单屏\']').parentElement
    const dualScreen = document.querySelector('.tail-container img[alt=\'双屏\']').parentElement
    playerPanel.onclick = () => {
      pauseButton.click()
    }
    playerMask.onclick = () => {
      pauseButton.click()
    }
    mainPlayerVideo.onratechange = () => {
      document.querySelector('.playback-rates-text').innerText = `${mainPlayerVideo.playbackRate.toFixed(1)}X`
    }
    document.onkeydown = (e) => {
      e.preventDefault()
      switch (e.key) {
        case 'ArrowLeft': // 左方向键快退五秒
          mainPlayerVideo.currentTime -= 5
          break
        case 'ArrowRight': // 右方向键快进5秒
          mainPlayerVideo.currentTime += 5
          break
        case 'ArrowUp': // 上方向键2倍速
          document.querySelectorAll('video').forEach((e) => { e.playbackRate = 2 })
          break
        case 'ArrowDown': // 下方向键原速
          document.querySelectorAll('video').forEach((e) => { e.playbackRate = 1 })
          break
        case ' ': // 空格暂停
          pauseButton.click()
          break
        case '1': // 切换单屏（摄像头画面）
          singleScreen.click()
          break
        case '2': // 切换双屏（摄像头画面和PPT）
          dualScreen.click()
          break
      }
    }
  }
})()
