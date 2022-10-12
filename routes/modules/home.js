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
  let shortURL = shortenURL()
  URL.find()
    .then(urls => {
      const existedOriginal = urls.find(url => url.originalURL === originalURL)
      if (existedOriginal) {
        return existedOriginal
      }
      while (urls.some(url => url.shortURL === shortURL)) {
        shortURL = shortenURL()
      }
      return URL.create({ originalURL, shortURL })
    })
    .then(url => {
      return res.render('index', { shortURL: url.shortURL, originalURL: url.originalURL })
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