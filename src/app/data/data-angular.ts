import type { InterviewCategory } from '../models/interview.models';

export const angularCategory: InterviewCategory = {
  id: 'angular',
  title: 'Angular',
  color: 'bg-red-100 text-red-700',
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
        },
        {
          id: 'ng-2',
          question: 'Data Binding',
          answer: "Quatre formes de synchronisation modèle↔vue : **interpolation** `{{ expr }}` (modèle→vue), **property binding** `[prop]='val'` (modèle→vue dynamique), **event binding** `(event)='methode()'` (vue→modèle), **two-way binding** `[(ngModel)]='val'` (bidirectionnel, idéal pour les formulaires).\n\nPrivilégier le **one-way binding** : plus prévisible et plus facile à déboguer.",
          code: '<p>{{ nom }}</p>\n<img [src]="url">\n<button (click)="go()">OK</button>\n<input [(ngModel)]="user.nom">',
          language: 'html',
        },
        {
          id: 'ng-3',
          question: 'Services Angular',
          answer: "Classe `@Injectable` contenant la logique non liée à la vue : appels HTTP, état partagé, logique métier. Avec `providedIn: 'root'`, le service est un **singleton** partagé dans toute l'application.\n\nInjectable dans les composants via **DI**, facilement *mockable* pour les tests. Centraliser la logique dans les services évite la duplication entre composants.",
          code: '@Injectable({ providedIn: "root" })\nexport class UserService {\n    constructor(private http: HttpClient) {}\n    getUsers(): Observable<User[]> {\n        return this.http.get<User[]>("api/users");\n    }\n}',
          language: 'typescript',
        },
        {
          id: 'ng-8',
          question: 'Lifecycle hooks',
          answer: "Méthodes appelées automatiquement par Angular à chaque étape du cycle de vie d'un composant :\n\n**`ngOnInit`** : initialisation (appel API, setup) — le plus utilisé. **`ngOnChanges`** : réagit aux changements de `@Input()`. **`ngOnDestroy`** : nettoyage (unsubscribe, timers) — **crucial pour éviter les fuites mémoire**. **`ngAfterViewInit`** : après le rendu de la vue (accès au DOM).\n\nOrdre : constructor → ngOnChanges → ngOnInit → ngAfterViewInit → ngOnDestroy.",
        },
        {
          id: 'ng-12',
          question: 'Standalone components',
          answer: "Depuis Angular 14+, les composants peuvent se passer de `NgModule`. Au lieu de déclarer le composant dans un module, on importe directement les dépendances dans le composant lui-même via `imports: [CommonModule, RouterModule]`.\n\nAvantages : **simplification** (moins de boilerplate), **lazy loading** plus facile, meilleur **tree-shaking**. Les standalone components sont le futur d'Angular — les `NgModule` sont progressivement dépréciés. __Nouveaux projets → standalone par défaut.__",
          code: '@Component({\n    selector: "app-user",\n    standalone: true,\n    imports: [CommonModule, FormsModule],\n    template: "<p>{{ user.name }}</p>"\n})\nexport class UserComponent { ... }',
          language: 'typescript',
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
          answer: "**Template-driven** : logique de validation dans le template via `ngModel` + attributs HTML. Simple pour les petits formulaires, mais logique dispersée et difficile à tester.\n\n**Reactive Forms** : modèle de formulaire créé en TypeScript via `FormGroup`/`FormControl`, validation programmatique, observables sur les changements de valeur. Plus verbeux mais **testable**, **prévisible** et adapté aux formulaires complexes/dynamiques.\n\n__Règle : template-driven pour les formulaires simples, reactive pour tout le reste.__",
          code: '// Reactive Form\nthis.form = new FormGroup({\n    nom: new FormControl("", [Validators.required, Validators.minLength(2)]),\n    email: new FormControl("", [Validators.required, Validators.email])\n});',
          language: 'typescript',
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
          answer: "Services contrôlant l'accès aux routes. **`CanActivate`** : autorise/bloque l'accès. **`CanDeactivate`** : confirmation avant de quitter (ex. formulaire modifié). **`CanLoad`** : empêche le chargement du module *lazy* (plus performant que `CanActivate`). **`Resolve`** : pré-charge les données avant affichage.\n\nRetournent `boolean`, `Promise` ou `Observable`. __Côté client uniquement — le backend doit toujours vérifier les autorisations__.",
        },
        {
          id: 'ng-5',
          question: 'Lazy Loading',
          answer: "Charger les modules uniquement quand l'utilisateur navigue vers la route correspondante. Sans *lazy loading*, tout le bundle est chargé au premier accès. Avec, on utilise `loadComponent`/`loadChildren` avec import dynamique → *chunks* séparés.\n\nImpact : premier chargement plus rapide, meilleur **Time to Interactive** et score **Lighthouse**. On *lazy-load* tout ce qui n'est pas nécessaire à l'écran d'accueil. Indispensable pour les applications moyennes à grandes.",
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
          answer: "Interceptent toutes les requêtes/réponses HTTP globalement. Cas d'usage : ajout automatique du **JWT** dans le header `Authorization`, gestion globale des 401 (redirect login), retry sur erreurs réseau, logging.\n\nImplémente `HttpInterceptor` avec `intercept(req, next)`. Les intercepteurs forment une **chaîne**. Indispensable pour centraliser la logique transversale des communications HTTP.",
          code: '@Injectable()\nexport class AuthInterceptor implements HttpInterceptor {\n    intercept(req, next) {\n        const authReq = req.clone({\n            setHeaders: { Authorization: `Bearer ${token}` }\n        });\n        return next.handle(authReq);\n    }\n}',
          language: 'typescript',
        },
        {
          id: 'ng-7',
          question: 'Observables vs Promises',
          answer: "**Promise** : valeur future unique, *eager* (s'exécute dès la création), non annulable. **Observable** : flux de données *lazy* (s'exécute à l'abonnement), émet 0 à N valeurs, annulable via `unsubscribe()`.\n\nOffre des opérateurs puissants (`map`, `filter`, `debounceTime`, `switchMap`, `combineLatest`). Angular utilise les **Observables** partout : `HttpClient`, formulaires réactifs, routing. C'est le modèle de données central du framework.",
        },
        {
          id: 'ng-10',
          question: 'Change Detection Strategy',
          answer: "**Default** : Angular vérifie **tous les composants** à chaque événement (click, timer, HTTP) — coûteux dans les grandes applications.\n\n**OnPush** : Angular ne vérifie le composant que si ses `@Input()` changent (référence), un événement interne se produit, ou un `Observable` via `async` pipe émet. **Gain de performance** significatif.\n\n__Bonnes pratiques__ : utiliser `OnPush` par défaut, remplacer les mutations d'objets par de nouvelles références (immuabilité), utiliser le pipe `async`.",
          code: '@Component({\n    changeDetection: ChangeDetectionStrategy.OnPush,\n    template: "<p>{{ data$ | async }}</p>"\n})',
          language: 'typescript',
        },
        {
          id: 'ng-11',
          question: 'RxJS opérateurs courants',
          answer: "Opérateurs **de transformation** : `map` (transforme chaque valeur), `switchMap` (annule la précédente, idéal pour la recherche auto-complétée), `mergeMap` (concurrent), `concatMap` (séquentiel).\n\nOpérateurs **de filtrage** : `filter`, `debounceTime` (anti-rebond, recherche), `distinctUntilChanged` (évite les doublons), `takeUntil` (désabonnement propre).\n\nOpérateurs **de combinaison** : `combineLatest` (combine plusieurs sources), `forkJoin` (attend que toutes terminent). __Maîtriser ces opérateurs est essentiel pour Angular.__",
          code: '// Recherche avec anti-rebond\nthis.searchControl.valueChanges.pipe(\n    debounceTime(300),\n    distinctUntilChanged(),\n    switchMap(term => this.api.search(term))\n)',
          language: 'typescript',
        },
        {
          id: 'ng-13',
          question: 'Dependency Injection avancée',
          answer: "Angular possède son propre système **DI** hiérarchique. Les services peuvent être fournis à différents niveaux : `root` (singleton global), `platform` (partagé entre apps), ou au niveau d'un composant/module (instance par composant).\n\n`@Optional` : injection optionnelle. `@Self` : recherche uniquement dans l'injecteur local. `useClass`/`useFactory`/`useValue` : configuration fine du provider.\n\nLe DI hiérarchique permet d'isoler des instances dans des sous-arbres de composants — utile pour les composants répétés (ex. : liste avec état local).",
          code: '// Provider avec factory\nproviders: [\n    { provide: API_URL, useValue: "https://api.example.com" },\n    { provide: UserService, useClass: UserServiceImpl }\n]',
          language: 'typescript',
        },
      ],
    },
  ],
};