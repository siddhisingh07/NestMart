import multer from 'multer'

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, "./public/temp")
    },
    filename : function(req, file, cb){
        cb(null, file.originalname)
    }
})

export const upload = multer({storage})


// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const dir = path.join(process.cwd(), "public", "temp");
//     cb(null, dir);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // unique filename
//   },
// });

// export const upload = multer({ storage });

