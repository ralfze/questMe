import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { KeycloakService } from './services/keycloak.service';
import { KeycloakBearerInterceptor } from './interceptors/keycloak-bearer.interceptor';
import * as i0 from "@angular/core";
export class CoreModule {
}
CoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: CoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: CoreModule, imports: [CommonModule] });
CoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: CoreModule, providers: [
        KeycloakService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: KeycloakBearerInterceptor,
            multi: true
        }
    ], imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.1.0", ngImport: i0, type: CoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        KeycloakService,
                        {
                            provide: HTTP_INTERCEPTORS,
                            useClass: KeycloakBearerInterceptor,
                            multi: true
                        }
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9rZXljbG9hay1hbmd1bGFyL3NyYy9saWIvY29yZS9jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV6RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sNENBQTRDLENBQUM7O0FBYXZGLE1BQU0sT0FBTyxVQUFVOzt1R0FBVixVQUFVO3dHQUFWLFVBQVUsWUFWWCxZQUFZO3dHQVVYLFVBQVUsYUFUVjtRQUNULGVBQWU7UUFDZjtZQUNFLE9BQU8sRUFBRSxpQkFBaUI7WUFDMUIsUUFBUSxFQUFFLHlCQUF5QjtZQUNuQyxLQUFLLEVBQUUsSUFBSTtTQUNaO0tBQ0YsWUFSUSxDQUFDLFlBQVksQ0FBQzsyRkFVWixVQUFVO2tCQVh0QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsU0FBUyxFQUFFO3dCQUNULGVBQWU7d0JBQ2Y7NEJBQ0UsT0FBTyxFQUFFLGlCQUFpQjs0QkFDMUIsUUFBUSxFQUFFLHlCQUF5Qjs0QkFDbkMsS0FBSyxFQUFFLElBQUk7eUJBQ1o7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgTWF1cmljaW8gR2VtZWxsaSBWaWdvbG8gYW5kIGNvbnRyaWJ1dG9ycy5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9tYXVyaWNpb3ZpZ29sby9rZXljbG9hay1hbmd1bGFyL0xJQ0VOU0VcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBLZXljbG9ha1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2tleWNsb2FrLnNlcnZpY2UnO1xuaW1wb3J0IHsgS2V5Y2xvYWtCZWFyZXJJbnRlcmNlcHRvciB9IGZyb20gJy4vaW50ZXJjZXB0b3JzL2tleWNsb2FrLWJlYXJlci5pbnRlcmNlcHRvcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBLZXljbG9ha1NlcnZpY2UsXG4gICAge1xuICAgICAgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsXG4gICAgICB1c2VDbGFzczogS2V5Y2xvYWtCZWFyZXJJbnRlcmNlcHRvcixcbiAgICAgIG11bHRpOiB0cnVlXG4gICAgfVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIENvcmVNb2R1bGUge31cbiJdfQ==