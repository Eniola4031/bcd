const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../bin/dbConnection");
class OTP extends Model {}
OTP.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    otp: DataTypes.STRING,
    expiration_time: DataTypes.DATE,
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    sequelize,
    modelName: "OTP",
  }
);
module.exports = { OTP };
