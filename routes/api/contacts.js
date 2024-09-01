const express = require('express');
const Contact = require('../../models/contacts');
const router = express.Router();

router.patch('/contacts/:contactId/favorite', async (req, res) => {
  const { contactId } = req.params;
  const { favorite } =req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: 'missing field favorite' });
  }
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {favorite},
      {new: true}
    );

    if (!updatedContact) {
      return res.status(404).json({message: 'Not found'});
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.get('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
