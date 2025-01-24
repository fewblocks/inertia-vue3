<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\Feeling;
use App\Enums\Difficulty;
use App\Models\Characters;
use App\Models\Collections;
use Illuminate\Database\Eloquent\SoftDeletes;

class Line extends Model
{
    use SoftDeletes;
    use HasFactory;

    // リレーションの定義(キャラクターとのリレーション)
    public function character()
    {
        return $this->belongsTo(Characters::class, 'character_id', 'id');
    }

    // リレーションの定義(コレクションとのリレーション)
    public function collections()
    {
        return $this->hasMany(Collections::class);
    }

    // 参照させたいSQLのテーブル名を指定してあげる
    protected $table = 'line';

    protected $fillable = ['character_id','japanese_line','english_line', 'feeling', 'difficulty', 'volume'];

    protected $casts = [
        'feeling' => Feeling::class,
        'difficulty' => 'integer',
    ];


    public function setDifficultyAttribute($value)
    {
        $this->attributes['difficulty'] = Difficulty::getKeyFromValue($value);
    }

    public function getDifficultyAttribute($value)
    {
        return Difficulty::getKeyFromValue($value);
    }
}
