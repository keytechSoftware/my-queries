import { Routes, RouterModule } from "@angular/router";

import { ServerInfoComponent } from "./server-info/server-info.component";
import { MyQueriesComponent } from './search/my-queries/my-queries.component';
import { ElementInfoComponent } from "./element-info/element-info.component";
import { AuthGuard } from "./shared/auth.guard";
import { LoginComponent } from "./login/login.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/server-info', pathMatch: 'full' },
    { path: 'server-info', component: ServerInfoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'element-info', component: ElementInfoComponent, canActivate: [AuthGuard] },
    { path: 'my-queries', component: MyQueriesComponent, canActivate: [AuthGuard] }
];

export const routing = RouterModule.forRoot(APP_ROUTES, { useHash: true }); // Support for Browser Refresh
