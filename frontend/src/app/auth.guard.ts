import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean {
		return this.isUserLoggedIn();
	}

	public isUserLoggedIn(): boolean {
		console.log("guard ",this.authService.getLoggedIn())
		if (this.authService.getLoggedIn()) {
			return true;
		 }

		this.router.navigateByUrl('/');
		return false;
	}
}
