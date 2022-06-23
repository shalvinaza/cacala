const express = require("express")
const { pool } = require("../dbConfig")
const cloudinary = require('../utils/cloudinary')

exports.selectPostByAdmin = async (req, res) => {
   try{
      const post = await pool.query(
         "SELECT * from post WHERE id_admin = $1 ORDER BY waktu DESC", [
            req.user
         ]
      )

      res.json(post.rows)
   } catch(err){
      res.json({ message: err })
   }
}

exports.selectPostByUser = async (req, res) => {
   const { id_admin } = req.params
   try{
      const post = await pool.query(
         "SELECT * from post WHERE id_admin = $1 ORDER BY waktu DESC", [
            id_admin
         ]
      )

      res.json(post.rows)
   } catch(err){
      res.json({ message: err })
   }
}