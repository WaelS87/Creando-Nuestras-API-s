const db = require("../database/models");
const sequelize = db.sequelize;

const genresController = {
  list: async (req, res) => {
    try {
      let genres = await db.Genre.findAll({
        order: ["name"],
        attributes: {
          exclude: ["created_at", "updated_at"],
        },
      });
      if (genres.length) {
        return res.status(200).json({
          ok: true,
          meta: {
            total: genres.length,
          },
          data: genres,
        });
      }
      throw new Error({
        ok: false,
        msg: "hubo un error",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: error.message
          ? error.message
          : "comunica con elcontralador del sitio"
      });
    }
  },

  detail:async (req, res) => {
         try {
            const{id}=req.params;
            if(isNaN(id)){
                throw new Error(`el id tiene que ser un numero : este ${id} is not number`)}
            let genre = await db.Genre.findByPk(req.params.id,{
                attributes:{
                    exclude:['created_at','updated_at']
                }
            })
            if (genre) {
                return res.status(200).json({
                  ok: true,
                  meta: {
                   status:200
                  },
                  data: genre,
                });
            }
            throw new Error(`no exicte el id :${req.params.id}`)
        }

            catch (error) {
            console.log(error)
            return res.status(500).json({
                ok: false,
                msg: error.message
                  ? error.message
                  : "comunica con elcontralador del sitio"
              });
            
         }
   
  },
};

module.exports = genresController;
