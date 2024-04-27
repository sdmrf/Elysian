// Imports
import { NextFunction, Request, Response } from "express";

// Controllers
const getUsers = async (req, res) => {
    res.send('Get all users');
}

const getUser = async (req, res) => {
    res.send('Get a user');
}

const createUser = async (req, res) => {
    res.send('Create a user');
}

const updateUser = async (req, res) => {
    res.send('Update a user');
}

const deleteUser = async (req, res) => {
    res.send('Delete a user');
}

export { getUsers, getUser, createUser, updateUser, deleteUser };