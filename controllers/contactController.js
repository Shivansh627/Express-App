const asynchandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all the contacts
//@route Get /api/contacts
//@access private

const getContacts = asynchandler(async (req, res) => {
  const contact = await Contact.find({user_id:req.user.id});
  res.status(200).json(contact);
});

//@desc Get  contacts
//@route Get /api/contacts/:id
//@access private

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
//@access private

const createContact = asynchandler(async (req, res) => {
  // console.log('the body is',req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All Fields are Mandatory !");
  }

  const contact = await Contact.create({
    user_id: req.user.id,
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

//@desc update contacts
//@route put /api/contacts/:id
//@access private

const updateContact = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User don't have permission to update the contacts");
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
//@access private

const deleteContact = asynchandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if(contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("User don't have permission to update the contacts");
  }
  await Contact.deleteOne({id:req.params.id})
  res.status(200).json(contact);
});



module.exports = {
  getContacts,
  createContact,
  getContact,
  deleteContact,
  updateContact,
};
// 1:35:30