import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthActions, AuthService, IAuthAction } from 'ionic-appauth';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: 'welcome.page.html',
  styleUrls: ['welcome.page.scss'],
})
export class WelcomePage implements OnInit, OnDestroy {
  action: IAuthAction;
  sub: Subscription;

  constructor(private authService: AuthService, private navController: NavController) {}

  ngOnInit() {
    this.sub = this.authService.events$.subscribe((action) => this.onAction(action));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  signIn() {
    this.authService.signIn({ audience: environment.oidcConfig.audience })
      .catch((error) => console.error(`Sign in error: ${error}`));
  }

  private onAction(action: IAuthAction) {
    if (action.action === AuthActions.LoadTokenFromStorageSuccess || action.action === AuthActions.SignInSuccess) {
      this.navController.navigateRoot('/tabs');
    }
  }
}
