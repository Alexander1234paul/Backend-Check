const GETTest = async (req, res) => {
    try {
      res.status(200).json({ message: "Hola mundo" });
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor" });
    }
  };
module.exports={GETTest}