const express = require('express');
const Contact = require('../../models/contacts');
const { contactValidation, favoriteValidation } = require("../../validations/validation")
const router = express.Router();

// PATCH: update the 'favorite' status of a contact
router.patch('/contacts/:contactId/favorite', async (req, res) => {
  const { contactId } = req.params;
  const { favorite } =req.body;

  // Validate favorite field
  const { error } = favoriteValidation.validate({ favorite });
  if (error) {
    return res.status(400).json({ message: 'missing or invalid field favorite' });
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

// GET: this is to get all contacts
router.get('/', async (_req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Get a contact by ID
router.get('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);

    if(!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Add a new contact
router.post('/', async (req, res) => {
  // Validate the contact data
  const { error } = contactValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Invalid contact data' });
  }
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete a contact by ID
router.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Update a contact by ID
router.put('/:contactId', async (req, res) => {
  const {contactId} = req.params;

  // Validate the contact data
  const { error } = contactValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: 'Invalid contact data' });
  }
  
  try {
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router
