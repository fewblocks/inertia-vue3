<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CharacterController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// TODO: APIでのエンドポイントを作ったが、これだと外部からの障壁がゼロということになるので
// 上記 Auth のmiddleware 内に書く方法 and クライアントツールでの認証も調べる。
Route::apiResource('line', 'App\Http\Controllers\API\LineController');

Route::apiResource('characters', "App\Http\Controllers\API\CharactersController");


// API疎通確認エンドポイント
Route::get('/sample', function (Request $request) {
    return response()->json([
        'message' => 'Hello, API!',
        'data' => [
            'id' => 1,
            'name' => 'Sample Data'
        ]
    ]);
 });




//　認証系の解説
// https://zenn.dev/bs_kansai/articles/5ac107b0f1cd7d#%E3%81%A7%E3%81%AF%E3%80%81%E3%81%9D%E3%82%82%E3%81%9D%E3%82%82%E3%81%AA%E3%81%9C%E3%81%93%E3%81%93%E3%81%A7-cookie-%E3%81%AB%E4%BF%9D%E5%AD%98%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%81%AE%E3%81%8B%EF%BC%9F%E3%81%A8%E3%81%84%E3%81%86%E8%A9%B1
