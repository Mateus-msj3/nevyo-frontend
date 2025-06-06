import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { StoreStateService } from '../../shared/services/store-state.service';
import { firstValueFrom } from 'rxjs';
import { CustomMessageService } from '../../shared/services/custom-message.service';

@Injectable({
  providedIn: 'root'
})
export class StoreSelectedGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly storeStateService: StoreStateService,
    private readonly router: Router,
    private readonly customMessageService: CustomMessageService
  ) {}

  async canActivate(): Promise<boolean> {
    const hasStore = await firstValueFrom(this.storeStateService.hasSelectedStore());

    if (!hasStore) {
      this.customMessageService.showWarning(
        'Seleção de Loja Necessária',
        'Por favor, selecione uma loja para continuar.'
      );
      this.router.navigate(['/select-store']);
      return false;
    }

    return true;
  }

  canActivateChild(): Promise<boolean> {
    return this.canActivate();
  }
}
