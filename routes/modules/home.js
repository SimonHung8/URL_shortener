const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const URL = require('../../models/URL')
const shortenURL = require('../../utilities/shortenURL')

router.get('/', (req, res) => res.render('index'))
router.post('/', body('url').isURL(), (req, res) => {
  // 使用express-validator再次驗證前端送過來的資料
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('error', { invalid: true })
  }

  const originalURL = req.body.url
  if (!req.body.url) return res.redirect('/')
  const shortURL = shortenURL()
  URL.findOne({ originalURL })
    .then(url => {
      // 若已經建立過短網址，回傳原本的短網址，若尚未建立，則回傳新的短網址
      return url ? url : URL.create({ originalURL, shortURL })
    })
    .then(url => {
      res.render('index', { shortURL: url.shortURL, originalURL: url.originalURL })
    })
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})
router.get('/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL
  URL.findOne({ shortURL })
    .then(url => {
      if (!url) return res.render('cannotFind', { shortURL })
      res.redirect(url.originalURL)
    })
    .catch(err => {
      console.log(err)
      res.render('error')
    })
})

module.exports = router