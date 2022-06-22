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

// exports.addPost = async (req, res) => {
//    try{
//       // const fotos = []

//       // for(let i = 0; i<req.foto.length; i++){
//       //    fotos.push(req.foto[i].filename)
//       // }

//       const { judul } = req.body
//       const { teks } = req.body
//       const { foto } = fotos
//       const { video } = req.video

//       const post = await pool.query(
//          "INSERT INTO post(id_admin, judul, teks, foto, video) VALUES($1, $2, $3, $4, $5) RETURNING *",
//          [req.user, judul, teks, foto, video]
//       )

//       res.json(post)
//    } catch(err) {
//       console.error(err.message)
//    }
// }

exports.updatePost = async (req, res) => {
   try{
      const { id_post } = req.params

      await cloudinary.uploader.destroy(post.cloudinary_id)

      const uploadedFoto = await cloudinary.uploader.upload(req.file.path)

      const { judul } = req.body || post.judul
      const { teks } = req.body || post.teks
      const foto = uploadedFoto.secure_url || post.foto
      const id_foto = uploadedFoto.public_id || post.id_foto
      const { video } = req.body

      const post = await pool.query(
         "UPDATE post SET judul = $1, teks = $2, foto = $3, id_foto = $4, video = $5 WHERE id_post = $6", [
            judul, teks, foto, id_foto, video, id_post
         ]
      )

      res.json("Post is updated")
   } catch (err) {
      res.json({ message: err })
   }
}

exports.deletePost = async (req, res) => {
   try{
      const { id_post } = req.params

      await cloudinary.uploader.destroy(post.cloudinary_id)

      const post = await pool.query(
         "DELETE FROM post WHERE id_post = $1", [
            id_post
         ]
      )

      res.json("Post is deleted")
   } catch (err) {
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

// exports.addImage = async (req, res) => {
//    try{
//       const { id_post } = req.body
//       const { foto } = req.body
//       const { video } = req.body

//       const postImage = await pool.query(
//          "INSERT INTO images(id_post, foto, video) VALUES($1, lo_import($2), lo_import($3)) RETURNING *",
//          [id_post, foto, video]
//       )

//       res.json(postImage)
//    } catch(err) {
//       console.error(err.message)
//    }
// }