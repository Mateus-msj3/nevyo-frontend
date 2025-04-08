import { Injectable } from '@angular/core';
import {Configuration} from "../models/configuration";
import {BehaviorSubject, Observable} from "rxjs";
import {ConfigurationService} from "../../pages/configurations/configuration.service";

@Injectable({
  providedIn: 'root'
})
export class UserConfigurationService {

  private readonly configSubject = new BehaviorSubject<Configuration | null>(null);

  config$ = this.configSubject.asObservable(); // Expondo o BehaviorSubject como Observable para inscrição

  constructor(private readonly configService: ConfigurationService) {}

  // Método para carregar configurações do usuário
  loadConfiguration(userId: string): void {
    this.configService.findByUser(userId).subscribe((config: Configuration) => {
      this.configSubject.next(config);
    });
  }

  // Método para obter as configurações como um Observable
  getConfiguration(): Observable<Configuration | null> {
    return this.configSubject.asObservable();
  }

  // Método para acessar o valor atual das configurações
  getCurrentConfiguration(): Configuration | null {
    return this.configSubject.value;
  }

  updateConfig(newConfig: Configuration): void {
    this.configSubject.next(newConfig); // Emite o novo valor da configuração
  }
}
