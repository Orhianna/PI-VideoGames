const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID, //id alfanumerico
      defaultValue: DataTypes.UUIDV4, //integer
      allowNull: false,
      primaryKey: true,
      
    },
   
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    description: {
      type: DataTypes.STRING, //text
      allowNull: false,
    },
    
    released: {
      type: DataTypes.DATEONLY, //STRING //DATEONLY
      allowNull: true, // no son obligatorias
      
    },
    
    rating: {
      type: DataTypes.FLOAT, //FLOATnumber fijarse bien, ya que de la api viene como decimal
      allowNull: true, // no son obligatorias
      
    },
    
    plataforms: {
      type: DataTypes.ARRAY(DataTypes.STRING), //DataTypes.STRING, //array de objetos DataTypes.ARRAY(DataTypes.STRING)
      allowNull: false,
    },

    background_image:{

      type: DataTypes.STRING,
      

    },

    createdVideoGame: { //esta propiedad me sirve para consultar solo aquellos juegos creados en mi base de datos
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }


  });
};

//ID: * No puede ser un ID de un videojuego ya existente en la API rawg
//Nombre *
//Descripción *
//Fecha de lanzamiento
//Rating
//Plataformas *