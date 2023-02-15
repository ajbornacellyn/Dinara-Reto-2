import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Animal from 'App/Models/Animal'

export default class AnimalsController {
  public async setRegistrarAnimal({request, response}: HttpContextContract){
    const dataAnimal = request.only(["codigo_animal","nombre_animal", "especie", "raza", "genero", "edad"])
    try {
      const codigoanimal = dataAnimal.codigo_animal;
      const animalExistente: Number = await this.getValidarAnimalExistente(codigoanimal)
      console.log(animalExistente)
      if (animalExistente == 0) {
        await Animal.create(dataAnimal)
        response.status(200).json({"msg": "animal registrado con exito!"})
      }else{
        response.status(400).json({"msg": "codigo del animal ya se encuentra registrado!"})
      }
    } catch (e) {
      console.log(e)
      response.status(500).json({"msg": "error en el servidor !!"})
    }
  }
    public async getValidarAnimalExistente(codigo_animal: Number): Promise<Number> {
      const total = await Animal.query().where({"codigo_animal":codigo_animal}).count("*").from("animals")
      return parseInt(total[0]['count(*)'])
    }

    public async getAnimales({response}: HttpContextContract){
      try {
        const animales = await Animal.all()
        response.status(200).json(animales)
      } catch (e) {
        console.log(e)
        response.status(500).json({"msg": "error en el servidor !!"})
      }
    }

    public async buscarPorEspecie({request, response}: HttpContextContract){
      const especie = request.param("especie")
      console.log(especie)
      try {
        const animales = await Animal.query().where({"especie":especie})
        response.status(200).json(animales)
      } catch (e) {
        console.log(e)
        response.status(500).json({"msg": "error en el servidor !!"})
      }
    }

    public async buscarMenor({request, response}: HttpContextContract){
      try {
        const animales = await Animal.query().where("edad", "<", 8)
        response.status(200).json(animales)
      } catch (e) {
        console.log(e)
        response.status(500).json({"msg": "error en el servidor !!"})
      }
    }

    public async actualizarAnimal({request, response}: HttpContextContract){
      const id = request.param("codigo");
      const user = request.all();
      await Animal.query().where('codigo_animal', id).update({
        nombre_animal: user.nombre_animal,
        especie: user.especie,
        raza: user.raza,
        genero: user.genero,
        edad: user.edad
      });
    return("Registro actualizado");

    }

    public async eleiminarAnimal({request, response}: HttpContextContract){
      const id = request.param("codigo");
      await Animal.query().where('codigo_animal', id).delete();
      return("Registro eliminado");
    }
}
