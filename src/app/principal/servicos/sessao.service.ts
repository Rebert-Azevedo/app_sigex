import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {
  private url = environment.API + 'entidades/'
  private headers = {
    TOKEN: environment.TOKEN,
    "Content-Type":"application/json"
  }

  private ID_ENTIDADE = 0
  private ID_USUARIO = 0

  public NM_ENTIDADE = ''
  public NM_USUARIO = ''

  constructor() { }

  async consultarEntidade(alias:any){

    let request = await fetch(this.url + alias + '/consultar', {
      method: "GET",
      headers: this.headers
    })

    let data = await request.json()

    if(data.sucesso){
      this.ID_ENTIDADE = data.ID_ENTIDADE
      this.NM_ENTIDADE = data.NM_ENTIDADE
    }

    return data
  }

  async loginUsuario(dataRow:object){

    let request = await fetch(this.url + this.ID_ENTIDADE + '/login', {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(dataRow)
    })

    let data = await request.json()

    if(data.sucesso){
      this.ID_USUARIO = data.ID_USUARIO
      this.NM_USUARIO = data.NM_USUARIO
    }

    return data
  }
}
