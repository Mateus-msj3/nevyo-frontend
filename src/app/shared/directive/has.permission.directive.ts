import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "../../core/services/auth.service";

@Directive({
  selector: '[appHasPermission]',
  standalone: false
})
export class HasPermissionDirective {

  private requiredRoles: string[] = [];

  constructor(
    private readonly authService: AuthService,
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainer: ViewContainerRef
  ) {}

  @Input()
  set appHasPermission(roles: string[]) {
    this.requiredRoles = roles;
    this.updateView();
  }

  private updateView(): void {
    if (this.authService.hasPermission(this.requiredRoles)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
