[youtube](https://www.youtube.com/watch?v=VrQRa-afCAk&t=)

current: 1:27:17

```bash
composer create-project laravel/laravel laravel11-react-inertia
cd laravel11-react-inertia
```

```bash
composer require laravel/breeze --dev
php artisan breeze:install react
```

```bash
php artisan migrate
```

```bash
php artisan serve
```

```bash
npm run dev
```

```bash
php artisan tinker
```

## Activating dark mode

- To activate dark mode, you can modify the `tailwind.config.js` file to include `darkMode: 'class'`. This allows you to
  toggle dark mode by adding a `dark` class to the HTML element.

- In the `resources/views/app.blade.php` file, you can set the `html` tag to include the `dark` class based on the
  application's locale or user preference. For example:

    ```blade
    <html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark"> 
    ```

## Database

```bash
php artisan make:model Project -fm
php artisan make:model Task -fm
```

fill out migration and factory files for the Model + Tasks

fill out the `ProjectFactory` and `TaskFactory` files to generate sample data.

```bash
php artisan migrate:refresh --seed 
```

## Controllers

```bash
php artisan make:controller ProjectController --model=Project --requests --resource
php artisan make:controller TaskController --model=Task --requests --resource
php artisan make:controller UserController --model=User --requests --resource
```

## Routes

```bash
php artisan route:list
```

## Resources

```bash
php artisan make:resource ProjectResource
```

```bash
php artisan make:resource TaskResource
```

```bash
php artisan make:resource UserResource
```
