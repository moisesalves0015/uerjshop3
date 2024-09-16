import { Schema, model, models } from "mongoose";

// Definição do esquema
const WorkSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true // Adicione `required` se necessário
  },
  category: {
    type: String,
    required: true // Adicione `required` se necessário
  },
  title: {
    type: String,
    required: true // Adicione `required` se necessário
  },
  description: {
    type: String
  },
  whatsapp: {
    type: Number,
    required: true // Adicione `required` se necessário
  },
  price: {
    type: Number,
    required: true // Adicione `required` se necessário
  },
  workPhotoPaths: [{
    type: String
  }]
}, { timestamps: true }); // Adiciona timestamps para createdAt e updatedAt

// Criação do modelo
const Work = models.Work || model("Work", WorkSchema);

export default Work;
