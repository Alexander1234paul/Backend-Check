const { db } = require("../../Conexiones/slq");

/**
 * POSTS
 */

const addCompany = async (req, res) => {
  try {
    const {
      ID_PERSONA,
      CI_RUC,
      NOMBRES,
      APELLIDOS,
      TELEFONO,
      EMAIL,
      DIRECCION,
      RUC,
      RAZON,
      SLOGAN,
      LOGO,
      ID_EMPRESA,
      NOMBREA,
      DIRECCIONA,
      TELEFONOA,
    } = req.body;
    const person = [
      ID_PERSONA,
      CI_RUC,
      NOMBRES,
      APELLIDOS,
      TELEFONO,
      EMAIL,
      DIRECCION,
    ];
    const company = [ID_EMPRESA, ID_PERSONA, RUC, RAZON, SLOGAN, LOGO];
    const store = [ID_EMPRESA, NOMBREA, DIRECCIONA, TELEFONOA];
    db.query(
      "INSERT INTO public.tbl_personas(id_persona, ci_ruc, nombres, apellidos, telefono, email, direccion) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      person,
      (error, results) => {
        if (error) {
          res.send(`{"status":"Error", "resp":${error}}`);
        }

        db.query(
          "INSERT INTO public.tbl_empresas(id_empresa, id_persona, ruc, razon, slogan, logo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
          company,
          (error, results) => {
            if (error) {
              res.send(`{"status":"Error", "resp":${error}}`);
            }
            db.query(
              "INSERT INTO public.tbl_almacenes(id_empresa, nombre, direccion, telefono) VALUES ($1, $2, $3, $4) RETURNING *",
              store,
              (error, results) => {
                if (error) {
                  res.send(`{"status":"Error", "resp":${error}}`);
                }
                res.send(`{"status":"Ok", "resp":"Successful insertions"}`);
                // res.json({ message: "Successful insertions" });
              }
            );
          }
        );
      }
    );
  } catch (error) {
    console.error("Error en la inserción:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getAllAlquiler = (request, response) => {};
module.exports = { addCompany };
