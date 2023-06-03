const { db } = require("../../Conexiones/slq");

/**
 * POSTS
 */

const addTest = async (req, res) => {
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

const addPerson = async (req, res) => {
  try {
    const { CI_RUC, NOMBRES, APELLIDOS, TELEFONO, EMAIL, DIRECCION } = req.body;
    const person = [CI_RUC, NOMBRES, APELLIDOS, TELEFONO, EMAIL, DIRECCION];

    db.query(
      "INSERT INTO public.tbl_personas(ci_ruc, nombres, apellidos, telefono, email, direccion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      person,
      (error, results) => {
        if (error) {
          res.status(200).json({ message: error });
        } else {
          res.status(200).json(results.rows);
        }
      }
    );

    res.json({ message: "Successful insertions" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const addCompany = async (req, res) => {
  try {
    const { ID_PERSONA, RUC, RAZON, SLOGAN, LOGO } = req.body;
    if (ID_PERSONA === undefined) {
      res
        .status(400)
        .json({ message: "Bad resquest. Please fill all fields." });
    }
    const company = [ID_PERSONA, RUC, RAZON, SLOGAN, LOGO];

    db.query(
      "INSERT INTO public.tbl_empresas(id_persona, ruc, razon, slogan, logo) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      company,
      (error, results) => {
        if (error) {
          res.status(200).json({ message: error });
        } else {
          res.status(200).json(results.rows);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const addStore = async (req, res) => {
  try {
    const { ID_EMPRESA, NOMBRE, DIRECCION, TELEFONO } = req.body;
    if (ID_EMPRESA === undefined) {
      res
        .status(400)
        .json({ message: "Bad resquest. Please fill all fields." });
    }
    const store = [ID_EMPRESA, NOMBRE, DIRECCION, TELEFONO];

    db.query(
      "INSERT INTO public.tbl_almacenes(id_empresa, nombre, direccion, telefono) VALUES ($1, $2, $3, $4) RETURNING *",
      store,
      (error, results) => {
        if (error) {
          res.status(200).json({ message: error });
        } else {
          res.status(200).json(results.rows);
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

/**
 * GETS
 */

const GETTest = async (req, res) => {
  try {
    db.query("select * from tbl_tipo_productos", (error, results) => {
      if (error) {
        res.status(200).json({ message: error });
      } else {
        res.status(200).json(results.rows);
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getAllAlquiler = (request, response) => {};
module.exports = { GETTest, addPerson, addCompany, addTest };
