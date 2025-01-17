<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

-   [Simple, fast routing engine](https://laravel.com/docs/routing).
-   [Powerful dependency injection container](https://laravel.com/docs/container).
-   Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
-   Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
-   Database agnostic [schema migrations](https://laravel.com/docs/migrations).
-   [Robust background job processing](https://laravel.com/docs/queues).
-   [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If ＃＃＃＃＃＃ don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 2000 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the Laravel [Patreon page](https://patreon.com/taylorotwell).

### Premium Partners

-   **[Vehikl](https://vehikl.com/)**
-   **[Tighten Co.](https://tighten.co)**
-   **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
-   **[64 Robots](https://64robots.com)**
-   **[Cubet Techno Labs](https://cubettech.com)**
-   **[Cyber-Duck](https://cyber-duck.co.uk)**
-   **[Many](https://www.many.co.uk)**
-   **[Webdock, Fast VPS Hosting](https://www.webdock.io/en)**
-   **[DevSquad](https://devsquad.com)**
-   **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
-   **[OP.GG](https://op.gg)**
-   **[WebReinvent](https://webreinvent.com/?utm_source=laravel&utm_medium=github&utm_campaign=patreon-sponsors)**
-   **[Lendio](https://lendio.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## TODO s

line　テーブルの difficalty は、設定せず、レアリティー（rarity）に変更し、
出現頻度に変える、
difficalty は、ユーザーが選択するものなので、DBに保持しておく必要なし。

## 色追加の方法

### vsCodeのカラーピッカーで色を指定

```css
.correct-line {
    background-color: rgb(163, 232, 163);
}
```

### Copilot でHEXコードに変更

```css
.correct-line {
    background-color: #a3e8a3;
}
```

### カラーネームを取得

Name That Color　で getColorName をコマンド出力

```css
.correct-line {
    background-color: #9DE093;
    // #9DE093 is Granny Smith Apple (granny-smith-apple).
}
```

※実際255 \* 255 \* 255 \*\*\*\*色の名前があるわけではないので、近似のカラーネームの hex値に吸収される

### カラー変数ファイルに追加

`resources\sass\_variables.scss`

にカラーコードを追加

`$granny-smith-apple: #9DE093 `

### コンバートファイルの実行

PowerShellの実行
↓
output.jsonが生成される

### コンバートファイルの上書き

`resources\js\json\output.json`\*\*\*\*
ファイルの上書き

### colors

`resources\js\Pages\Auth\Colors.vue`
の更新

```js
    { id: 32, value: getColorValue('red-damask'), variable: 'red-damask', description: 'スタンプ不正解' },
    {
        id: 33,
        value: getColorValue('sugar-cane'),
        variable: 'sugar-cane',
        description: 'クイズアプリケーションバックグラウンドカラー'
    },
    { id: 34, value: getColorValue('caper'), variable: 'caper', description: '英語ブロック背景' },
    {                                                    // ← 新しく追加したブロックの追加
        id: 35,
        value: getColorValue('granny-smith-apple'),
        variable: 'granny-smith-apple',
        description: 'クイズ結果正解カード背景'
    }

```

`http://127.0.0.1:8000/learnispirits/colors`
にてカラー一覧の表示確認

### 直接記述個所を参照記述に修正

```scss
.correct-line {
    background-color: $granny-smith-apple;
}
```
