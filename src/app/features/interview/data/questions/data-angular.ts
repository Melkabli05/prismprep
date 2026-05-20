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
          deepDive: `Angular est un framework complet et non une simple librería. Contrairement à React ou Vue qui se concentrent sur la couche vue, Angular impose une architecture **MDA** (Model-Driven Architecture).

## Architecture complète

Chaque application Angular repose sur quatre briques fundamentales qui fonctionnent ensemble de manière cohérente.

### Modules (NgModule)

Un root module bootstrappe l'application. Les feature modules isolent les domaines fonctionnels. Sans module, pas de composant accessible.

### Composants

L'unité de base de l'UI. Un composant Angular comprend trois parties :

- Classe TypeScript avec les propriétés et méthodes
- Template HTML avec la syntaxe de data binding
- Styles CSS scopés au composant

### Templates

Syntaxe HTML enrichie avec quatre formes de data binding :

- Interpolation \`{{ expression }}\` — modèle vers vue
- Property binding \`[prop]="valeur"\` — modèle vers vue dynamique
- Event binding \`(event)="methode()"\` — vue vers modèle
- Two-way binding \`[(ngModel)]="valeur"\` — bidirectionnel

### Services

Classes injectables via le système DI. Logique métier, accès données et état partagé — séparé de la vue.

## Comparaison avec l'écosystème

| Caractéristique          | Angular         | React              | Vue                |
|--------------------------|-----------------|--------------------|--------------------|
| Langage                 | TypeScript      | JS / TSX           | JS / Vue SFC       |
| Data binding            | Two-way natif   | One-way            | Two-way optionnel  |
| Routing                 | Inclus          | react-router       | Vue Router         |
| Courbe d'apprentissage  | Élevée          | Moyenne            | Faible             |
| Taille bundle           | ~500 KB         | ~200 KB            | ~100 KB            |

## La force d'Angular : l'opinionated approach

Le fait qu'Angular impose une structure rend la vie plus facile sur les gros projets avec beaucoup de développeurs. Les conventions sont partagées, le code est prévisible.

À contrario, React laisse beaucoup de liberté architecturale — ce qui peut mener à des styles très différents d'un projet à l'autre. Un nouveau développeur Angular peut s'adapter rapidement à n'importe quel projet parce que les patterns sont imposés par le framework.`,
        },
        {
          id: 'ng-2',
          question: 'Data Binding',
          answer: "Quatre formes de synchronisation modèle↔vue : **interpolation** \`{{ expr }}\` (modèle→vue), **property binding** \`[prop]='val'\` (modèle→vue dynamique), **event binding** \`(event)='methode()'\` (vue→modèle), **two-way binding** \`[(ngModel)]='val'\` (bidirectionnel, idéal pour les formulaires).\n\nPrivilégier le **one-way binding** : flux de données plus simple à suivre et plus performant.",
          code: '<p>{{ nom }}</p>\n<img [src]="url">\n<button (click)="go()">OK</button>\n<input [(ngModel)]="user.nom">',
          language: 'html',
          deepDive: `Le data binding est le cœur de la synchronisation entre la logique TypeScript et le DOM. Comprendre les quatre formes est essential pour écrire des composants Angular efficaces.

## Les 4 formes

### Interpolation \`{{ }}\`

Modèle vers vue. Évalue toute expression TypeScript et convertit le résultat en string.

\`\`\`html
<p>Bonjour {{ user.name }}</p>
<p>Total : {{ calculate() }}</p>
\`\`\`

### Property Binding \`[prop]\`

Modèle vers vue dynamique. Pour les valeurs non-string ou pour lier des propriétés de composant à des éléments du DOM.

\`\`\`html
<img [src]="user.avatar" [alt]="user.name">
<button [disabled]="isLoading">Valider</button>
\`\`\`

### Event Binding \`(event)\`

Vue vers modèle. Capture les événements DOM et appelle une méthode du composant.

\`\`\`html
<button (click)="onSubmit()">Envoyer</button>
<input (input)="onSearch($event)">
\`\`\`

### Two-Way Binding \`[(ngModel)]\`

Bidirectionnel. Combine property binding et event binding. Idéal pour les formulaires.

\`\`\`html
<input [(ngModel)]="user.email">
\`\`\`

## Bonnes pratiques

### Préférer one-way binding

Le flux de données est plus simple à suivre et à débugger. Utiliser \`[(ngModel)]\` uniquement pour les formulaires.

### Éviter les mutations directes

Avec \`ChangeDetectionStrategy.OnPush\`, Angular ne détecte que les changements de référence. Utiliser des patterns immuables.

\`\`\`typescript
// MUTATION — OnPush ne détecte pas
this.user.name = 'Nouveau nom';

// IMMUTABILITÉ — OnPush détecte
this.user = { ...this.user, name: 'Nouveau nom' };
\`\`\`

### Pas de logique métier dans les interpolations

Les interpolations sont réévaluées à chaque cycle de change detection. Toute logique lourde impacte les performances.`,
        },
        {
          id: 'ng-3',
          question: 'Services Angular',
          answer: "Classe \`@Injectable\` contenant la logique non liée à la vue : appels HTTP, état partagé, logique métier. Avec \`providedIn: 'root'\`, le service est un **singleton** partagé dans toute l'application.\n\nInjectable dans les composants via **DI**, facilement *mockable* pour les tests.",
          code: '@Injectable({ providedIn: "root" })\nexport class UserService {\n    constructor(private http: HttpClient) {}\n    getUsers(): Observable<User[]> {\n        return this.http.get<User[]>(\"api/users\");\n    }\n}',
          language: 'typescript',
          deepDive: `Les services incarnent le principe de séparation des responsabilités. Ils encapsulent la logique qui n'appartient pas à une vue — appels HTTP, état partagé, logique métier.

## Injection de dépendances (DI)

Angular possède un conteneur DI hiérarchique. Quand un composant déclare un service, Angular cherche une instance dans son propre injector, puis remonte jusqu'au root injector.

### providedIn: 'root'

Singleton au niveau applicatif. Créé au premier appel, détruit à la fin de l'application. C'est le mode recommandé pour la plupart des services.

\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor() { }
}
\`\`\`

### providers: [] dans un @Component

Nouvelle instance par composant. Utile pour des composants répétés qui ont chacun leur propre état.

\`\`\`typescript
@Component({
  providers: [CounterService]
})
export class CounterComponent { }
\`\`\`

## Cas d'usage

### Service HTTP

Centraliser les appels API dans un service dédié.

\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  createUser(data: Partial<User>): Observable<User> {
    return this.http.post<User>('/api/users', data);
  }
}
\`\`\`

### Service d'état

Un service avec un signal peut servir d'état local sans NgRx.

\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class CartState {
  private readonly _items = signal<CartItem[]>([]);
  readonly items = this._items.asReadonly();
  readonly total = computed(() => this._items().reduce((sum, i) => sum + i.price, 0));
}
\`\`\``,
        },
        {
          id: 'ng-8',
          question: 'Lifecycle hooks',
          answer: "Méthodes appelées automatiquement par Angular à chaque étape du cycle de vie d'un composant :\n\n**\`ngOnInit\`** : initialisation. **\`ngOnChanges\`** : réagit aux \`@Input()\`. **\`ngOnDestroy\`** : nettoyage (unsubscribe, timers) — **crucial pour éviter les fuites mémoire**. **\`ngAfterViewInit\`** : après le rendu de la vue.\n\n\nOrdre : constructor > ngOnChanges > ngOnInit > ngAfterViewInit > ngOnDestroy.",
          deepDive: `Chaque composant Angular traverse un cycle de vie prévisible. Les lifecycle hooks permettent d'exécuter du code à des moments précis de ce cycle.

## Ordre d'exécution (phase d'initialisation)

\`\`\`
constructor
  > ngOnChanges         (après chaque @Input change)
  > ngOnInit            (une seule fois, après le premier ngOnChanges)
  > ngDoCheck           (avant chaque cycle de change detection)
  > ngAfterContentInit  (après le contenu projeté)
  > ngAfterContentChecked
  > ngAfterViewInit     (après le rendu de la vue)
  > ngAfterViewChecked
  > [Change Detection se répète]
  > ngOnDestroy        (au moment de la destruction)
\`\`\`

## ngOnInit — Initialisation

Utile pour charger des données au démarrage du composant.

\`\`\`typescript
export class UserListComponent implements OnInit {
  ngOnInit() {
    this.loadUsers();
  }
}
\`\`\`

## ngOnChanges — Réagit aux @Input()

Se déclenche après chaque changement d'un \`@Input()\`. Accès à l'historique des changements via \`SimpleChanges\`.

\`\`\`typescript
export class UserCardComponent implements OnChanges {
  @Input() user!: User;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      console.log('Nouvelle valeur:', changes['user'].currentValue);
    }
  }
}
\`\`\`

## ngOnDestroy — LE plus important

C'est ici qu'on nettoie les subscriptions pour éviter les memory leaks. Deux approches :

### Approche classique (implements OnDestroy)

\`\`\`typescript
export class SearchComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.searchResults = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      switchMap(term => this.api.search(term)),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
\`\`\`

### Approche moderne (DestroyRef)

Depuis Angular 16, \`DestroyRef\` est l'approche recommandée. Le code de cleanup se place à côté du code de setup.

\`\`\`typescript
export class UserComponent {
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      console.log('Cleanup');
    });
  }
}
\`\`\`

## ngDoCheck — À utiliser avec précaution

Se déclenche avant chaque cycle de change detection. Peut impacter fortement les performances — à éviter sauf pour des cas très spécifiques.

## AfterViewInit et AfterViewChecked

Pour manipuler le DOM directement après qu'Angular l'ait rendu. Utiliser avec précaution.

\`\`\`typescript
ngAfterViewInit() {
  console.log('Vue initialisée');
}
\`\`\``,
        },
        {
          id: 'ng-12',
          question: 'Standalone components',
          answer: "Depuis Angular 14+, les composants peuvent se passer de \`NgModule\`. On importe directement les dépendances dans le composant via \`imports: [CommonModule, RouterModule]\`.\n\nAvantages : **simplification**, **lazy loading** plus facile, meilleur **tree-shaking**. En Angular 21, standalone est le **défaut** (\`ng new\` crée par défaut un projet standalone).",
          code: '@Component({\n    selector: "app-user",\n    standalone: true,\n    imports: [CommonModule, FormsModule],\n    template: "<p>{{ user.name }}</p>"\n})\nexport class UserComponent { ... }',
          language: 'typescript',
          deepDive: `Les standalone components permettent de construire des applications Angular sans aucun NgModule. C'est le mode par défaut depuis Angular 21.

## Approche classique vs Standalone

### Avec NgModule (approche legacy)

\`\`\`typescript
@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, FormsModule],
  exports: [UserComponent]
})
export class UserModule { }
\`\`\`

### Standalone (mode moderne)

\`\`\`typescript
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: \`<p>{{ user.name }}</p>\`
})
export class UserComponent {
  @Input() user!: User;
}
\`\`\`

Le composant déclare lui-même ses dépendances. Plus de module nécessaire pour les cas simples.

## Lazy loading simplifié

Le chargement paresseux devient plus simple avec \`loadComponent\`.

\`\`\`typescript
const routes: Routes = [
  { path: 'users', loadComponent: () => import('./users/user.component') }
];
\`\`\`

Le build system (esbuild) analyse les imports dynamiques et crée des chunks séparés. Angular ne télécharge le chunk que lors de la première navigation.

## Import direct des dépendances

Plus besoin de \`CommonModule\` pour utiliser \`*ngFor\` et \`*ngIf\`. On importe uniquement ce qu'on utilise.

\`\`\`typescript
@Component({
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, JsonPipe],
  template: \`
    <div *ngFor="let item of items">{{ item.name }}</div>
    <router-outlet></router-outlet>
  \`
})
\`\`\`

## Migration progressive

On peut mixer approche classique et standalone. Les components standalone peuvent être déclarés dans un NgModule, et vice versa. Pas besoin de tout réécrire d'un coup.`,
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
          answer: "**Template-driven** : validation dans le template via \`ngModel\`. Simple pour les petits formulaires, mais logique dispersée et difficile à tester.\n\n**Reactive Forms** : modèle créé en TypeScript via \`FormGroup\`/\`FormControl\`, validation programmatique, observables. Plus verbeux mais **testable** et adapté aux formulaires complexes.\n\n__Règle : template-driven pour les formulaires simples, reactive pour tout le reste.__",
          code: '// Reactive Form\nthis.form = new FormGroup({\n    nom: new FormControl("", [Validators.required, Validators.minLength(2)]),\n    email: new FormControl("", [Validators.required, Validators.email])\n});',
          language: 'typescript',
          deepDive: `Les formulaires sont au cœur de presque toute application Angular. Le choix entre template-driven et reactive dépend de la complexité du formulaire.

## Template-driven — cas simples

La validation et le modèle vivent dans le template. Rapide à écrire pour les formulaires basiques.

\`\`\`html
<form #f="ngForm" (ngSubmit)="onSubmit(f.value)">
  <input name="email" ngModel required email #emailCtrl="ngModel">
  <button [disabled]="f.invalid">Envoyer</button>
</form>
\`\`\`

Inconvénients : logique dispersée entre template et component, difficile à tester automatiquement.

## Reactive Forms — recommandé

Le modèle et la validation vivent en TypeScript. Plus testable, plus prévisible, plus puissant.

\`\`\`typescript
export class SignUpComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  onSubmit() {
    if (this.form.valid) {
      this.api.register(this.form.getRawValue());
    } else {
      this.form.markAllAsTouched();
    }
  }
}
\`\`\`

## Validation croisée (cross-field)

Reactive Forms permet de valider des relations entre champs.

\`\`\`typescript
const passwordMatchValidator: ValidatorFn = (group: AbstractControl) => {
  const password = group.get('password')?.value;
  const confirm = group.get('confirm')?.value;
  return password === confirm ? null : { passwordMismatch: true };
};

this.form = new FormGroup({
  password: new FormControl(''),
  confirm: new FormControl('')
}, { validators: passwordMatchValidator });
\`\`\`

## Valeurs par défaut et patch

\`\`\`typescript
// Réinitialiser avec des valeurs par défaut
this.form.reset({ name: 'Anonyme', email: '' });

// Patcher une partie du formulaire
this.form.patchValue({ email: 'new@example.com' });
\`\`\``,
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
          answer: "Services contrôlant l'accès aux routes. **\`CanActivate\`** : autorise/bloque l'accès. **\`CanDeactivate\`** : confirmation avant de quitter. **\`CanLoad\`** : empêche le chargement lazy. **\`Resolve\`** : pré-charge les données avant affichage.\n\nRetournent \`boolean\`, \`Promise\` ou \`Observable\`. __Côté client uniquement — le backend doit toujours vérifier les autorisations__.",
          deepDive: `Les route guards contrôlent quelles routes un utilisateur peut accéder. C'est la première ligne de défense côté client — mais elle peut toujours être contournée.

## Les 4 types de guards

### CanActivate

Autorise ou bloque l'accès à une route. Utile pour vérifier l'authentification.

\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}
\`\`\`

### CanDeactivate

Confirmation avant de quitter une page. Idéal pour les formulaires avec des données non enregistrées.

\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class UnsavedChangesGuard implements CanDeactivate<EditComponent> {
  canDeactivate(component: EditComponent): boolean {
    return component.hasUnsavedChanges()
      ? confirm('Vous avez des modifications non enregistrées.')
      : true;
  }
}
\`\`\`

### CanLoad

Empêche le chargement lazy du chunk JS si l'utilisateur n'est pas autorisé. Plus sécurisé que CanActivate car le chunk n'est même pas téléchargé.

\`\`\`typescript
const routes: Routes = [{
  path: 'admin',
  loadChildren: () => import('./admin/admin.routes'),
  canLoad: [AdminGuard]
}];
\`\`\`

### Resolve

Pré-charge les données avant l'affichage de la route. L'utilisateur ne voit jamais la page vide.

\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class ArticleResolver implements Resolve<Article> {
  resolve(route: ActivatedRouteSnapshot): Observable<Article> {
    return this.api.getArticle(route.param['id']);
  }
}
\`\`\`

Usage dans la route :

\`\`\`typescript
{ path: 'article/:id', component: ArticleComponent, resolve: { article: ArticleResolver } }
\`\`\`

## Sécurité — garde cliente uniquement

Les guards tournent côté navigateur et peuvent être contournés par un utilisateur déterminé. Toujours combiner avec une vérification serveur des autorisations dans les API.`,
        },
        {
          id: 'ng-5',
          question: 'Lazy Loading',
          answer: "Charger les modules uniquement quand l'utilisateur navigue vers la route correspondante. Avec \`loadComponent\`/\`loadChildren\` et import dynamique — *chunks* séparés.\n\nImpact : premier chargement plus rapide, meilleur **Time to Interactive** et score **Lighthouse**. Indispensable pour les applications moyennes à grandes.",
          deepDive: `Le lazy loading divise l'application en chunks JS séparés téléchargés uniquement quand l'utilisateur navigue vers la route.

## loadComponent (moderne)

Depuis Angular 14+, on peut charger un composant standalone directement.

\`\`\`typescript
const routes: Routes = [
  { path: 'users', loadComponent: () => import('./users/user.component') }
];
\`\`\`

Le build system crée automatiquement un chunk séparé. Angular ne télécharge le chunk que lors de la première navigation.

## Performance

| Métrique              | Sans lazy loading | Avec lazy loading |
|-----------------------|-------------------|-------------------|
| First Contentful Paint| ~2.5s             | ~1.2s             |
| Bundle initial        | 2 MB              | 400 KB            |

## Preloading strategy

Le preloading se configure dans app.config.ts :

\`\`\`typescript
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules))
  ]
});
\`\`\`

\`PreloadAllModules\` pré-charge tous les chunks après le chargement initial. Pour un contrôle plus fin, utiliser \`PreloadSelectiveModules\`.

## FAQ

**Faut-il toujours utiliser le lazy loading ?**
Non — pour les petites applications, le gain est marginal. Pour les applications moyennes à grandes, c'est indispensable.

**Peut-on combiner lazy loading et eager loading ?**
Oui. Les routes critiques peuvent rester eager tandis que les routes secondaires utilisent le lazy loading.`,
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
          answer: "Interceptent toutes les requêtes/réponses HTTP globalement. Cas d'usage : ajout automatique du **JWT**, gestion globale des 401, retry sur erreurs réseau, logging.\n\nImplémente \`HttpInterceptor\` avec \`intercept(req, next)\`. Les intercepteurs forment une **chaîne**.",
          code: '@Injectable()\nexport class AuthInterceptor implements HttpInterceptor {\n    intercept(req, next) {\n        const authReq = req.clone({\n            setHeaders: { Authorization: `Bearer ${token}` }\n        });\n        return next.handle(authReq);\n    }\n}',
          language: 'typescript',
          deepDive: `Les HTTP Interceptors centralisent la logique commune à toutes les requêtes HTTP. Ils forment une chaîne — chaque interceptor voit la requête dans l'ordre où ils sont déclarés.

## Approche fonctionnelle (recommandée)

Depuis Angular 15+, les intercepteurs fonctionnels sont recommandés. Plus prévisibles, plus simples à composer.

\`\`\`typescript
const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();
  if (token) {
    return next.handle(req.clone({ setHeaders: { Authorization: \`Bearer \${token}\` } }));
  }
  return next.handle(req);
};
\`\`\`

## Approche classe (legacy)

\`\`\`typescript
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();
    if (token) {
      const authReq = req.clone({
        setHeaders: { Authorization: \`Bearer \${token}\` }
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
\`\`\`

## Chaîne d'interception

Les intercepteurs déclarés dans les providers s'enchaînent dans cet ordre :

\`\`\`
Requête > Interceptor1 > Interceptor2 > ... > Réseau
Réponse < Interceptor1 < Interceptor2 < ... < Réseau
\`\`\`

## Cas d'usage concrets

### JWT automatique

Ajouter le token à chaque requête sortante.

### Gestion des erreurs 401

Détecter les erreurs d'authentification et rediriger.

\`\`\`typescript
const authErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next.handle(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        inject(AuthService).signOut();
        inject(Router).navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
\`\`\`

### Retry avec backoff exponentiel

\`\`\`typescript
const retryInterceptor: HttpInterceptorFn = (req, next) => {
  return next.handle(req).pipe(
    retry({ count: 3, delay: (attempt) => Math.pow(2, attempt) * 1000 })
  );
};
\`\`\`

## Ordre d'enregistrement

L'ordre dans les providers compte. Le premier déclaré voit la requête en premier — et la dernière réponse en dernier.`,
        },
        {
          id: 'ng-7',
          question: 'Observables vs Promises',
          answer: "**Promise** : valeur future unique, *eager*, non annulable. **Observable** : flux de données *lazy*, émet 0 à N valeurs, annulable via \`unsubscribe()\`.\nAngular utilise les **Observables** partout : \`HttpClient\`, formulaires réactifs, routing. C'est le modèle central du framework.",
          deepDive: `Comprendre la différence entre Promises et Observables est fundamental pour maîtriser Angular.

## Promise — eager, une seule valeur

Une Promise s'exécute immédiatement et retourne une seule valeur (ou échoue). Elle ne peut pas être annulée une fois démarrée.

\`\`\`typescript
const promise = new Promise<string>((resolve, reject) => {
  resolve('données');
});

promise.then(data => console.log(data));
// OU
const data = await promise;
\`\`\`

Caractéristiques :
- **Eager** — s'exécute dès sa création
- **Non annulable** — une fois démarrée, on ne peut que l'ignorer
- **Une seule valeur** — resolve ou reject, jamais les deux

## Observable — lazy, flux de données

Un Observable ne s'exécute que quelqu'un s'y abonne. Il peut émettre zéro, une ou plusieurs valeurs au cours du temps, et peut être annulé.

\`\`\`typescript
const observable = new Observable<string>(observer => {
  observer.next('valeur 1');
  observer.next('valeur 2');
  observer.complete();
});

const subscription = observable.subscribe({
  next: value => console.log(value),
  complete: () => console.log('terminé')
});

subscription.unsubscribe(); // ANNULATION possible
\`\`\`

## Dans Angular

| Contexte        | Utilisation  |
|-----------------|--------------|
| HttpClient      | Observable   |
| Reactive Forms  | Observable   |
| Async pipe      | Observable   |
| async/await     | Promise      |

## Bonnes pratiques

### Éviter les memory leaks avec DestroyRef

Depuis Angular 16, préférer DestroyRef à OnDestroy.

\`\`\`typescript
export class MyComponent {
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      console.log('Cleanup');
    });
  }
}
\`\`\`

### Préférer les Observables pour tout ce qui vient du framework

HttpClient, formulaires réactifs, routing — tout utilise les Observables. Utiliser async/await uniquement pour les opérations Promise-native (Storage, fetch natif).`,
        },
        {
          id: 'ng-10',
          question: 'Change Detection Strategy',
          answer: "**Default** : Angular vérifie **tous les composants** à chaque événement — coûteux dans les grandes applications.\n\n**OnPush** : Angular ne vérifie le composant que si ses \`@Input()\` changent (référence), un événement interne se produit, ou un \`Observable\` via \`async\` pipe émet.\n\n__Utiliser \`OnPush\` par défaut__, remplacer les mutations par de nouvelles références (immuabilité).",
          code: '@Component({\n    changeDetection: ChangeDetectionStrategy.OnPush,\n    template: "<p>{{ data$ | async }}</p>"\n})',
          language: 'typescript',
          deepDive: `La Change Detection est le mécanisme qui synchronise le DOM avec l'état du composant. Comprendre ce mécanisme est essentiel pour les performances en Angular.

## Default vs OnPush

### Default

Angular vérifie TOUS les composants à chaque cycle de change detection — déclenché par tout event (click, hover, input, timer, etc.). Sur une grande application, cela peut signifier des centaines de vérifications par événement.

### OnPush

Angular ne vérifie le composant que si :

1. Une \`@Input()\` change de **référence** (et non de valeur interne)
2. Un événement interne se produit (click sur un bouton du composant)
3. Un Observable souscrit via \`async\` pipe émet une nouvelle valeur

## Exemple concret

\`\`\`typescript
// MUTATION — OnPush ne détecte PAS le changement
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
export class UserComponent {
  @Input() user!: User;

  updateName() {
    this.user.name = 'Nouveau nom'; // Même référence — ignoré par OnPush
  }
}

// IMMUTABILITÉ — OnPush détecte le changement
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
export class UserComponent {
  @Input() user!: User;

  updateName() {
    this.user = { ...this.user, name: 'Nouveau nom' }; // Nouvelle référence — OnPush détecte
  }
}
\`\`\`

## markForCheck()

Pour les cas où les données viennent de l'extérieur sans être des @Input() (ex: données temps réel via WebSocket).

\`\`\`typescript
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
export class RealTimeComponent {
  constructor(private cdr: ChangeDetectorRef, private ws: WebSocketService) {
    this.ws.messages.subscribe(data => {
      this.data = data;
      this.cdr.markForCheck(); // Force la vérification au prochain cycle CD
    });
  }
}
\`\`\`

## Detached strategy

Pour isoler complètement un subtree du cycle de change detection. Utilisé pour les dashboards temps réel qui se mettent à jour via WebSocket sans interaction utilisateur.

\`\`\`typescript
this.cdr.detach(); // Le composant n'est plus vérifié automatiquement
// Appeler this.cdr.detectChanges() manuellement quand nécessaire
\`\`\``,
        },
        {
          id: 'ng-11',
          question: 'RxJS opérateurs courants',
          answer: "**Transformation** : \`map\`, \`switchMap\` (annule la précédente, idéal pour la recherche), \`mergeMap\`, \`concatMap\`.\n\n**Filtrage** : \`filter\`, \`debounceTime\` (anti-rebond), \`distinctUntilChanged\`, \`takeUntil\` (désabonnement propre).\n\n**Combinaison** : \`combineLatest\`, \`forkJoin\` (attend que toutes terminent).",
          code: '// Recherche avec anti-rebond\nthis.searchControl.valueChanges.pipe(\n    debounceTime(300),\n    distinctUntilChanged(),\n    switchMap(term => this.api.search(term))\n)',
          language: 'typescript',
          deepDive: `RxJS est indissociable d'Angular. Le framework utilise les Observables partout — HttpClient, formulaires réactifs, routing, async pipe.

## Opérateurs de transformation

### switchMap — annule et remplace

Idéal pour les recherches auto-complete où chaque nouvelle saisie annule la requête précédente.

\`\`\`typescript
this.searchControl.valueChanges.pipe(
  debounceTime(300),
  switchMap(term => this.api.search(term))
);
\`\`\`

### mergeMap — concurrence sans annulation

Lance plusieurs requêtes en parallèle sans annuler les précédentes. Utile pour charger des données indépendantes.

\`\`\`typescript
from([1, 2, 3, 4, 5]).pipe(
  mergeMap(id => this.api.getUser(id), 3) // 3 requêtes concurrentes max
).subscribe();
\`\`\`

### concatMap — exécution séquentielle

Exécute les requêtes dans l'ordre, l'une après l'autre. Utile pour des opérations qui doivent respecter l'ordre.

## Opérateurs de filtrage

### debounceTime — anti-rebond

Ignore les émissions trop rapprochées. Attend que la source soit silencieuse pendant une durée avant d'émettre.

\`\`\`typescript
this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged() // Ignore si la valeur est identique à la précédente
);
\`\`\`

### takeUntil — désabonnement propre (LE pattern fondamental)

Permet d'annuler toutes les subscriptions d'un composant dans un seul \`ngOnDestroy\`.

\`\`\`typescript
export class MyComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.data$ = this.service.data$.pipe(
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
\`\`\`

## Opérateurs de combinaison

### forkJoin — parallèle, attend que toutes terminent

Lance plusieurs Observables en parallèle et attend que tous complètent. Retourne un tableau de résultats.

\`\`\`typescript
forkJoin({
  users: this.api.getUsers(),
  config: this.api.getConfig()
}).subscribe(({ users, config }) => {
  // Les deux sont chargés
});
\`\`\`

### combineLatest — combine les dernières valeurs

Émet quand l'une des sources émet, avec la dernière valeur de chacune.

## Résumé pratique

| Situation                  | Opérateur                    |
|---------------------------|------------------------------|
| Recherche auto-complete   | debounceTime + switchMap     |
| Chargement parallèle     | forkJoin                     |
| Désabonnement propre     | takeUntil                    |
| Annuler requête précédente| switchMap                   |
| Combiner deux flux       | combineLatest                |`,
        },
        {
          id: 'ng-13',
          question: 'Dependency Injection avancée',
          answer: "Angular possède un système **DI** hiérarchique. Services à différents niveaux : \`root\` (singleton), \`platform\` (partagé entre apps), ou au niveau composant (instance par composant).\n\n\`@Optional\`, \`@Self\`, \`useClass\`/\`useFactory\`/\`useValue\` pour une configuration fine.\n\nLe DI hiérarchique permet d'isoler des instances dans des sous-arbres — utile pour les composants répétés.",
          code: '// Provider avec factory\nproviders: [\n    { provide: API_URL, useValue: "https://api.example.com" },\n    { provide: UserService, useClass: UserServiceImpl }\n]',
          language: 'typescript',
          deepDive: `Le système DI d'Angular est plus puissant qu'il n'y paraît. Comprendre la hiérarchie des injecteurs permet de contrôler précisément le cycle de vie des services.

## Hiérarchie des injecteurs

\`\`\`
Platform Injector
    > Root Injector (singleton applicatif)
    > Component Injector (instance par composant)
\`\`\`

## Niveaux d'injection

### Root — singleton global

\`\`\`typescript
@Injectable({ providedIn: 'root' })
export class AuthService { }
\`\`\`

Une seule instance pour toute l'application. Créée au premier appel, détruite à la fin.

### Platform — partagé entre apps sur la même page

\`\`\`typescript
@Injectable({ providedIn: 'platform' })
export class ConfigService { }
\`\`\`

Une seule instance partagée entre plusieurs Angular bootstrapées sur la même page (ex: micro-frontends).

### Component — nouvelle instance par composant

\`\`\`typescript
@Component({
  providers: [UserCardService]
})
export class UserCardComponent { }
\`\`\`

Chaque instance du composant reçoit sa propre copie du service.

## useClass, useFactory, useValue

### useClass — remplacer une dépendance par une autre

\`\`\`typescript
providers: [
  { provide: UserService, useClass: MockUserService }
]
\`\`\`

Pour les tests ou les implémentations alternatives.

### useFactory — création avec dépendances dynamiques

\`\`\`typescript
{
  provide: AnalyticsService,
  useFactory: (config: ConfigService) => () => new AnalyticsService(config.apiKey),
  deps: [ConfigService]
}
\`\`\`

### useValue — valeur directe

\`\`\`typescript
{ provide: 'API_URL', useValue: 'https://api.example.com' }
\`\`\`

Pour les constantes ou les configurations.

## InjectionToken — pour les non-classes

Quand la dépendance n'est pas une classe (string, objet de config, etc.), utiliser un InjectionToken.

\`\`\`typescript
export const API_URL = new InjectionToken<string>('API_URL');

{ provide: API_URL, useValue: 'https://api.example.com' }

// Dans le constructeur
constructor(@Inject(API_URL) private apiUrl: string) { }
\`\`\``,
        },
      ],
    },
  ],
};