import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SessaoService } from '../servicos/sessao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  dataRow = {
    NM_ENTIDADE: '',
    CD_USUARIO: '',
    HS_SENHA: ''
  }

  alias: string | null = ''
  mensagem: string = ''
  loading: boolean = false

  @ViewChild('aviso') aviso !: ElementRef

  constructor(private sessao: SessaoService, private acRoute: ActivatedRoute, private router: Router) { }

  async ngOnInit() {
    this.alias = this.acRoute.snapshot.paramMap.get('alias')

    if (this.alias) {
      let data = await this.sessao.consultarEntidade(this.alias)

      if (data.sucesso) {
        this.dataRow.NM_ENTIDADE = data.NM_ENTIDADE
      }
      else {
        this.mensagem = data.mensagem
        this.aviso.nativeElement.showModal()
      }
    } else {
      this.mensagem = 'Alias da entidade não fornecido.'
      this.aviso.nativeElement.showModal()
    }
  }

  async loginUsuario() {

    this.loading = true

    try {
      let data = await this.sessao.loginUsuario(this.dataRow)

      if (data.sucesso) {
        this.router.navigate([`${this.alias}/index`])
      }
      else {
        this.mensagem = data.mensagem
        this.aviso.nativeElement.showModal()
      }
    }
    catch (err) {
      this.mensagem = 'Falha na conexão! Favor verifique sua rede de internet.'
      this.aviso.nativeElement.showModal()
    }
    finally {

      this.loading = false

    }
  }

  fecharAviso() {
    this.aviso.nativeElement.close()
    this.mensagem = ''
  }
}

