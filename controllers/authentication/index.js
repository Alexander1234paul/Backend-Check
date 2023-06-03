const { db } = require("../../Conexiones/slq");

/**
 * POSTS
 */

const login = async (req, res) => {
    try {
      const { user, password } = req.body;
      const credentials = [user, password];
  
      const results = await db.query("SELECT * FROM public.tbl_usuarios where id=?");
  
      if (results.rows.length === 0) {
        // No se encontraron usuarios en la base de datos
        return res.status(404).json({ status: "Error", resp: "Usuario no encontrado" });
      }
  
      if (results.rows[0].id === user) {
        // Lógica en caso de que las credenciales coincidan
      } else {
        // Lógica en caso de que las credenciales no coincidan
      }
  
      console.log(results.rows[0].id);
    } catch (error) {
      res.status(500).json({ status: "Error", resp: error.message });
    }
  };
  

const register = async (req, res) => {
  try {
    const { id, password } = req.body;

  } catch (error) {
    console.error("Error en la inserción:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
module.exports = { login, register };
