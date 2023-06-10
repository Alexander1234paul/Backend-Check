const { db } = require("../../Conexiones/slq");
const { generateToken } = require("../../Helpers/generateToken");
const { encrypt, compare } = require("../../Helpers/handleBcrypt");

/**
 * POSTS
 */

const login = async (req, res) => {
  try {
    const { user, password } = req.body;
    const credentials = [user, password];

    const results = await db.query(
      `SELECT p.ci_ruc,r.rol,u.usuario,u.password 
   FROM public.tbl_usuarios u inner join tbl_roles r on r.id_rol = u.id_rol 
      inner join tbl_personas p on  p.id_persona = u.id_persona
      WHERE usuario =$1`,
      [user]
    );

    console.log(results.rows);
    if (results.rows.length === 0) {
      // No se encontraron usuarios en la base de datos
      return res
        .status(404)
        .json({ status: "Error", resp: "Usuario no encontrado" });
    }

    if (results.rows[0].usuario === user) {
      const hashedPassword = results.rows[0].password;
      // const en = encrypt(hashedPassword);
      const isMatch = await compare(password, hashedPassword);
      if (isMatch) {
        const token = await generateToken(
          results.rows[0].ci_ruc,
          results.rows[0].rol
        );
        console.log(token);
        return res.status(200).json({ status: "Correct", token: token });
      } else {
        return res
          .status(400)
          .json({ status: "Error", resp: "Error de credenciales" });
      }
    } else {
    }
  } catch (error) {
    return res.status(500).json({ status: "Error", resp: error.message });
  }
};

module.exports = { login };
