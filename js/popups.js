// // GSAP는 CDN에서 로드되므로 전역 객체 사용
// gsap.registerPlugin(ScrollTrigger)
// gsap.registerPlugin(Draggable)

// // 먼저 box를 표시하고 초기 위치 설정
// gsap.set('.box', {
//   display: 'block',
//   yPercent: -50,
// })

// const STAGGER = 0.18  // 박스 간 간격을 간결하게
// const DURATION = 1.5  // 애니메이션 지속 시간을 더 길게
// const OFFSET = 0
// const BOXES = gsap.utils.toArray('.box')

// const LOOP = gsap.timeline({
//   paused: true,
//   repeat: -1,
//   ease: 'none',
// })

// const SHIFTS = [...BOXES, ...BOXES, ...BOXES]

// SHIFTS.forEach((BOX, index) => {
//   const BOX_TL = gsap
//     .timeline()
//     .set(BOX, {
//       xPercent: 220,  // 시작 위치를 간결하게
//       rotateY: -50,
//       opacity: 0,
//       scale: 0.5,  // 시작 스케일을 작게
//     })
//     // Opacity && Scale - 중앙에 올 때 최대 크기
//     .to(
//       BOX,
//       {
//         opacity: 1,
//         scale: 1.0,  // 중앙에서 적당한 크기
//         duration: 0.2,
//       },
//       0
//     )
//     .to(
//       BOX,
//       {
//         opacity: 0,
//         scale: 0.5,  // 양옆으로 갈 때 작아짐
//         duration: 0.2,
//       },
//       0.8
//     )
//     // Panning - 간격을 간결하게
//     .fromTo(
//       BOX,
//       {
//         xPercent: 220,  // 시작 위치 (간결한 간격)
//       },
//       {
//         xPercent: -270,  // 끝 위치 (간결한 간격)
//         duration: DURATION,
//         immediateRender: false,
//         ease: 'power2.inOut',
//       },
//       0
//     )
//     // Rotations - 중앙에서 0도, 양옆으로 갈수록 회전
//     .fromTo(
//       BOX,
//       {
//         rotateY: -50,
//       },
//       {
//         rotateY: 50,
//         immediateRender: false,
//         duration: DURATION,
//         ease: 'power2.inOut',
//       },
//       0
//     )
//     // Scale && Z - 중앙에서 최대 크기
//     .to(
//       BOX,
//       {
//         z: 100,  // z값 조정
//         scale: 1.1,  // 중앙에서 약간만 크게 (겹치지 않도록)
//         duration: 0.2,
//         repeat: 1,
//         yoyo: true,
//       },
//       0.5  // 중앙 지점에서 최대 크기
//     )
//     .fromTo(
//       BOX,
//       {
//         zIndex: 1,
//       },
//       {
//         zIndex: BOXES.length,
//         repeat: 1,
//         yoyo: true,
//         ease: 'none',
//         duration: 0.5,
//         immediateRender: false,
//       },
//       0
//     )
//   LOOP.add(BOX_TL, index * STAGGER)
// })

// const CYCLE_DURATION = STAGGER * BOXES.length
// const START_TIME = CYCLE_DURATION + DURATION * 0.5 + OFFSET

// const LOOP_HEAD = gsap.fromTo(
//   LOOP,
//   {
//     totalTime: START_TIME,
//   },
//   {
//     totalTime: `+=${CYCLE_DURATION}`,
//     duration: 1,
//     ease: 'none',
//     repeat: -1,
//     paused: true,
//   }
// )

// const PLAYHEAD = {
//   position: 0,
// }

// const POSITION_WRAP = gsap.utils.wrap(0, LOOP_HEAD.duration())

// const SCRUB = gsap.to(PLAYHEAD, {
//   position: 0,
//   onUpdate: () => {
//     LOOP_HEAD.totalTime(POSITION_WRAP(PLAYHEAD.position))
//   },
//   paused: true,
//   duration: 0.5,  // 스크럽 속도를 더 부드럽게
//   ease: 'power2.out',  // 더 부드러운 easing
// })

// let iteration = 0
// const TRIGGER = ScrollTrigger.create({
//   trigger: '.popup',
//   start: 'top top',
//   end: '+=5000',  // 스크롤 길이를 더 길게 (더 천천히 넘어가도록)
//   horizontal: false,
//   pin: '.boxes',
//   onUpdate: self => {
//     const SCROLL = self.scroll()
//     if (SCROLL > self.end - 1) {
//       // Go forwards in time
//       WRAP(1, 1)
//     } else if (SCROLL < 1 && self.direction < 0) {
//       // Go backwards in time
//       WRAP(-1, self.end - 1)
//     } else {
//       const NEW_POS = (iteration + self.progress) * LOOP_HEAD.duration()
//       SCRUB.vars.position = NEW_POS
//       SCRUB.invalidate().restart()
//     }
//   },
//   onEnter: () => {
//     // 초기 상태 설정 - 첫 번째 박스가 보이도록
//     if (BOXES.length > 0 && iteration === 0 && PLAYHEAD.position === 0) {
//       const INITIAL_POS = START_TIME
//       LOOP_HEAD.totalTime(INITIAL_POS)
//       PLAYHEAD.position = INITIAL_POS
//       SCRUB.vars.position = INITIAL_POS
//       SCRUB.invalidate().restart()
//     }
//   }
// })

// const WRAP = (iterationDelta, scrollTo) => {
//   iteration += iterationDelta
//   TRIGGER.scroll(scrollTo)
//   TRIGGER.update()
// }

// const SNAP = gsap.utils.snap(1 / BOXES.length)

// const progressToScroll = progress =>
//   gsap.utils.clamp(
//     1,
//     TRIGGER.end - 1,
//     gsap.utils.wrap(0, 1, progress) * TRIGGER.end
//   )

// const scrollToPosition = position => {
//   const SNAP_POS = SNAP(position)
//   const PROGRESS =
//     (SNAP_POS - LOOP_HEAD.duration() * iteration) / LOOP_HEAD.duration()
//   const SCROLL = progressToScroll(PROGRESS)
//   if (PROGRESS >= 1 || PROGRESS < 0) return WRAP(Math.floor(PROGRESS), SCROLL)
//   TRIGGER.scroll(SCROLL)
// }

// ScrollTrigger.addEventListener('scrollEnd', () =>
//   scrollToPosition(SCRUB.vars.position)
// )

// // 한 페이지씩 정확히 넘어가도록
// const NEXT = () => {
//   const currentProgress = (iteration + TRIGGER.progress) % 1
//   const currentIndex = Math.floor(currentProgress * BOXES.length)
//   const nextIndex = (currentIndex + 1) % BOXES.length
//   const targetProgress = nextIndex / BOXES.length
//   const targetScroll = targetProgress * TRIGGER.end
//   TRIGGER.scroll(targetScroll)
// }

// const PREV = () => {
//   const currentProgress = (iteration + TRIGGER.progress) % 1
//   const currentIndex = Math.floor(currentProgress * BOXES.length)
//   const prevIndex = (currentIndex - 1 + BOXES.length) % BOXES.length
//   const targetProgress = prevIndex / BOXES.length
//   const targetScroll = targetProgress * TRIGGER.end
//   TRIGGER.scroll(targetScroll)
// }

// document.addEventListener('keydown', event => {
//   if (event.code === 'ArrowLeft' || event.code === 'KeyA') PREV()
//   if (event.code === 'ArrowRight' || event.code === 'KeyD') NEXT()
// })

// document.querySelector('.boxes').addEventListener('click', e => {
//   const BOX = e.target.closest('.box')
//   if (BOX) {
//     let TARGET = BOXES.indexOf(BOX)
//     let CURRENT = gsap.utils.wrap(
//       0,
//       BOXES.length,
//       Math.floor(BOXES.length * SCRUB.vars.position)
//     )
//     let BUMP = TARGET - CURRENT
//     if (TARGET > CURRENT && TARGET - CURRENT > BOXES.length * 0.5) {
//       BUMP = (BOXES.length - BUMP) * -1
//     }
//     if (CURRENT > TARGET && CURRENT - TARGET > BOXES.length * 0.5) {
//       BUMP = BOXES.length + BUMP
//     }
//     scrollToPosition(SCRUB.vars.position + BUMP * (1 / BOXES.length))
//   }
// })

// window.BOXES = BOXES

// document.querySelector('.next').addEventListener('click', NEXT)
// document.querySelector('.prev').addEventListener('click', PREV)

// // Dragging
// // let startX = 0
// // let startOffset = 0

// // const onPointerMove = e => {
// //   e.preventDefault()
// //   SCRUB.vars.position = startOffset + (startX - e.pageX) * 0.001
// //   SCRUB.invalidate().restart() // same thing as we do in the ScrollTrigger's onUpdate
// // }

// // const onPointerUp = e => {
// //   document.removeEventListener('pointermove', onPointerMove)
// //   document.removeEventListener('pointerup', onPointerUp)
// //   document.removeEventListener('pointercancel', onPointerUp)
// //   scrollToPosition(SCRUB.vars.position)
// // }

// // // when the user presses on anything except buttons, start a drag...
// // document.addEventListener('pointerdown', e => {
// //   if (e.target.tagName.toLowerCase() !== 'button') {
// //     document.addEventListener('pointermove', onPointerMove)
// //     document.addEventListener('pointerup', onPointerUp)
// //     document.addEventListener('pointercancel', onPointerUp)
// //     startX = e.pageX
// //     startOffset = SCRUB.vars.position
// //   }
// // })

// gsap.set('button', {
//   z: 200,
// })

// Draggable.create('.drag-proxy', {
//   type: 'x',
//   trigger: '.boxes',
//   onPress() {
//     this.startOffset = SCRUB.vars.position
//   },
//   onDrag() {
//     SCRUB.vars.position = this.startOffset + (this.startX - this.x) * 0.0005  // 드래그 감도를 낮춤
//     SCRUB.invalidate().restart() // same thing as we do in the ScrollTrigger's onUpdate
//   },
//   onDragEnd() {
//     scrollToPosition(SCRUB.vars.position)
//   },
// })

// // 초기 상태 설정 - 첫 번째 박스가 보이도록
// if (BOXES.length > 0) {
//   const INITIAL_POS = START_TIME
//   LOOP_HEAD.totalTime(INITIAL_POS)
//   PLAYHEAD.position = INITIAL_POS
//   SCRUB.vars.position = INITIAL_POS
//   SCRUB.invalidate().restart()
// }

// // ScrollTrigger 새로고침
// ScrollTrigger.refresh()





