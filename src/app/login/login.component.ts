import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string;
  password: string;
  // Hides password
  hide = true;

  budget = null;

  private _$destroy: Subject<boolean> = new Subject();

  constructor(public authService: AuthService, private router: Router) {}

  public ngOnInit() {
    this.authService.user.pipe(takeUntil(this._$destroy)).subscribe((user) => {
      if (user && user.uid !== null) {
        this.router.navigate(['charts']);
      }
    });
  }

  public ngOnDestroy() {
    this._$destroy.next();
    this._$destroy.complete();
  }

  signup() {
    this.authService.signup(this.email, this.password);
  }

  login() {
    this.authService.login(this.email, this.password);
  }

  logout() {
    this.authService.logout();
  }
}
