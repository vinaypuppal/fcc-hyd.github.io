/*
  global document
 */

export default () => {
  const menuBtn = document.querySelector('.js-menu')
  const menu = document.querySelector('nav ul')
  menuBtn.addEventListener('click', () => {
    console.log('working')
    menuBtn.classList.toggle('open')
    menu.classList.toggle('open')
  })
}
