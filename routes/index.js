const CRGS = require('crgs')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

module.exports = (app) => {
  const node =  new CRGS()

  app.post('/file', upload.single('file'), async (req, res, next) => {
    await node.ready

    if (!req.file) {
      return res.status(400).send({ message: '400' })
    }

    const file = await node.add(req.file.buffer)
    return res.send(file)
  })

  app.get('/file', async (req, res, next) => {
    await node.ready

    try {
      const stream = node.catReadableStream(req.query.id)
      stream.on('error', () => res.status(404).send({ message: 'Not found' }))
      stream.pipe(res)
    } catch(err) {
      return res.status(404).send({ message: 'Not found' })
    }
  })
}
