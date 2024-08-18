<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

enum Feeling: String
{
    case ANGRY = 'angry';
    case SAD = 'sad';
    case HAPPY = 'happy';

    public function label(): string
    {
        return match ($this) {
            Feeling::ANGRY  => '怒り',
            Feeling::SAD  => '悲しい',
            Feeling::HAPPY  => '楽しい',
        };
    }

    public static function getKeyFromValue($value)
    {
        return array_search($value, self::getConstants());
    }

    protected static function getConstants(): array
    {
        $reflection = new \ReflectionClass(self::class);
        return $reflection->getConstants();
    }
}
