const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')

const Ticket = require('../models/ticketModel');

const { model } = require('mongoose');

// @desc get user tikets
//@route GET /api/tickets
//@access Private
const getTickets = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }
    const tickets = await Ticket.find({ user: req.user.id })

    res.status(200).json(tickets);
});

// @desc get single user tiket
//@route GET /api/tickets/:id
//@access Private
const getTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    //limit to user
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    res.status(200).json(ticket);
});

// @desc create new ticket
//@route POST /api/tickets
//@access Private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body

    if (!product || !description) {
        res.status(400)
        throw new Error('Please add a product and description')
    }
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json(ticket);
});

// @desc delete single user tiket
//@route DELETE /api/tickets/:id
//@access Private
const deleteTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    //limit to user
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    // this is new
    await ticket.remove()

    res.status(200).json({ success: true });
});

// @desc edit single ticket
//@route PUT /api/tickets/:id
//@access Private
const editTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('user not found')
    }
    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    //limit to user
    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedTicket);
});

module.exports = {
    getTickets,
    createTicket,
    getTicket,
    deleteTicket,
    editTicket
}