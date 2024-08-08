<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\Feeling;
use App\Enums\Difficulty;

class Line extends Model
{
    use HasFactory;

    // 参照させたいSQLのテーブル名を指定してあげる
    protected $table = 'line';

    protected $fillable = ['character_id','japanese_line','english_line', 'feeling', 'difficulty', 'volume'];

    protected $casts = [
        'feeling' => 'integer',
        'difficulty' => 'integer',
    ];


    public function setFeelingAttribute($value)
    {
        $this->attributes['feeling'] = Feeling::getKeyFromValue($value);
    }

    public function getFeelingAttribute($value)
    {
        return Feeling::getKeyFromValue($value);
    }

    public function setDifficultyAttribute($value)
    {
        $this->attributes['difficulty'] = Difficulty::getKeyFromValue($value);
    }

    public function getDifficultyAttribute($value)
    {
        return Difficulty::getKeyFromValue($value);
    }
}
