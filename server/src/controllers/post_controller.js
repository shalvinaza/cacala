const express = require("express")
const { pool } = require("../dbConfig")
const multer= require("multer")

const app = express()

const storage = multer.diskStorage({
   destination: function(req, file, cb){
      cb(null, 'uploads/');
   },
   filename: function(req, file, cb){
      cb(null, new Date().toISOString() + file.originalname);
   }
});

const fileFilter = function(req, file, cb){
   allowedTypes = ["image/jpeg", "image/png", "image/gif"];

   if(!allowedTypes.includes(file.mimetype)){
      const error = new Error("Hanya dapat mengunggah foto");
      error.code = "LIMIT_FILE_TYPES";
      return cb(error, false);
   }
   cb(null, true);
}

const MAX_SIZE = 200000;

const upload = multer({
   storage:storage,
   fileFilter,
   limits: {
      fileSize: MAX_SIZE
   }
})

app.use(function(err, req, res, next){
   if(err.code === "LIMIT_FILE_TYPES"){
      res.status(422).json({error: "Hanya boleh memilih gambar"});
      return;
   }

   if(err.code === "LIMIT_FILE_SIZE"){
      res.status(422).json({error: `File terlalu besar. Besar file maksimal ${MAX_SIZE / 1000}Kb`});
      return;
   }
})

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

exports.addPost = upload.array('foto'), async (req, res) => {
   try{
      const fotos = []

      for(let i = 0; i<req.foto.length; i++){
         fotos.push(req.foto[i].filename)
      }

      const { judul } = req.body
      const { teks } = req.body
      const { foto } = fotos
      const { video } = req.video

      const post = await pool.query(
         "INSERT INTO post(id_admin, judul, teks, foto, video) VALUES($1, $2, $3, $4, $5) RETURNING *",
         [req.user, judul, teks, foto, video]
      )

      res.json(post)
   } catch(err) {
      console.error(err.message)
   }
}

exports.updatePost = async (req, res) => {
   try{
      const { id_post } = req.params
      const { judul } = req.body
      const { teks } = req.body
      const { foto } = req.body
      const { video } = req.body

      const post = await pool.query(
         "UPDATE post SET judul = $1, teks = $2, foto = $3, video = $4 WHERE id_post = $5", [
            judul, teks, foto, video, id_post
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

exports.addImage = async (req, res) => {
   try{
      const { id_post } = req.body
      const { foto } = req.body
      const { video } = req.body

      const postImage = await pool.query(
         "INSERT INTO images(id_post, foto, video) VALUES($1, lo_import($2), lo_import($3)) RETURNING *",
         [id_post, foto, video]
      )

      res.json(postImage)
   } catch(err) {
      console.error(err.message)
   }
}