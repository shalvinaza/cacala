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

// exports.deletePost = async (req, res) => {
//    try{
//       const { id_post } = req.params

//       await cloudinary.uploader.destroy(post.cloudinary_id)

//       const post = await pool.query(
//          "DELETE FROM post WHERE id_post = $1", [
//             id_post
//          ]
//       )

//       res.json("Post is deleted")
//    } catch (err) {
//       res.json({ message: err })
//    }
// }

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
exports.selectPostById = async (req, res) => {
   const {id_post} = req.params
   try{
      const post = await pool.query(
         "select * from post where id_post = $1", [
         id_post
      ])

      res.json(post.rows)
   } catch(err) {
      res.json({ message: err })
   }
}