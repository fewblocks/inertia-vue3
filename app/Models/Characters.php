<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class Characters extends Model
{
    use SoftDeletes;
    use HasFactory;

    // 参照させたいSQLのテーブル名を指定してあげる
    protected $table = 'characters';

    protected $fillable = ['japanese_name', 'english_name'];

}
