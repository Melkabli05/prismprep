import type { InterviewCategory } from '../../../../core/models/interview.models';

export const angularCategory: InterviewCategory = {
  id: 'angular',
  title: 'Angular',
  color: 'background: var(--color-error); color: white',
  description: 'Composants, services, routing',
  sections: [
    {
      id: 'ng-fondamentaux',
      title: 'Fondamentaux',
      questions: [
        {
          id: 'ng-1',
          question: "C'est quoi Angular ?",
          answer: "Framework **Google** pour construire des **SPA** en **TypeScript**. Typage statique, autocomplétion IDE, détection d'erreurs à la compilation. Architecture imposée : composants, services, modules, routing intégré.\n\n**CLI** puissant pour la génération et le build. Inclut nativement HTTP client, formulaires, routing, i18n et framework de test. Choix solide pour les applications d'entreprise, malgré une courbe d'apprentissage plus raide que Vue ou React.",
          deepDive: "Angular est un framework complet et non une simple librería. Contrairement à React ou Vue qui se concentrent sur la couche vue, Angular impose une architecture **MDA** (Model-Driven Architecture).\n\n## Architecture complète\n\n**Modules (`NgModule`)** : Chaque application Angular repose sur au moins un root module. Les modules regroupent composants, services et directives liés par fonctionnalité.\n\n**Composants** : L'unité de base de l'UI. Un composant = classe TypeScript + template HTML + styles CSS.\n\n\n**Templates** : Syntaxe HTML enrichie avec du data binding Angular.\n\n\n**Services** : Classes injectables via le système DI d'Angular — logique métier, accès données, état partagé.\n\n## Positionnement dans l'écosystème\n\n| Caractéristique | Angular | React | Vue |\n|---|---|---|---|\n| Langage | TypeScript obligatoire | JS/TSX | JS/Vue SFC |\n| Data binding | Two-way natif | One-way | Two-way optionnel |\n| Routing | Inclus | react-router (tiers) | Vue Router |\n| Courbe d'apprentissage | Élevée | Moyenne | Faible |\n\n## La force d'Angular : l'opinionated approach\n\nLe fait qu'Angular impose une structure rend la vie plus facile sur les gros projets avec beaucoup de développeurs. Les conventions sont partagées, le code est prévisible.",
        },
        {
          id: 'ng-2',
          question: 'Data Binding',
          answer: "Quatre formes de synchronisation modèle↔vue : **interpolation** `{{ expr }}` (modèle→vue), **property binding** `[prop]='val'` (modèle→vue dynamique), **event binding** `(event)='methode()'` (vue→modèle), **two-way binding** `[(ngModel)]='val'` (bidirectionnel, idéal pour les formulaires).\n\nPrivilégier le **one-way binding** : plus prévisible et plus facile à déboguer.",
          code: '<p>{{ nom }}</p>\n<img [src]="url">\n<button (click)="go()">OK</button>\n<input [(ngModel)]="user.nom">',
          language: 'html',
          deepDive: "Le data binding est le cœur de la synchronisation entre la logique TypeScript et le DOM.\n\n## Les 4 formes\n\n- **Interpolation `{{ }}`** : модель→vue, évalue toute expression TypeScript\n- **Property Binding `[prop]`** : модель→vue dynamique, pour les valeurs non-string\n- **Event Binding `(event)`** : vue→modèle, capture les événements DOM\n- **Two-Way Binding `[(ngModel)]`** : bidirectionnel, combinaison automatique des deux\n\n## Bonnes pratiques\n\n- **Préférer one-way binding** : flux de données plus simple à suivre\n- **Éviter les mutations directes** : utiliser immutable patterns pour qu'OnPush détecte les changements\n- **Pas de logique métier lourde dans les interpolations** : réévaluées à chaque CD",
        },
        {
          id: 'ng-3',
          question: 'Services Angular',
          answer: "Classe `@Injectable` contenant la logique non liée à la vue : appels HTTP, état partagé, logique métier. Avec `providedIn: 'root'`, le service est un **singleton** partagé dans toute l'application.\n\nInjectable dans les composants via **DI**, facilement *mockable* pour les tests.",
          code: '@Injectable({ providedIn: "root" })\nexport class UserService {\n    constructor(private http: HttpClient) {}\n    getUsers(): Observable<User[]> {\n        return this.http.get<User[]>("api/users");\n    }\n}',
          language: 'typescript',
          deepDive: "Les services incarnent le principe de **séparation des responsabilités**. Ils encapsulent la logique qui n'appartient pas à une vue.\n\n## Injection de dépendances (DI)\nAngular possède un conteneur DI hiérarchique. Quand un composant déclare un service, Angular cherche une instance dans son propre injector, puis remonte jusqu'au root injector.\n## providedIn: 'root' vs providers: []\n- `providedIn: 'root'` : singleton au niveau applicatif — créé au premier appel, détruit à la fin de l'app\n- `providers: []` dans un@Component : nouvelle instance par composant — utile pour des composants répétés avec état local",
        },
        {
          id: 'ng-8',
          question: 'Lifecycle hooks',
          answer: "Méthodes appelées automatiquement par Angular à chaque étape du cycle de vie d'un composant :\n\n**`ngOnInit`** : initialisation. **`ngOnChanges`** : réagit aux `@Input()`. **`ngOnDestroy`** : nettoyage (unsubscribe, timers) — **crucial pour éviter les fuites mémoire**. **`ngAfterViewInit`** : après le rendu de la vue.\n\n\nOrdre : constructor → ngOnChanges → ngOnInit → ngAfterViewInit → ngOnDestroy.",
          deepDive: "Chaque composant traverse un cycle de vie prévisible. Les lifecycle hooks permettent d'exécuter du code à des moments précis.\n## Ordre d'exécution\n```\nConstructor → ngOnChanges → ngOnInit → ngAfterViewInit → [CD] → ngOnDestroy\n```\n## ngOnDestroy — LE plus important\nC'est où nettoyer les subscriptions pour éviter les memory leaks :\n```typescript\nexport class SearchComponent implements OnInit, OnDestroy {\n  private destroy$ = new Subject<void>();\n\n  ngOnInit() {\n    this.searchResults = this.searchControl.valueChanges.pipe(\n      debounceTime(300),\n      takeUntil(this.destroy$)\n    );\n  }\n\n  ngOnDestroy() {\n    this.destroy$.next();\n    this.destroy$.complete();\n  }\n}\n```",
        },
        {
          id: 'ng-12',
          question: 'Standalone components',
          answer: "Depuis Angular 14+, les composants peuvent se passer de `NgModule`. On importe directement les dépendances dans le composant via `imports: [CommonModule, RouterModule]`.\n\nAvantages : **simplification**, **lazy loading** plus facile, meilleur **tree-shaking**. En Angular 20+, standalone est le **défaut**.",
          code: '@Component({\n    selector: "app-user",\n    standalone: true,\n    imports: [CommonModule, FormsModule],\n    template: "<p>{{ user.name }}</p>"\n})\nexport class UserComponent { ... }',
          language: 'typescript',
          deepDive: "Les standalone components permettent de construire des apps Angular sans aucun NgModule.\n## Comparaison\n```typescript\n// ❌ Approche classique avec NgModule\n@NgModule({ declarations: [UserComponent], imports: [CommonModule] })\nexport class UserModule {}\n\n// ✅ Standalone\n@Component({\n  standalone: true,\n  imports: [CommonModule, FormsModule],\n  template: `<p>{{ user.name }}</p>`\n})\nexport class UserComponent {}\n```\n## Lazy loading simplifié\n```typescript\nconst routes: Routes = [\n  { path: 'users', loadComponent: () => import('./users/user.component') }\n];\n```\n## Migration progressive\nOn peut mixer approche classique et standalone — pas besoin de tout réécrire d'un coup.",
        },
      ],
    },
    {
      id: 'ng-forms',
      title: 'Formulaires',
      questions: [
        {
          id: 'ng-9',
          question: 'Reactive Forms vs Template-driven',
          answer: "**Template-driven** : validation dans le template via `ngModel`. Simple pour les petits formulaires, mais logique dispersée et difficile à tester.\n\n**Reactive Forms** : modèle créé en TypeScript via `FormGroup`/`FormControl`, validation programmatique, observables. Plus verbeux mais **testable** et adapté aux formulaires complexes.\n\n__Règle : template-driven pour les formulaires simples, reactive pour tout le reste.__",
          code: '// Reactive Form\nthis.form = new FormGroup({\n    nom: new FormControl("", [Validators.required, Validators.minLength(2)]),\n    email: new FormControl("", [Validators.required, Validators.email])\n});',
          language: 'typescript',
          deepDive: "Les formulaires sont au cœur de presque toute application Angular.\n## Template-driven — cas simples\n```html\n<form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f.value)\">\n  <input name=\"email\" ngModel required email>\n  <button [disabled]=\"f.invalid\">Envoyer</button>\n</form>\n```\n⚠️ Validation dispersée, difficile à tester.\n## Reactive Forms — recommandé\n```typescript\nexport class SignUpComponent implements OnInit {\n  form = new FormGroup({\n    name: new FormControl('', [Validators.required, Validators.minLength(2)]),\n    email: new FormControl('', [Validators.required, Validators.email])\n  });\n  onSubmit() {\n    if (this.form.valid) {\n      this.api.register(this.form.value);\n    } else {\n      this.form.markAllAsTouched();\n    }\n  }\n}\n```\n## Validation croisée\n```typescript\nthis.form = new FormGroup({\n  password: new FormControl(''),\n  confirm: new FormControl('')\n}, { validators: passwordMatchValidator });\n```",
        },
      ],
    },
    {
      id: 'ng-routing',
      title: 'Routing & Guard',
      questions: [
        {
          id: 'ng-4',
          question: 'Guards',
          answer: "Services contrôlant l'accès aux routes. **`CanActivate`** : autorise/bloque l'accès. **`CanDeactivate`** : confirmation avant de quitter. **`CanLoad`** : empêche le chargement lazy. **`Resolve`** : pré-charge les données avant affichage.\n\nRetournent `boolean`, `Promise` ou `Observable`. __Côté client uniquement — le backend doit toujours vérifier les autorisations__.",
          deepDive: "Les route guards contrôlent quelles routes un utilisateur peut accéder.\n## CanActivate\n```typescript\n@Injectable({ providedIn: 'root' })\nexport class AuthGuard implements CanActivate {\n  constructor(private auth: AuthService, private router: Router) {}\n  canActivate(): boolean {\n    if (this.auth.isLoggedIn()) return true;\n    this.router.navigate(['/login']);\n    return false;\n  }\n}\n```\n## CanDeactivate — protection avant de quitter\n```typescript\n@Injectable({ providedIn: 'root' })\nexport class UnsavedChangesGuard implements CanDeactivate<EditableComponent> {\n  canDeactivate(component: EditableComponent): boolean {\n    return component.hasUnsavedChanges() ? confirm('Abandonner les modifications ?') : true;\n  }\n}\n```\n## Resolve — pré-chargement\n```typescript\nexport class ArticleResolver implements Resolve<Article> {\n  resolve(route: ActivatedRouteSnapshot): Observable<Article> {\n    return this.api.getArticle(route.param['id']);\n  }\n}\n// Dans la route : resolve: { article: ArticleResolver }\n```\n⚠️ **Sécurité** : Les guards sont côté client — le backend DOIT toujours vérifier les autorisations.",
        },
        {
          id: 'ng-5',
          question: 'Lazy Loading',
          answer: "Charger les modules uniquement quand l'utilisateur navigue vers la route correspondante. Avec `loadComponent`/`loadChildren` et import dynamique → *chunks* séparés.\n\nImpact : premier chargement plus rapide, meilleur **Time to Interactive** et score **Lighthouse**. Indispensable pour les applications moyennes à grandes.",
          deepDive: "Le lazy loading divise l'application en chunks séparés téléchargés uniquement quand nécessaire.\n## Sans vs avec lazy loading\n- **Sans** : tout le bundle chargé au premier accès\n- **Avec** : seul le chunk initial téléchargé au premier accès\n## Implémentation\n```typescript\nconst routes: Routes = [\n  { path: 'users', loadComponent: () => import('./users/user.component') }\n];\n```\n## Preloading Strategy\n```typescript\nimport { PreloadAllModules } from '@angular/router';\nbootstrapApplication(AppComponent, {\n  providers: [provideRouter(routes, withPreloading(PreloadAllModules))]\n});\n```\nAvec `PreloadAllModules`, après 3 secondes d'inactivité, Angular pré-charge les chunks lazy en arrière-plan.\n## Indicateurs Lighthouse\n| Métrique | Sans lazy | Avec lazy |\n|---|---|---|\n| First Contentful Paint | ~2.5s | ~1.2s |\n| Bundle initial | 2MB | 400KB |",
        },
      ],
    },
    {
      id: 'ng-avance',
      title: 'Avancé',
      questions: [
        {
          id: 'ng-6',
          question: 'Interceptors',
          answer: "Interceptent toutes les requêtes/réponses HTTP globalement. Cas d'usage : ajout automatique du **JWT**, gestion globale des 401, retry sur erreurs réseau, logging.\n\nImplémente `HttpInterceptor` avec `intercept(req, next)`. Les intercepteurs forment une **chaîne**.",
          code: '@Injectable()\nexport class AuthInterceptor implements HttpInterceptor {\n    intercept(req, next) {\n        const authReq = req.clone({\n            setHeaders: { Authorization: `Bearer ${token}` }\n        });\n        return next.handle(authReq);\n    }\n}',
          language: 'typescript',
          deepDive: "Les HTTP Interceptors centralisent la logique commune à toutes les requêtes HTTP.\n## Chaîne d'interception\n```\nRequête → Interceptor1 → Interceptor2 → ... → Réseau\nRéponse ← Interceptor1 ← Interceptor2 ← ... ← Réseau\n```\n## Cas d'usage concrets\n### JWT automatique\n```typescript\n@Injectable()\nexport class TokenInterceptor implements HttpInterceptor {\n  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {\n    const token = this.auth.getToken();\n    if (token) {\n      const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });\n      return next.handle(authReq);\n    }\n    return next.handle(req);\n  }\n}\n```\n### Gestion des erreurs 401\n```typescript\n@Injectable()\nexport class AuthInterceptor implements HttpInterceptor {\n  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {\n    return next.handle(req).pipe(\n      catchError((error: HttpErrorResponse) => {\n        if (error.status === 401) {\n          this.auth.signOut();\n          this.router.navigate(['/login']);\n        }\n        return throwError(() => error);\n      })\n    );\n  }\n}\n```\n⚠️ L'ordre d'enregistrement compte — le premier interceptor déclaré voit la requête en premier.",
        },
        {
          id: 'ng-7',
          question: 'Observables vs Promises',
          answer: "**Promise** : valeur future unique, *eager*, non annulable. **Observable** : flux de données *lazy*, émet 0 à N valeurs, annulable via `unsubscribe()`.\n\nAngular utilise les **Observables** partout : `HttpClient`, formulaires réactifs, routing. C'est le modèle central du framework.",
          deepDive: "Comprendre la différence entre Promises et Observables est fondamental pour maîtriser Angular.\n## Promise — eager, une seule valeur\n```typescript\nconst promise = new Promise(resolve => resolve('données'));\npromise.then(data => console.log(data));\n```\n- **Eager** : s'exécute immédiatement\n- **Non annulable**\n- **Une seule valeur**\n## Observable — lazy, flux de données\n```typescript\nconst observable = new Observable(observer => {\n  observer.next('valeur 1');\n  observer.next('valeur 2');\n  observer.complete();\n});\nconst subscription = observable.subscribe({\n  next: value => console.log(value),\n  complete: () => console.log('terminé')\n});\nsubscription.unsubscribe(); // ANNULATION possible\n```\n## Dans Angular\n| Contexte | Utilisation |\n|---|---|\n| HttpClient | Observable |\n| Reactive Forms | Observable (`valueChanges`) |\n| Async pipe | Observable |\n| async/await | Promise |\n## Bonnes pratiques\n- **Observables pour tout ce qui vient du framework**\n- **takeUntil(this.destroy$)** pour éviter les memory leaks",
        },
        {
          id: 'ng-10',
          question: 'Change Detection Strategy',
          answer: "**Default** : Angular vérifie **tous les composants** à chaque événement — coûteux dans les grandes applications.\n\n**OnPush** : Angular ne vérifie le composant que si ses `@Input()` changent (référence), un événement interne se produit, ou un `Observable` via `async` pipe émet.\n\n__Utiliser `OnPush` par défaut__, remplacer les mutations par de nouvelles références (immuabilité).",
          code: '@Component({\n    changeDetection: ChangeDetectionStrategy.OnPush,\n    template: "<p>{{ data$ | async }}</p>"\n})',
          language: 'typescript',
          deepDive: "La Change Detection est le mécanisme qui synchronise le DOM avec l'état du composant.\n## Default vs OnPush\n**Default** : Angular vérifie TOUS les composants à chaque cycle CD — chaque click peut déclencher des centaines de vérifications.\n**OnPush** : Angular ne vérifie que si :\n1. Une `@Input()` change de **référence**\n2. Un événement interne se produit\n3. Un Observable via `async` pipe émet\n## Exemple\n```typescript\n// ❌ MUTATION — OnPush ne détecte PAS\nthis.user.name = 'Nouveau nom'; // Même référence\n// ✅ IMMUTABILITÉ — OnPush détecte\nthis.user = { ...this.user, name: 'Nouveau nom' }; // Nouvelle référence\n```\n## markForCheck()\n```typescript\n@Component({ changeDetection: ChangeDetectionStrategy.OnPush })\nexport class RealTimeComponent {\n  constructor(private cdr: ChangeDetectorRef) {}\n  onExternalData(data: Data) {\n    this.data = data;\n    this.cdr.markForCheck(); // Force la vérification au prochain cycle\n  }\n}\n```",
        },
        {
          id: 'ng-11',
          question: 'RxJS opérateurs courants',
          answer: "**Transformation** : `map`, `switchMap` (annule la précédente, idéal pour la recherche), `mergeMap`, `concatMap`.\n\n**Filtrage** : `filter`, `debounceTime` (anti-rebond), `distinctUntilChanged`, `takeUntil` (désabonnement propre).\n\n**Combinaison** : `combineLatest`, `forkJoin` (attend que toutes terminent).",
          code: '// Recherche avec anti-rebond\nthis.searchControl.valueChanges.pipe(\n    debounceTime(300),\n    distinctUntilChanged(),\n    switchMap(term => this.api.search(term))\n)',
          language: 'typescript',
          deepDive: "RxJS est indissociable d'Angular.\n## Opérateurs de transformation\n### switchMap — annule et remplace (recherche auto-complete)\n```typescript\nthis.searchControl.valueChanges.pipe(\n  debounceTime(300),\n  switchMap(term => this.api.search(term)) // Annule la requête précédente\n);\n```\n### mergeMap — concurrence sans annulation\n```typescript\nfrom([1,2,3,4,5]).pipe(\n  mergeMap(id => this.api.getUser(id), 3) // 3 requêtes concurrentes max\n).subscribe();\n```\n## Opérateurs de filtrage\n### debounceTime — anti-rebond\n```typescript\nthis.searchControl.valueChanges.pipe(\n  debounceTime(300),\n  distinctUntilChanged() // Ignore si valeur identique à précédente\n);\n```\n### takeUntil — désabonnement propre (LE pattern le plus important)\n```typescript\nprivate destroy$ = new Subject<void>();\nngOnDestroy() {\n  this.destroy$.next();\n  this.destroy$.complete();\n}\n```\n## Résumé pratique\n| Situation | Opérateur |\n|---|---|\n| Recherche auto-complete | debounceTime + switchMap |\n| Requêtes parallèle | forkJoin |\n| Désabonnement automatique | takeUntil |",
        },
        {
          id: 'ng-13',
          question: 'Dependency Injection avancée',
          answer: "Angular possède un système **DI** hiérarchique. Services à différents niveaux : `root` (singleton), `platform` (partagé entre apps), ou au niveau composant (instance par composant).\n\n`@Optional`, `@Self`, `useClass`/`useFactory`/`useValue` pour une configuration fine.\n\n\nLe DI hiérarchique permet d'isoler des instances dans des sous-arbres — utile pour les composants répétés.",
          code: '// Provider avec factory\nproviders: [\n    { provide: API_URL, useValue: "https://api.example.com" },\n    { provide: UserService, useClass: UserServiceImpl }\n]',
          language: 'typescript',
          deepDive: "Le système DI d'Angular est plus puissant qu'il n'y paraît.\n## Hiérarchie des injecteurs\n```\nPlatform Injector\n    ↓\nRoot Injector (singleton applicatif)\n    ↓\nComponent Injector (instance par composant)\n```\n## Niveaux d'injection\n```typescript\n// 1. ROOT — singleton global\n@Injectable({ providedIn: 'root' })\nexport class AuthService {}\n// 2. PLATFORM — partagé entre apps sur la même page\n@Injectable({ providedIn: 'platform' })\nexport class ConfigService {}\n// 3. Component — nouvelle instance par composant\n@Component({ providers: [UserCardService] })\nexport class UserCardComponent {}\n```\n## useClass, useFactory, useValue\n```typescript\n{ provide: UserService, useClass: MockUserService } // swap pour les tests\n{\n  provide: AnalyticsService,\n  useFactory: (config: ConfigService) => () => new AnalyticsService(config.apiKey),\n  deps: [ConfigService]\n}\n{ provide: 'API_URL', useValue: 'https://api.example.com' }\n```\n## Injection token — pour les non-classes\n```typescript\nexport const API_URL = new InjectionToken<string>('API_URL');\n{ provide: API_URL, useValue: 'https://api.example.com' }\nconstructor(@Inject(API_URL) private apiUrl: string) {}\n```",
        },
      ],
    },
  ],
};