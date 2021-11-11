// ==UserScript==
// @name         延河课堂播放增强
// @namespace    https://www.ordosx.tech/
// @version      1.3
// @description  点击视频空白处切换播放暂停，左右方向键控制5秒快进快退，上下方向键切换2倍速和原速
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
    const mainPlayerVideo = document.querySelector('.main-player video')
    const playerPanel = document.querySelector('.player-panel')
    const playerMask = document.querySelector('.player-mask')
    const pauseButton = document.querySelector('.controller-panel .head-container button')
    if (!(mainPlayerVideo && playerPanel && playerMask)) {
      setTimeout(main, 20)
    } else {
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
        }
      }
    }
  }
})()
