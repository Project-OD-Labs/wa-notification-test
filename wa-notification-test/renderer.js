const axios = require('axios')
const cron = require('node-cron')

let apiKey

document.getElementById('loginForm').addEventListener('submit', (event) => {
  event.preventDefault()
  apiKey = document.getElementById('apiKey').value
  if (apiKey) {
    document.getElementById('loginForm').style.display = 'none'
    document.getElementById('messageScheduler').style.display = 'block'
  }
})

document.getElementById('scheduleForm').addEventListener('submit', (event) => {
  event.preventDefault()
  const recipient = document.getElementById('recipient').value
  const message = document.getElementById('message').value
  const time = document.getElementById('time').value

  const [hours, minutes] = time.split(':').map(Number)
  const schedule = `${minutes} ${hours} * * *`

  cron.schedule(schedule, () => {
    window.electron.sendMessage(apiKey, recipient, message)
  })
})
