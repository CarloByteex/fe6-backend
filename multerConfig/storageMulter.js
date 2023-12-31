const multer = require('multer')

// storage config

const storage = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        const filename = `${Date.now()}.${file.originalname}`
        callback(null,filename)
    }
})

// filter file

// const fileFilter =  (req,file,callback)=>{
//     if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
//         callback(null,true)
//     }
//     else{
//         callback(null,false)
//         return callback(new Error('Only .png .jpeg .jpg format are allowed!!'))
//     }
// }

const upload = multer({
    storage:storage
})

module.exports = upload
