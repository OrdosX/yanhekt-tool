// ==UserScript==
// @name         延河课堂播放增强
// @namespace    https://www.ordosx.tech/
// @version      1.5
// @description  视频列表内一大节只显示一个链接，点击视频空白处切换播放暂停，左右方向键控制5秒快进快退，上下方向键切换2倍速和原速，数字键1和2切换单双屏
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
  async function waitUntilExist (selectors) {
    while (!document.querySelector(selectors)) {
      await (new Promise(resolve => setTimeout(resolve, 20)))
    }
  }
  async function main () {
    await waitUntilExist('.player-panel')
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
      switch (e.key) {
        case 'ArrowLeft': // 左方向键快退五秒
          e.preventDefault()
          mainPlayerVideo.currentTime -= 5
          break
        case 'ArrowRight': // 右方向键快进5秒
          e.preventDefault()
          mainPlayerVideo.currentTime += 5
          break
        case 'ArrowUp': // 上方向键2倍速
          e.preventDefault()
          document.querySelectorAll('video').forEach((e) => { e.playbackRate = 2 })
          break
        case 'ArrowDown': // 下方向键原速
          e.preventDefault()
          document.querySelectorAll('video').forEach((e) => { e.playbackRate = 1 })
          break
        case ' ': // 空格暂停
          e.preventDefault()
          pauseButton.click()
          break
        case '1': // 切换单屏（摄像头画面）
          e.preventDefault()
          singleScreen.click()
          break
        case '2': // 切换双屏（摄像头画面和PPT）
          e.preventDefault()
          dualScreen.click()
          break
      }
    }
    await waitUntilExist('.video-list-content li')
    document.querySelectorAll('.video-list-content li').forEach(e => {
      if (!e.nextSibling) return
      const [week, day, rawPeriod] = e.textContent.split(' ')
      const [sWeek, sDay, sRawPeriod] = e.nextSibling.textContent.split(' ')
      const period = parseInt(rawPeriod.match(/[0-9]+/)[0])
      const sPeriod = parseInt(sRawPeriod.match(/[0-9]+/)[0])
      if (week === sWeek && day === sDay && period - sPeriod === 1) {
        e.hidden = true
      }
    })
  }
})()
