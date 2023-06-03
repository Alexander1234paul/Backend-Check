const { db } = require("../Conexiones/slq");

const GETTest = async (req, res) => {
  try {
    db.query("select * from tbl_tipo_producto", (error, results) => {
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
module.exports = { GETTest };
