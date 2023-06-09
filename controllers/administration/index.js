const { db } = require("../../Conexiones/slq");

/**
 * GETS
 */

const getAllRoles = async (req, res) => {
  try {
    db.query(
      "SELECT * FROM tbl_roles",
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
 * POSTS
 */

const postTest = async (req, res) => {
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

const postCompany = async (req, res) => {
  try {
    const {
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
      NOMBREA,
      DIRECCIONA,
      TELEFONOA,
    } = req.body;

    await db.query("BEGIN");
    const queryPerson = `INSERT INTO tbl_personas(ci_ruc, nombres, apellidos, telefono, email, direccion) 
                          VALUES ($1, $2, $3, $4, $5, $6) RETURNING id_persona`;
    const person = [CI_RUC, NOMBRES, APELLIDOS, TELEFONO, EMAIL, DIRECCION];
    const resultPerson = await db.query(queryPerson, person);
    const ID_PERSONA = resultPerson.rows[0].id_persona;

    const queryCompany = `INSERT INTO tbl_empresas(id_persona, ruc, razon, slogan, logo) 
                          VALUES ($1, $2, $3, $4, $5) RETURNING id_empresa`;
    const company = [ID_PERSONA, RUC, RAZON, SLOGAN, LOGO];
    const resultCompany = await db.query(queryCompany, company);
    const ID_EMPRESA = resultCompany.rows[0].id_empresa;

    const queryStore = `INSERT INTO tbl_almacenes(id_empresa, nombre, direccion, telefono) VALUES ($1, $2, $3, $4)`;
    const store = [ID_EMPRESA, NOMBREA, DIRECCIONA, TELEFONOA];
    await db.query(queryStore, store);

    await db.query("COMMIT");

    res.json({ mensaje: "Registro exitoso" });
  } catch (error) {
    await db.query("ROLLBACK"); // Revertir la transacción en caso de error

    // Respuesta de error
    res.status(500).json({ error: "Error en el registro: " + error.message });
  }
};

const postRol = async (req, res) => {
  try {
    const { ROL } = req.body;
    db.query("INSERT INTO tbl_roles(rol) VALUES($1)", [ROL], (error, results) => {
      if (error) {
        res.send(`{"status":"Error", "resp":${error}}`);
      } else {
        res.send(`{"status":"Ok", "resp":"Successful insertions"}`);
        // res.json({ message: "Successful insertions" });
      }
    }
    );
  } catch (error) {
    console.error("Error en la inserción:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

/**
 * PUTS
 */

const updateRol = async (req, res) => {
  try {
    const { ID_ROL, ROL } = req.body;
    db.query("UPDATE tbl_roles SET rol=$1 WHERE id_rol=$2", [ROL, ID_ROL], (error, results) => {
      if (error) {
        res.send(`{"status":"Error", "resp":${error}}`);
      } else {
        res.send(`{"status":"Ok", "resp":"Successful update"}`);
        // res.json({ message: "Successful insertions" });
      }
    }
    );
  } catch (error) {
    console.error("Error en la actualización:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}
/**
 * DELETES
 */

const deleteRolById = async (req, res) => {
  try {
    const { ID_ROL } = req.params;
    db.query("DELETE FROM tbl_roles WHERE id_rol=$1", [ID_ROL],
      (error, results) => {
        if (error) {
          console.error('Error en la eliminación', error);
          res.status(500).json({ error: 'Error en la eliminación' });
        } else {
          res.status(200).json({ message: 'Registro eliminado correctamente' });
        }
      }
    );
  } catch (error) {
    console.error("Error en la eliminación:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
}

module.exports = { getAllRoles, postCompany, postRol, updateRol, deleteRolById };
