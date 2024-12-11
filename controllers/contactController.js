const asynchandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all the contacts
//@route Get /api/contacts
//@access public

const getContacts = asynchandler(async (req, res) => {
  const contact = await Contact.find();
  res.status(200).json(contact);
});

//@desc Get  contacts
//@route Get /api/contacts/:id
//@access public

const getContact = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc create contacts
//@route post /api/contacts
//@access public

const createContact = asynchandler(async (req, res) => {
  // console.log('the body is',req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All Fields are Mandatory !");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

//@desc update contacts
//@route put /api/contacts/:id
//@access public

const updateContact = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedContact= await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new : true}
  );

  res.status(200).json(updatedContact);
});

//@desc delete contacts
//@route delete /api/contacts/:id
//@access public

const deleteContact = asynchandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
});



module.exports = {
  getContacts,
  createContact,
  getContact,
  deleteContact,
  updateContact,
};
