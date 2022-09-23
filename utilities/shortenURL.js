function shortenURL() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
  let result = ''
  for (let i = 0; i < 5; i++) {
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)]
    result += randomCharacter
  }
  return result
}

module.exports = shortenURL